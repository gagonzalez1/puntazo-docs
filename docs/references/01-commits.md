---
id: documented-commits
title: Commits documentados
group: 05 · Referencias
order: 10
parent: overview
level: reference
status: current
authority: source_code
summary: Revisiones exactas de frontend y backend que sustentan la documentación sincronizada.
---
# Commits documentados

El contenido representa una fotografía verificable del código. Las afirmaciones de
implementación se rastrean a estas revisiones y al contrato OpenAPI del backend.

| Repositorio | Commit completo | Fecha del commit | Estado al analizar |
|---|---|---|---|
| `gonzalotev/app-fidelidad` | [`1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01`](https://github.com/gonzalotev/app-fidelidad/tree/1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01) | 2026-09-14 | revisado; integración API, PWA y contratos de recuperación verificados |
| `am-p/app-loyalty` | [`b87b00ce41d94b4cc719934fc3cc1a8ff18803c1`](https://github.com/am-p/app-loyalty/tree/b87b00ce41d94b4cc719934fc3cc1a8ff18803c1) | 2026-09-14 | revisado; rutas, migraciones, PostgreSQL, Redis, S3 y workers verificados |

## Alcance de la sincronización

- El backend final expone el contrato de `FREE_ACCESS_V1` en [`openapi.yaml`](https://github.com/am-p/app-loyalty/blob/b87b00ce41d94b4cc719934fc3cc1a8ff18803c1/openapi.yaml).
- El frontend final consume las rutas reales de auth, onboarding, cuenta,
  comercio, personal, clientes, movimientos, analíticas y media.
- Las operaciones fuera del OpenAPI canónico —billing, POS, analítica avanzada y
  backoffice— no se presentan como implementadas.
- El [source-lock](#/source-lock) debe cambiar sólo con revisiones completas,
  limpias y verificadas.

## Validación

La sincronización ejecuta `npm run source:check`, `npm run content:check`,
`npm run api:check`, lint y build. El checklist de producción agrega evidencia
externa de staging, proveedores, restore, rollback y QA físico.
