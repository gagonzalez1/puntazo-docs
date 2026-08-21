import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function createDriftReport(lock, resolveRemoteHead, checkedAt = new Date().toISOString()) {
  if (!Array.isArray(lock.repositories) || lock.repositories.length === 0) {
    throw new Error("source-lock.json no contiene repositorios");
  }

  const repositories = lock.repositories.map((repository) => {
    if (!repository.name || !/^[a-f0-9]{40}$/.test(repository.commit)) {
      throw new Error("source-lock.json contiene un repositorio o commit inválido");
    }

    const remoteCommit = resolveRemoteHead(repository);
    if (!/^[a-f0-9]{40}$/.test(remoteCommit)) {
      throw new Error(`${repository.name}: HEAD remoto inválido`);
    }

    return {
      kind: repository.kind,
      name: repository.name,
      url: repository.url,
      documentedCommit: repository.commit,
      remoteCommit,
      drift: repository.commit !== remoteCommit,
      compareUrl: `${repository.url}/compare/${repository.commit}...${remoteCommit}`,
    };
  });

  return {
    checkedAt,
    drift: repositories.some((repository) => repository.drift),
    repositories,
  };
}

export function resolveWithGit(repository) {
  const remoteUrl = repository.url.endsWith(".git") ? repository.url : `${repository.url}.git`;
  const output = execFileSync("git", ["ls-remote", "--exit-code", remoteUrl, "HEAD"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
  const [commit] = output.split(/\s+/);
  return commit;
}

function argumentValue(name) {
  const position = process.argv.indexOf(name);
  return position >= 0 ? process.argv[position + 1] : null;
}

async function main() {
  const lockPath = path.resolve(root, argumentValue("--lock") ?? "docs/meta/source-lock.json");
  const outputPath = path.resolve(root, argumentValue("--output") ?? ".tmp/docs-drift-report.json");
  const lock = JSON.parse(await readFile(lockPath, "utf8"));
  const report = createDriftReport(lock, resolveWithGit);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);

  for (const repository of report.repositories) {
    const state = repository.drift ? "DESACTUALIZADO" : "actualizado";
    console.log(`${repository.name}: ${state} (${repository.documentedCommit.slice(0, 8)} → ${repository.remoteCommit.slice(0, 8)})`);
  }
  console.log(`Reporte: ${path.relative(root, outputPath)}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await main();
}

