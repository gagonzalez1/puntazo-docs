import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renderiza la entrada del mapa documental", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<html lang="es">/i);
  assert.match(html, /<title>Puntazo · Mapa de arquitectura<\/title>/i);
  assert.match(html, /Preparando el mapa de Puntazo/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("el catálogo contiene las vistas y commits documentados", async () => {
  const catalog = JSON.parse(await readFile(new URL("../public/generated/catalog.json", import.meta.url), "utf8"));
  const ids = new Set(catalog.docs.map((doc) => doc.id));
  for (const id of ["markdown-index", "overview", "c4-context", "flow-auth", "merchant-flows", "customer-flows", "data-current", "data-target", "integration-matrix"]) {
    assert.ok(ids.has(id), `falta la vista ${id}`);
  }
  assert.ok(catalog.docs.length >= 30);
  assert.equal(catalog.sourceLock.repositories.length, 3);
  assert.match(catalog.sourceLock.repositories[0].commit, /^[a-f0-9]{40}$/);
  assert.ok(catalog.docs.every((doc) => doc.sourceMarkdown.startsWith("---\n")));
});

test("la interfaz conserva las capacidades interactivas solicitadas", async () => {
  const source = await readFile(new URL("../app/ArchitectureExplorer.tsx", import.meta.url), "utf8");
  assert.match(source, /Descargar SVG/);
  assert.match(source, /breadcrumbs/);
  assert.match(source, /setPointerCapture/);
  assert.match(source, /window\.history\.back/);
  assert.match(source, /addEventListener\("hashchange"/);
  assert.match(source, /onClickCapture=\{handleDiagramClick\}/);
  assert.match(source, /composedPath\(\)/);
  assert.match(source, /Math\.hypot\(deltaX, deltaY\) < 7/);
  assert.match(source, /onPointerUp=\{handleDiagramPointerUp\}/);
  assert.match(source, /sidebarCollapsed/);
  assert.match(source, /puntazo-docs-sidebar-collapsed/);
  assert.match(source, /document-content/);
  assert.match(source, /Fuente MD/);
  assert.match(source, /Ver índice de MD/);
  assert.doesNotMatch(source, /Descargar MD/);
  assert.match(source, /referenceVisible/);
  assert.match(source, /Ocultar referencia/);
  assert.match(source, /#\//);
});
