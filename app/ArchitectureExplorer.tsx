"use client";

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex -- el canvas Mermaid implementa pan y zoom con puntero, rueda y teclado */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type SourceRepository = {
  kind: "frontend" | "backend";
  name: string;
  url: string;
  commit: string;
  commitDate: string;
};

type Doc = {
  id: string;
  title: string;
  group: string;
  order: number;
  parent: string | null;
  level: string;
  status: "current" | "mixed" | "mock" | "target" | "gap";
  summary: string;
  sourcePath: string;
  sourceMarkdown: string;
  bodyHtml: string;
  mermaid: string;
};

type Catalog = {
  generatedAt: string;
  sourceHash: string;
  sourceLock: { documentedAt: string; repositories: SourceRepository[] };
  docs: Doc[];
};

const STATUS_LABEL: Record<Doc["status"], string> = {
  current: "Implementado",
  mixed: "Mixto",
  mock: "Mock",
  target: "Propuesto",
  gap: "Brecha",
};

function icon(name: "back" | "search" | "minus" | "plus" | "reset" | "download" | "code" | "menu" | "close") {
  const paths = {
    back: <><path d="m15 18-6-6 6-6"/><path d="M9 12h10"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    minus: <path d="M5 12h14"/>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    reset: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></>,
    download: <><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></>,
    code: <><path d="m9 18-6-6 6-6"/><path d="m15 6 6 6-6 6"/></>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    close: <><path d="m6 6 12 12"/><path d="M18 6 6 18"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function parseHash() {
  return window.location.hash.match(/^#\/([a-z0-9-]+)$/)?.[1] ?? "overview";
}

function diagramRouteFromPath(path: EventTarget[]) {
  for (const item of path) {
    if (!(item instanceof Element)) continue;
    const href = item.getAttribute("href")
      ?? item.getAttributeNS("http://www.w3.org/1999/xlink", "href")
      ?? item.getAttribute("xlink:href");
    const id = href?.match(/^#\/([a-z0-9-]+)$/)?.[1];
    if (id) return id;
  }
  return null;
}

export default function ArchitectureExplorer() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [activeId, setActiveId] = useState("overview");
  const [query, setQuery] = useState("");
  const [diagramSvg, setDiagramSvg] = useState("");
  const [diagramError, setDiagramError] = useState("");
  const [sourceVisible, setSourceVisible] = useState(false);
  const [referenceVisible, setReferenceVisible] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [mobileNav, setMobileNav] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [navigationDepth, setNavigationDepth] = useState(0);
  const drag = useRef<{ x: number; y: number; panX: number; panY: number; routeId: string | null; moved: boolean } | null>(null);
  const skipNextDiagramClick = useRef(false);

  useEffect(() => {
    fetch("/generated/catalog.json")
      .then((response) => {
        if (!response.ok) throw new Error("No se pudo cargar el catálogo documental.");
        return response.json();
      })
      .then((data: Catalog) => {
        setCatalog(data);
        const initial = data.docs.some((doc) => doc.id === parseHash()) ? parseHash() : "overview";
        setActiveId(initial);
        window.history.replaceState({ puntazoDocs: true, depth: 0 }, "", `#/${initial}`);
      })
      .catch((error: Error) => setDiagramError(error.message));
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSidebarCollapsed(window.localStorage.getItem("puntazo-docs-sidebar-collapsed") === "true");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const syncFromLocation = (event: PopStateEvent | HashChangeEvent) => {
      setActiveId(parseHash());
      const historyDepth = event instanceof PopStateEvent ? event.state?.depth : window.history.state?.depth;
      setNavigationDepth(Number(historyDepth ?? 0));
      setSourceVisible(false);
      setReferenceVisible(true);
      setDiagramSvg("");
      setDiagramError("");
      setZoom(1);
      setPan({ x: 0, y: 0 });
    };
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    return () => {
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, []);

  const activeDoc = useMemo(() => catalog?.docs.find((doc) => doc.id === activeId) ?? catalog?.docs[0], [catalog, activeId]);

  const goTo = useCallback((id: string) => {
    if (!catalog?.docs.some((doc) => doc.id === id) || id === activeId) return;
    const nextDepth = navigationDepth + 1;
    window.history.pushState({ puntazoDocs: true, depth: nextDepth }, "", `#/${id}`);
    setNavigationDepth(nextDepth);
    setActiveId(id);
    setSourceVisible(false);
    setReferenceVisible(true);
    setDiagramSvg("");
    setDiagramError("");
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setMobileNav(false);
  }, [activeId, catalog, navigationDepth]);

  const goBack = useCallback(() => {
    if (navigationDepth > 0) {
      window.history.back();
      return;
    }
    if (activeDoc?.parent) goTo(activeDoc.parent);
  }, [activeDoc, goTo, navigationDepth]);

  useEffect(() => {
    let cancelled = false;
    if (!activeDoc?.mermaid) return;
    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "base",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        themeVariables: {
          primaryColor: "#e7f8ef",
          primaryTextColor: "#15352b",
          primaryBorderColor: "#65b88d",
          lineColor: "#6b7d76",
          secondaryColor: "#eef4ff",
          tertiaryColor: "#fff7df",
          background: "#ffffff",
          mainBkg: "#ffffff",
        },
        flowchart: { curve: "basis", htmlLabels: true, useMaxWidth: false },
      });
      try {
        const rendered = await mermaid.render(`puntazo-${activeDoc.id}-${Date.now()}`, activeDoc.mermaid);
        if (!cancelled) setDiagramSvg(rendered.svg);
      } catch (error) {
        if (!cancelled) setDiagramError(error instanceof Error ? error.message : "No se pudo dibujar Mermaid.");
      }
    });
    return () => { cancelled = true; };
  }, [activeDoc]);

  const docsByGroup = useMemo(() => {
    const result: Record<string, Doc[]> = {};
    for (const doc of catalog?.docs ?? []) {
      const haystack = `${doc.title} ${doc.summary} ${doc.group}`.toLocaleLowerCase("es");
      if (query && !haystack.includes(query.toLocaleLowerCase("es"))) continue;
      (result[doc.group] ??= []).push(doc);
    }
    return result;
  }, [catalog, query]);

  const breadcrumbs = useMemo(() => {
    if (!activeDoc || !catalog) return [];
    const result: Doc[] = [];
    let current: Doc | undefined = activeDoc;
    while (current) {
      result.unshift(current);
      current = current.parent ? catalog.docs.find((doc) => doc.id === current?.parent) : undefined;
    }
    return result;
  }, [activeDoc, catalog]);

  const downloadSvg = () => {
    if (!diagramSvg || !activeDoc) return;
    const blob = new Blob([diagramSvg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `puntazo-${activeDoc.id}.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleDiagramClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (skipNextDiagramClick.current) {
      event.preventDefault();
      event.stopPropagation();
      skipNextDiagramClick.current = false;
      return;
    }
    // En SVG con foreignObject (especialmente WebKit), event.target puede ser
    // el texto HTML y closest("a") no cruza siempre al anchor SVG. composedPath
    // sí contiene el <a xlink:href>, por eso resolvemos la ruta desde allí.
    const id = diagramRouteFromPath(event.nativeEvent.composedPath());
    if (id) {
      event.preventDefault();
      event.stopPropagation();
      goTo(id);
    }
  };

  const handleDiagramPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      panX: pan.x,
      panY: pan.y,
      routeId: diagramRouteFromPath(event.nativeEvent.composedPath()),
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDiagramPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const deltaX = event.clientX - drag.current.x;
    const deltaY = event.clientY - drag.current.y;
    if (!drag.current.moved && Math.hypot(deltaX, deltaY) < 7) return;
    drag.current.moved = true;
    setPan({ x: drag.current.panX + deltaX, y: drag.current.panY + deltaY });
  };

  const handleDiagramPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const interaction = drag.current;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!interaction?.routeId || interaction.moved) return;
    event.preventDefault();
    skipNextDiagramClick.current = true;
    goTo(interaction.routeId);
    window.setTimeout(() => { skipNextDiagramClick.current = false; }, 0);
  };

  const handleDiagramPointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const clampZoom = (value: number) => Math.min(2.5, Math.max(0.45, value));

  const setDesktopSidebarCollapsed = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    window.localStorage.setItem("puntazo-docs-sidebar-collapsed", String(collapsed));
  };

  const toggleNavigation = () => {
    if (window.matchMedia("(max-width: 940px)").matches) {
      setMobileNav((value) => !value);
      return;
    }
    setDesktopSidebarCollapsed(!sidebarCollapsed);
  };

  const closeNavigation = () => {
    if (window.matchMedia("(max-width: 940px)").matches) {
      setMobileNav(false);
      return;
    }
    setDesktopSidebarCollapsed(true);
  };

  if (!catalog || !activeDoc) {
    return <main className="loading-screen"><span className="loading-mark">P</span><p>{diagramError || "Preparando el mapa de Puntazo…"}</p></main>;
  }

  return (
    <div className={`app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <aside className={`sidebar ${mobileNav ? "is-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark">P</div>
          <div><strong>Puntazo</strong><span>Mapa de arquitectura</span></div>
          <button className="icon-button sidebar-close" onClick={closeNavigation} aria-label="Ocultar navegación" title="Ocultar navegación">{icon("close")}</button>
        </div>
        <label className="search-box">
          {icon("search")}
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar una vista…" aria-label="Buscar documentación" />
        </label>
        <nav aria-label="Mapa documental">
          {Object.entries(docsByGroup).map(([group, docs]) => (
            <section className="nav-group" key={group}>
              <h2>{group.replace(/^\d+ · /, "")}</h2>
              {docs.map((doc) => (
                <button className={`nav-item ${doc.id === activeDoc.id ? "active" : ""}`} key={doc.id} onClick={() => goTo(doc.id)}>
                  <span>{doc.title.replace(/^(C4|Frontend|Flujos|Datos) · /, "")}</span>
                  <i className={`status-dot ${doc.status}`} title={STATUS_LABEL[doc.status]} />
                </button>
              ))}
            </section>
          ))}
        </nav>
        <div className="sidebar-foot">
          <span>Fuente</span>
          <code>Markdown + Mermaid</code>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button menu-button"
              onClick={toggleNavigation}
              aria-label={sidebarCollapsed ? "Mostrar navegación" : "Ocultar navegación"}
              aria-expanded={mobileNav || !sidebarCollapsed}
              title={sidebarCollapsed ? "Mostrar navegación" : "Ocultar navegación"}
            >
              {icon("menu")}
            </button>
            <button className="back-button" onClick={goBack} disabled={!activeDoc.parent && navigationDepth === 0}>{icon("back")}<span>Regresar</span></button>
            <div className="breadcrumbs" aria-label="Ruta">
              {breadcrumbs.map((doc, index) => <span key={doc.id}><button onClick={() => goTo(doc.id)}>{doc.title}</button>{index < breadcrumbs.length - 1 && <b>/</b>}</span>)}
            </div>
          </div>
          <div className="commit-pills">
            {catalog.sourceLock.repositories.map((repository) => (
              <a key={repository.kind} href={`${repository.url}/commit/${repository.commit}`} target="_blank" rel="noreferrer">
                {repository.kind === "frontend" ? "FE" : "BE"} <code>{repository.commit.slice(0, 8)}</code>
              </a>
            ))}
          </div>
        </header>

        <article className="document-view">
          <div className="document-heading">
            <div>
              <div className="eyebrow"><span>{activeDoc.level}</span><i className={`status-badge ${activeDoc.status}`}>{STATUS_LABEL[activeDoc.status]}</i></div>
              <h1>{activeDoc.title}</h1>
              <div className="source-reference">
                <span>Fuente MD</span>
                <code>{activeDoc.sourcePath}</code>
                <button
                  onClick={() => goTo(activeDoc.id === "markdown-index" ? "overview" : "markdown-index")}
                  title={activeDoc.id === "markdown-index" ? "Volver al mapa" : "Abrir el índice ordenado de Markdown"}
                >
                  {activeDoc.id === "markdown-index" ? "Volver al mapa" : "Ver índice de MD"}
                </button>
              </div>
              <p>{activeDoc.summary}</p>
            </div>
            {activeDoc.mermaid && (
              <button
                className="reference-toggle"
                onClick={() => setReferenceVisible((value) => !value)}
                aria-expanded={referenceVisible}
                aria-controls="document-reference"
              >
                {referenceVisible ? "Ocultar referencia" : "Mostrar referencia"}
              </button>
            )}
          </div>

          <div className={`document-content ${activeDoc.mermaid ? "has-diagram" : ""} ${referenceVisible ? "" : "reference-hidden"}`}>
            {activeDoc.mermaid && (
              <section className="diagram-card" aria-label={`Diagrama ${activeDoc.title}`}>
              <div className="diagram-toolbar">
                <div><span className="live-dot" />Diagrama interactivo <small>Arrastrar para mover · rueda para ampliar</small></div>
                <div className="toolbar-actions">
                  <button className="icon-button" onClick={() => setZoom((value) => clampZoom(value - 0.15))} aria-label="Alejar" title="Alejar">{icon("minus")}</button>
                  <output>{Math.round(zoom * 100)}%</output>
                  <button className="icon-button" onClick={() => setZoom((value) => clampZoom(value + 0.15))} aria-label="Acercar" title="Acercar">{icon("plus")}</button>
                  <button className="icon-button" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} aria-label="Restablecer vista" title="Restablecer vista">{icon("reset")}</button>
                  <button className={`icon-button ${sourceVisible ? "pressed" : ""}`} onClick={() => setSourceVisible((value) => !value)} aria-label="Ver fuente Mermaid" title="Ver fuente Mermaid">{icon("code")}</button>
                  <button className="download-button" onClick={downloadSvg}>{icon("download")}<span>Descargar SVG</span></button>
                </div>
              </div>
              {sourceVisible ? (
                <pre className="mermaid-source"><code>{activeDoc.mermaid}</code></pre>
              ) : (
                <div
                  className="diagram-viewport"
                  role="application"
                  tabIndex={0}
                  aria-label="Diagrama navegable. Use las flechas para mover y más o menos para ampliar."
                  onClickCapture={handleDiagramClick}
                  onKeyDown={(event) => {
                    if (event.key === "+" || event.key === "=") setZoom((value) => clampZoom(value + 0.15));
                    if (event.key === "-") setZoom((value) => clampZoom(value - 0.15));
                    if (event.key === "ArrowLeft") setPan((value) => ({ ...value, x: value.x - 24 }));
                    if (event.key === "ArrowRight") setPan((value) => ({ ...value, x: value.x + 24 }));
                    if (event.key === "ArrowUp") setPan((value) => ({ ...value, y: value.y - 24 }));
                    if (event.key === "ArrowDown") setPan((value) => ({ ...value, y: value.y + 24 }));
                  }}
                  onWheel={(event) => { event.preventDefault(); setZoom((value) => clampZoom(value + (event.deltaY < 0 ? 0.1 : -0.1))); }}
                  onPointerDown={handleDiagramPointerDown}
                  onPointerMove={handleDiagramPointerMove}
                  onPointerUp={handleDiagramPointerUp}
                  onPointerCancel={handleDiagramPointerCancel}
                >
                  {diagramError ? <p className="diagram-error">{diagramError}</p> : diagramSvg ? (
                    <div className="diagram-canvas" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }} dangerouslySetInnerHTML={{ __html: diagramSvg }} />
                  ) : <p className="diagram-loading">Dibujando diagrama…</p>}
                </div>
              )}
              </section>
            )}

            {(!activeDoc.mermaid || referenceVisible) && (
              <section id="document-reference" className="prose-card" aria-label={`Referencia de ${activeDoc.title}`} dangerouslySetInnerHTML={{ __html: activeDoc.bodyHtml }} />
            )}
          </div>
          <footer className="document-footer">
            <span>Fotografía: {catalog.sourceLock.documentedAt}</span>
          </footer>
        </article>
      </main>
      {mobileNav && <button className="sidebar-backdrop" onClick={() => setMobileNav(false)} aria-label="Cerrar navegación" />}
    </div>
  );
}
