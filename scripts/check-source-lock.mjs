import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const lock = JSON.parse(await readFile(path.join(root, "docs/meta/source-lock.json"), "utf8"));

for (const repository of lock.repositories) {
  const localPath = path.resolve(root, repository.localPath);
  try {
    await access(localPath);
  } catch {
    console.warn(`${repository.name}: repositorio local no disponible; se conserva el lock para CI.`);
    continue;
  }
  const actual = execFileSync("git", ["-C", localPath, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  if (actual !== repository.commit) {
    throw new Error(`${repository.name}: documentación=${repository.commit}, repositorio=${actual}`);
  }
  const dirty = execFileSync("git", ["-C", localPath, "status", "--porcelain"], { encoding: "utf8" }).trim();
  if (dirty) throw new Error(`${repository.name}: el repositorio fuente tiene cambios locales`);
  console.log(`${repository.name}: ${actual.slice(0, 8)} verificado y limpio.`);
}

for (const document of lock.documents ?? []) {
  const localPath = path.resolve(root, document.localPath);
  const normalizeMarkdown = (value) => value.replace(/^\n/, "").replace(/\n+$/, "\n");
  let sourceContents = null;
  try {
    sourceContents = await readFile(localPath, "utf8");
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      console.warn(`${document.name}: fuente local no disponible; se conserva el lock para CI.`);
    } else {
      throw error;
    }
  }
  const published = await readFile(path.resolve(root, document.publishedPath), "utf8");
  const frontmatterEnd = published.indexOf("\n---\n", 4);
  if (frontmatterEnd < 0) throw new Error(`${document.name}: la copia publicada no tiene frontmatter válido`);
  const publishedBody = normalizeMarkdown(published.slice(frontmatterEnd + 5));
  const publishedHash = createHash("sha256").update(publishedBody).digest("hex");
  if (publishedHash !== document.sha256) {
    throw new Error(`${document.name}: lock=${document.sha256}, copia publicada=${publishedHash}`);
  }
  if (sourceContents !== null && normalizeMarkdown(sourceContents) !== publishedBody) {
    throw new Error(`${document.name}: la copia publicada no coincide con la fuente local`);
  }
  console.log(`${document.name}: ${document.version} verificado por SHA-256.`);
}
