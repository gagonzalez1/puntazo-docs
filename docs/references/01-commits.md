---
id: documented-commits
title: Commits documentados
group: 05 · Referencias
order: 10
parent: overview
level: reference
status: current
authority: source_code
summary: Revisiones y ramas exactas que sustentan la release aislada de staging.
---
# Commits documentados

El contenido representa una fotografía verificable del código desplegable en
staging. Las afirmaciones de implementación se rastrean a estas revisiones y al
contrato OpenAPI del backend.

| Repositorio | Rama de staging | Commit completo | Fecha del commit | Estado al analizar |
|---|---|---|---|---|
| `gonzalotev/app-fidelidad` | `testing` | [`1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01`](https://github.com/gonzalotev/app-fidelidad/tree/1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01) | 2026-09-14 | revisado; integración API, PWA y contratos de recuperación verificados |
| `gagonzalez1/app-loyalty` | `staging` | [`50e95e9407ee5ffaccfc3cebcbef464d24f26427`](https://github.com/gagonzalez1/app-loyalty/tree/50e95e9407ee5ffaccfc3cebcbef464d24f26427) | 2026-09-14 | revisado para staging; altas demo cerradas por flag y toolchain Go 1.25.13 fijado |
| `gagonzalez1/puntazo-preview` | `testing` | [`e6efbd7da4d3a22be9f818b000ef44d4ac2ed40b`](https://github.com/gagonzalez1/puntazo-preview/tree/e6efbd7da4d3a22be9f818b000ef44d4ac2ed40b) | 2026-09-14 | composición aislada de staging con las fuentes anteriores y ajuste de arranque Nginx |

Estos locks identifican ramas separadas para staging. No afirman que los commits
estén fusionados en `main`, en el upstream del backend ni en producción.

## Alcance de la sincronización

- El backend de staging expone el contrato de `FREE_ACCESS_V1` en [`openapi.yaml`](https://github.com/gagonzalez1/app-loyalty/blob/50e95e9407ee5ffaccfc3cebcbef464d24f26427/openapi.yaml).
- El frontend final consume las rutas reales de auth, onboarding, cuenta,
  comercio, personal, clientes, movimientos, analíticas y media.
- Las operaciones fuera del OpenAPI canónico —billing, POS, analítica avanzada y
  backoffice— no se presentan como implementadas.
- El preview de staging fija copias exactas de frontend y backend en su composición;
  su lock no sustituye los locks fuente ni implica un merge.
- El [source-lock](#/source-lock) debe cambiar sólo con revisiones completas,
  limpias y verificadas en las ramas declaradas.

## Validación

La sincronización ejecuta `npm run source:check`, `npm run content:check`,
`npm run api:check`, lint y build. El checklist de producción agrega evidencia
externa de staging, proveedores, restore, rollback y QA físico.
