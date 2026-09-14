---
id: documentation-change-history
title: Historial de sincronizaciones documentales
group: 05 · Referencias
order: 50
parent: documentation-sync-plan
level: reference
status: current
authority: source_code
summary: Registro funcional de las actualizaciones de documentación y de los commits fuente analizados.
---

# Historial de sincronizaciones documentales

Este historial explica **qué cambió y qué documentación se revisó**. No reemplaza a `git log`: agrega contexto funcional para humanos y LLM.

## Cómo registrar una actualización

Cada PR de sincronización aceptado debe agregar una entrada al principio de la sección `Actualizaciones`, con:

- fecha y enlace al PR documental;
- rango de commits de frontend y backend;
- cambios funcionales detectados;
- documentos actualizados;
- decisiones aprobadas, rechazadas o pendientes;
- validaciones ejecutadas.

Si un repositorio no cambió, debe indicarse como `sin cambios` en lugar de omitirlo.

## Actualizaciones

### 2026-09-14 — Separación de endpoints S3 para media privada

| Campo | Registro |
|---|---|
| PR documental | Pendiente de abrir; esta rama no hace push ni merge |
| Frontend | Sin cambio; continúa en [`1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01`](https://github.com/gonzalotev/app-fidelidad/tree/1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01) |
| Backend | [`b87b00ce…581776101221e31f513cbb939396f6b0603b386f`](https://github.com/am-p/app-loyalty/compare/b87b00ce41d94b4cc719934fc3cc1a8ff18803c1...581776101221e31f513cbb939396f6b0603b386f), un commit nuevo |
| Cambios detectados | El cliente S3 usa `S3_ENDPOINT` interno para readiness, uploads y borrados; `S3_PUBLIC_ENDPOINT` se valida como URL limpia y se reserva para URLs `GET` presignadas, evitando filtrar el host privado. Se mantienen las 17 migraciones y el contrato HTTP. |
| Documentos modificados | `source-lock.json`, commits documentados, C4 de contenedores, contrato API, operación, datos, brechas, secuencias y este historial |
| Decisiones | Sin decisiones nuevas; la separación de endpoints es implementación del backend fijado |
| Validaciones | Pendiente de ejecutar en esta rama documental: source lock, catálogo, OpenAPI, lint y build |

### 2026-09-14 — Sincronización de release gratuita implementada

| Campo | Registro |
|---|---|
| PR documental | Pendiente de abrir; esta rama no hace push ni merge |
| Frontend | [`1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01`](https://github.com/gonzalotev/app-fidelidad/tree/1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01) |
| Backend | [`b87b00ce41d94b4cc719934fc3cc1a8ff18803c1`](https://github.com/am-p/app-loyalty/tree/b87b00ce41d94b4cc719934fc3cc1a8ff18803c1) |
| Cambios detectados | La integración pasa de auth/mocks a servicios API reales para cuenta, alta gratuita, CRUD comercial, personal, clientes, movimientos, analíticas resumen y media privada. El backend agrega readiness PostgreSQL/esquema/Redis/S3, Redis distribuido, reconciliación media y contrato OpenAPI implementado. |
| Documentos modificados | OpenAPI canónico y bundle público, C4, estado de datos, matriz pantalla–API, brechas, operación, commits y source-lock |
| Decisiones | `PR-01..PR-09` permanecen aprobadas para `FREE_ACCESS_V1`; billing, POS, analítica avanzada y backoffice siguen fuera del alcance. |
| Validaciones | `npm test` correcto: source lock, catálogo, Redocly, lint, build y 6 pruebas documentales. Homologación de proveedores, staging, restore/rollback y QA físico siguen pendientes. |

### 2026-08-21 — Paleta fija en la navegación del frontend

| Campo | Registro |
|---|---|
| PR documental | [PR #1](https://github.com/gagonzalez1/puntazo-docs/pull/1) |
| Frontend | [`99a350bd…afec4792`](https://github.com/gonzalotev/app-fidelidad/compare/99a350bd6e204a1f866d78dcfb20bd9bc108ffda...1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01), un commit nuevo |
| Backend | Sin cambios; continúa en `b87b00ce41d94b4cc719934fc3cc1a8ff18803c1` |
| Cambios detectados | La barra inferior adopta la paleta fija de Puntazo, deja de consultar el perfil de tienda para colorearse y el botón QR reutiliza `getHardShadow()`; `.env.example` sólo cambia su final de línea |
| Documentos modificados | Commits documentados, C4 de componentes frontend, navegación comercial, navegación de cliente, todas las referencias frontend, plan de sincronización y `source-lock.json` |
| Decisiones | Cambio visual aprobado para documentación; sin decisiones nuevas de negocio, API o datos |
| Validaciones | Detector remoto, catálogo Markdown, Mermaid, referencias, OpenAPI, lint, build y pruebas automatizadas |

### 2026-08-19 — Línea base documental

| Campo | Registro |
|---|---|
| PR documental | Línea base previa a la automatización |
| Frontend | `99a350bd6e204a1f866d78dcfb20bd9bc108ffda` |
| Backend | `b87b00ce41d94b4cc719934fc3cc1a8ff18803c1` |
| Cambios detectados | Se creó el mapa C4, se separaron los flujos de frontend, se documentó el estado real y se formalizó el backend objetivo |
| Documentos modificados | Arquitectura, flujos, secuencias, datos, backend spec y `openapi.yaml` |
| Decisiones | Las decisiones `PROPUESTA CODEX PC-01` a `PC-14` continúan pendientes de revisión humana |
| Validaciones | Catálogo Markdown, Mermaid, referencias, OpenAPI, lint, build y pruebas de renderizado |
