import { execFileSync } from "node:child_process";
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
