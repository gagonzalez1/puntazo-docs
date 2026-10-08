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

### 2026-10-07 (23:20 ART / 02:20 UTC) — Reconciliación final del source backend de remediación

| Campo | Registro |
|---|---|
| PR documental | PR #10, rama `docs/stress-remediation-20261007` (draft al momento de este corte) |
| Backend | `am-p/app-loyalty` `main` en `582499ce9623e176d416ecc63d7c1f62cf25fcec`, merge de PR30 a las 01:52:49 UTC. El fix de remediación trabajado en PR31 quedó cubierto funcionalmente por este `main`; PR31 se cerró a las 02:19 UTC, sin borrar su rama. |
| Comparación local | Merge local `84421a96c7ac54a30fba62cdf9435d253b23048d` conserva el árbol `2f9cc555fd71135abcfde199643e97bfef58a929`, idéntico al árbol remoto de `main`, con diff vacío. No se hizo push de la rama de remediación. |
| Cambios funcionales | La corrección de seguridad/admisión de estrés quedó en el source owner `main`. El runtime testing siguió en API `3d77120b…`/schema `0035`; no hubo nuevo deploy del API. El workflow de producción `37715104289` detuvo el deploy en el guard porque el schema actual de producción es `0033` y el código requiere `0035`; deploy step SKIP, producción sin cambios. |
| Documentos actualizados | `docs/delivery/05-stress-remediation-plan.md` y este historial. Se distinguen source, candidato/runtime, cierre de PR y resultado del guard de producción. |
| Validaciones | 442 pruebas Go/race PASS, 0 skips con PostgreSQL temporal aislado y Redis vacío; `go vet`, Redocly y 16 tests Node PASS. Backend workflow `37715103954` SUCCESS en SHA `582499ce…`. Freshness documental online: branch `docs/stress-remediation-20261007` en `13377454…`, 43 documentos indexados, 0 omisiones y 0 referencias rotas. |
| Estado | Documentación local pendiente de revisión; no se promovió producción ni se modificó el runtime testing. |

### 2026-10-02 — Arquitectura vigente y topología por ambiente

- Revisión desde ramas actuales en checkouts limpios; API oficial de Coolify, imágenes, endpoints de versión y 41 tablas por base comprobados. [Evidencia completa](#/runtime-snapshot).
- Reemplazados los flujos y diagramas del baseline de agosto con servicios reales de comercio, fidelidad, sesiones, datos, suscripción y administración.
- Actualizados C4, datos, matriz, brechas, flujos, secuencias, guía y fuentes. Agregadas arquitectura Backoffice y evidencia de runtime; conservados los slugs existentes.
- Corregida propiedad de backend: `am-p/app-loyalty` integra producto; el fork testing publica. Preview Compose detenido queda como histórico.
- El corte inicial detectó diferencias entre HEAD e imagen testing. El corte final registra las nuevas imágenes PWA/landing coincidentes con sus ramas y una copia de web develop sin contenedor (18 recursos). Configuración productiva pendiente. Spec/OpenAPI/PC-xx permanecen propuestos; ninguna decisión nueva de producto se aprueba en esta entrega.
- Detectado y corregido catálogo retenido por caché del navegador: lectura con `cache: no-store` para mostrar una publicación nueva al recargar.
- Portal versionado y catálogo regenerado; validaciones y publicación se registran también en el runbook operativo de la entrega.


### 2026-08-21 — Paleta fija en la navegación del frontend

| Campo | Registro |
|---|---|
| PR documental | [PR #1](https://github.com/gagonzalez1/puntazo-docs/pull/1) |
| Frontend | [`99a350bd…afec4792`](https://github.com/gonzalotev/app-fidelidad/compare/99a350bd6e204a1f866d78dcfb20bd9bc108ffda...afec4792729b48de4646168846ab221c96352f51), un commit nuevo |
| Backend | Sin cambios; continúa en `f03b9aa202587510508a6f2a094b808f5ed6353d` |
| Cambios detectados | La barra inferior adopta la paleta fija de Puntazo, deja de consultar el perfil de tienda para colorearse y el botón QR reutiliza `getHardShadow()`; `.env.example` sólo cambia su final de línea |
| Documentos modificados | Referencias de código, C4 de componentes frontend, navegación comercial, navegación de cliente y plan de sincronización |
| Decisiones | Cambio visual aprobado para documentación; sin decisiones nuevas de negocio, API o datos |
| Validaciones | Detector remoto, catálogo Markdown, Mermaid, referencias, OpenAPI, lint, build y pruebas automatizadas |

### 2026-08-19 — Línea base documental

| Campo | Registro |
|---|---|
| PR documental | Línea base previa a la automatización |
| Frontend | `99a350bd6e204a1f866d78dcfb20bd9bc108ffda` |
| Backend | `f03b9aa202587510508a6f2a094b808f5ed6353d` |
| Cambios detectados | Se creó el mapa C4, se separaron los flujos de frontend, se documentó el estado real y se formalizó el backend objetivo |
| Documentos modificados | Arquitectura, flujos, secuencias, datos, backend spec y `openapi.yaml` |
| Decisiones | Las decisiones `PROPUESTA CODEX PC-01` a `PC-14` continúan pendientes de revisión humana |
| Validaciones | Catálogo Markdown, Mermaid, referencias, OpenAPI, lint, build y pruebas de renderizado |
