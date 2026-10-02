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

## 02/10/2026 · Analíticas desplegadas y verificadas en testing

La [PR frontend #38](https://github.com/gonzalotev/app-fidelidad/pull/38) se integró en `gonzalotev/app-fidelidad:testing` (`b712c5d5e10154021955ae677935372eafdbdff5`). La [PR #9 del fork backend](https://github.com/gagonzalez1/app-loyalty/pull/9) se integró en `gagonzalez1/app-loyalty:testing` (`f18ff083666e70954bfe8474a228dcca365f40bb`). La [PR oficial backend #26](https://github.com/am-p/app-loyalty/pull/26) sigue abierta. La API pública de testing ya reporta `f18ff083666e70954bfe8474a228dcca365f40bb` y esquema `0033`, con readiness HTTP 200; el despliegue Coolify `o9busnp3snb29gtnsilozook` finalizó. La web se desplegó mediante `tdjvihwta92rholokxhsojmt`, finalizado a las 03:35:32 UTC; el contenedor saludable reporta el commit frontend integrado. `/analytics` respondió HTTP 200 y su bundle coincide con el contenedor mediante SHA-256. Manifest `standalone` y service worker `no-store` respondieron HTTP 200. En navegador integrado se comprobaron las cuatro vistas con respuestas reales vacías, navegación al mes anterior y restauración de sesión después de recarga, sin errores JavaScript; no se crearon movimientos y se cerró la sesión sintética usada para la comprobación. Los conteos no vacíos conservan validación local previa; no se probó un dispositivo físico. Producción no se modifica.

El usuario autorizó una vez el despliegue exclusivo a testing después de la divulgación de `GHSA-86w9-cpqp-85rv` en `node-forge`. La auditoría permanece fallida y sin modificar, sin allowlist ni override. Se conservan las validaciones de frontend, backend/PostgreSQL y navegador local registradas en el flujo; no se comprobó un dispositivo nativo. Esta actualización de la [PR documental #9](https://github.com/gagonzalez1/puntazo-docs/pull/9) afecta el flujo analítico, componentes C4, datos, matriz, brechas y la nota separada del contrato HTTP; no aprueba el alcance amplio de `PC-08`.

## 01/10/2026 · Recuperación analítica por períodos en fuente

Se documenta la nueva lectura operativa diaria, semanal y mensual seleccionada por el usuario, con consolidación de marca, calendario de su zona horaria, autorización de propietario y series con ceros. Se preserva el resumen histórico. La implementación vive en ramas de los repositorios dueños y aún requiere integración y verificación de runtime; no se atribuye a testing ni se aprueba el alcance amplio `PC-08`.

Se actualizan el flujo analítico, componentes frontend/backend, datos, matriz de integración, brechas y nota de contrato HTTP. Se conservan explícitos los documentos y diagramas históricos y el límite de métricas antiguas mock.

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
