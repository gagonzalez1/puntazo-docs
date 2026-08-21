import assert from "node:assert/strict";
import test from "node:test";

import { createDriftReport } from "../scripts/detect-source-drift.mjs";

const frontendCommit = "1".repeat(40);
const backendCommit = "2".repeat(40);
const lock = {
  repositories: [
    {
      kind: "frontend",
      name: "example/frontend",
      url: "https://github.com/example/frontend",
      commit: frontendCommit,
    },
    {
      kind: "backend",
      name: "example/backend",
      url: "https://github.com/example/backend",
      commit: backendCommit,
    },
  ],
};

test("informa que las fuentes están actualizadas cuando coinciden los commits", () => {
  const report = createDriftReport(lock, (repository) => repository.commit, "2026-08-21T10:00:00.000Z");

  assert.equal(report.drift, false);
  assert.equal(report.repositories.every((repository) => !repository.drift), true);
});

test("identifica el repositorio desactualizado y construye su comparación", () => {
  const newFrontendCommit = "3".repeat(40);
  const report = createDriftReport(
    lock,
    (repository) => (repository.kind === "frontend" ? newFrontendCommit : repository.commit),
    "2026-08-21T10:00:00.000Z",
  );

  assert.equal(report.drift, true);
  assert.equal(report.repositories[0].drift, true);
  assert.equal(report.repositories[0].remoteCommit, newFrontendCommit);
  assert.equal(
    report.repositories[0].compareUrl,
    `https://github.com/example/frontend/compare/${frontendCommit}...${newFrontendCommit}`,
  );
  assert.equal(report.repositories[1].drift, false);
});

test("rechaza commits inválidos del lock", () => {
  const invalidLock = { repositories: [{ ...lock.repositories[0], commit: "main" }] };
  assert.throws(() => createDriftReport(invalidLock, () => frontendCommit), /commit inválido/);
});

