import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { marked } from "marked";

const validationDom = new JSDOM("<!doctype html><html><body></body></html>");
globalThis.window = validationDom.window;
globalThis.document = validationDom.window.document;
const mermaidEngine = (await import("mermaid")).default;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = path.join(root, "docs");
const outputPath = path.join(root, "public", "generated", "catalog.json");
const checkOnly = process.argv.includes("--check");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    if (entry.isFile() && entry.name.endsWith(".md")) files.push(fullPath);
  }
  return files.sort();
}

function unquote(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(raw, relativePath) {
  if (!raw.startsWith("---\n")) throw new Error(`${relativePath}: falta frontmatter`);
  const end = raw.indexOf("\n---\n", 4);
  if (end < 0) throw new Error(`${relativePath}: frontmatter sin cierre`);
  const metadata = {};
  for (const line of raw.slice(4, end).split("\n")) {
    if (!line.trim()) continue;
    const separator = line.indexOf(":");
    if (separator < 1) throw new Error(`${relativePath}: frontmatter inválido: ${line}`);
    metadata[line.slice(0, separator).trim()] = unquote(line.slice(separator + 1));
  }
  return { metadata, body: raw.slice(end + 5) };
}

function extractMermaid(body) {
  const match = body.match(/```mermaid\s*\n([\s\S]*?)```/);
  return {
    mermaid: match?.[1].trim() ?? "",
    prose: body.replace(/```mermaid\s*\n[\s\S]*?```/g, "").trim(),
  };
}

function sortDocs(a, b) {
  return a.group.localeCompare(b.group, "es") || a.order - b.order || a.title.localeCompare(b.title, "es");
}

const sourceFiles = await walk(docsRoot);
const docs = [];
const ids = new Set();
const allowedStatuses = new Set(["current", "mixed", "mock", "target", "gap"]);
const allowedAuthorities = new Set(["source_code", "agreed", "proposal_codex", "mixed"]);

for (const sourceFile of sourceFiles) {
  const relativePath = path.relative(root, sourceFile).split(path.sep).join("/");
  const raw = await readFile(sourceFile, "utf8");
  const { metadata, body } = parseFrontmatter(raw, relativePath);
  for (const key of ["id", "title", "group", "order", "summary"]) {
    if (!metadata[key]) throw new Error(`${relativePath}: falta ${key}`);
  }
  if (!/^[a-z0-9-]+$/.test(metadata.id)) throw new Error(`${relativePath}: id inválido ${metadata.id}`);
  if (ids.has(metadata.id)) throw new Error(`${relativePath}: id duplicado ${metadata.id}`);
  if (metadata.status && !allowedStatuses.has(metadata.status)) throw new Error(`${relativePath}: status inválido ${metadata.status}`);
  if (metadata.authority && !allowedAuthorities.has(metadata.authority)) throw new Error(`${relativePath}: authority inválida ${metadata.authority}`);
  ids.add(metadata.id);

  const { mermaid, prose } = extractMermaid(body);
  if (metadata.diagram === "true" && !mermaid) throw new Error(`${relativePath}: diagram=true sin bloque Mermaid`);
  if (mermaid) {
    try {
      // Mermaid intenta sanitizar links con DOMPurify al parsear en Node. La
      // sintaxis de click se valida abajo; el grafo se parsea sin esas líneas.
      await mermaidEngine.parse(mermaid.replace(/^\s*click\s+.*$/gm, ""));
    } catch (error) {
      throw new Error(`${relativePath}: Mermaid inválido: ${error instanceof Error ? error.message : error}`);
    }
  }
  if (metadata.codeRefs === "required" && !/github\.com\/.+\/blob\/[^/]+\//.test(prose)) {
    throw new Error(`${relativePath}: requiere al menos una referencia al código fuente`);
  }
  if (/github\.com\/.+?\/blob\/[a-f0-9]{7,40}\//.test(prose)) {
    throw new Error(`${relativePath}: las referencias al código deben seguir una rama, no un commit fijo`);
  }

  docs.push({
    id: metadata.id,
    title: metadata.title,
    group: metadata.group,
    order: Number(metadata.order),
    parent: metadata.parent || null,
    level: metadata.level || "reference",
    status: metadata.status || "current",
    authority: metadata.authority || (metadata.status === "current" ? "source_code" : "mixed"),
    summary: metadata.summary,
    sourcePath: relativePath,
    sourceMarkdown: raw,
    bodyHtml: marked.parse(prose, { gfm: true }),
    mermaid,
  });
}

for (const doc of docs) {
  if (!Number.isFinite(doc.order)) throw new Error(`${doc.sourcePath}: order debe ser numérico`);
  if (doc.parent && !ids.has(doc.parent)) throw new Error(`${doc.sourcePath}: parent inexistente ${doc.parent}`);
  for (const target of doc.mermaid.matchAll(/href\s+"#\/([a-z0-9-]+)"/g)) {
    if (!ids.has(target[1])) throw new Error(`${doc.sourcePath}: drill-down apunta a ${target[1]} inexistente`);
  }
}

const docsById = new Map(docs.map((doc) => [doc.id, doc]));
for (const doc of docs) {
  const ancestors = new Set([doc.id]);
  let parent = doc.parent ? docsById.get(doc.parent) : null;
  while (parent) {
    if (ancestors.has(parent.id)) throw new Error(`${doc.sourcePath}: ciclo detectado en parent ${parent.id}`);
    ancestors.add(parent.id);
    parent = parent.parent ? docsById.get(parent.parent) : null;
  }
}

const markdownIndex = docs.find((doc) => doc.id === "markdown-index");
if (!markdownIndex) throw new Error("falta la guía de lectura markdown-index");
for (const doc of docs) {
  if (!markdownIndex.sourceMarkdown.includes(doc.sourcePath)) {
    throw new Error(`${markdownIndex.sourcePath}: falta incluir ${doc.sourcePath} en el índice para LLM`);
  }
}

docs.sort(sortDocs);
const payload = {
  generatedAt: new Date().toISOString(),
  sourceHash: createHash("sha256").update(docs.map((doc) => `${doc.sourcePath}:${doc.mermaid}:${doc.bodyHtml}`).join("\n")).digest("hex"),
  docs,
};
const serialized = `${JSON.stringify(payload, null, 2)}\n`;

if (checkOnly) {
  const current = await readFile(outputPath, "utf8").catch(() => "");
  const normalize = (value) => value.replace(/"generatedAt":\s*"[^"]+"/, '"generatedAt": "<ignored>"');
  if (normalize(current) !== normalize(serialized)) {
    throw new Error("public/generated/catalog.json está desactualizado; ejecutar npm run content:build");
  }
  console.log(`Contenido válido: ${docs.length} documentos, ${ids.size} IDs únicos.`);
} else {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, serialized);
  console.log(`Catálogo generado: ${docs.length} documentos.`);
}
