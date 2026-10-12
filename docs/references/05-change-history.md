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

### 2026-10-12 — Aviso opcional de actualización Android · rama fuente pendiente

- Frontend: [PR #57](https://github.com/gonzalotev/app-fidelidad/pull/57), rama `codex/android-flexible-updates-20261012`, commit funcional `464db14`, HEAD verificado `5e2d5e0`, basado en main remoto `2871299`. Los SHA son evidencia del cambio revisado y no seleccionan builds futuros.
- El usuario aprobó el flujo flexible con **Actualizar** y **Más tarde**; al descargar se solicita reinicio explícito. Google Play coordina consentimiento, descarga y actualización.
- Backend, contrato HTTP, esquema y runtime: sin cambios ni publicación.
- Actualizados contenedores, componentes frontend, matriz de integración, brechas, índice de secuencias y guía. Agregada secuencia Android. README fuente incluye requisitos y procedimiento de prueba desde Play.
- Tipos, 133 pruebas unitarias (13 del flujo nuevo), Expo Doctor 18/18 y autolinking Android verificados. Exportación Android, build web/PWA y compilación Kotlin release del módulo verificados; para Gradle 8.14.3 se usó el JDK 17 instalado. Catálogo y Mermaid validados con 43 documentos.
- La publicación del nuevo binario y la instalación real con dos versiones elegibles de Play quedan pendientes; el código de esta rama no se presenta como disponible en celulares.

### 2026-10-12 — AAB interno 1.0.0 (16) y confirmación 18+

- Candidato dueño [PR #61](https://github.com/gonzalotev/app-fidelidad/pull/61), rama `release/android-internal-20261012`, HEAD remoto verificado `a1e0622`; basado en testing actual `d2fd8c6` e incorpora los PR #57/#58/#59. Precios (#60) excluidos por dependencia API ausente (404).
- Recuperación/adaptación puntual de confirmación 18+ y restricción de checkout externo Android desde `closed-test-readiness`, conservando los campos y flujos más nuevos de testing. Google no sustituye la aceptación; sólo el servidor confirma y habilita los contextos protegidos.
- Tipos, 136/136 unitarias, Expo Doctor 18/18, web/PWA, CI y 10/10 Chromium verificados. Identidad/HTTP de UI ficticios; ruta age-confirmation e historial reconocidas por el runtime con 401 sin autenticación. API testing observada `3d77120`, esquema 0035, readiness OK; no se desplegó backend/web ni se cambió esquema.
- [EAS build](https://expo.dev/accounts/gabrieldgs-team/projects/puntazo/builds/b72b5c59-cdb2-4598-afa4-7fe834184f33) FINISHED, fuente `a1e0622`, firma remota existente, min SDK 24 / target 36. ZIP, módulo nativo, firma y bundletool validados. SHA-256 AAB `b2858ef8d00bef06167ca1c19bd1cb0c1633863534ba1c26cfea9a7bb49995f2`.
- Google validó/confirmó la edición `12554666965124270906`; lectura nueva de internal confirmó `Puntazo (16)`, versionCodes `[16]`, completed. No acredita instalación por testers ni publicación pública. El primer intento EAS falló antes de crear job y reservó 15; se reintentó sin cambiar fuente/firma.
- Integración a main/testing y QA de instalación, firma de Play/Google login y actualización flexible entre dos versiones quedan pendientes. Los SHA y el build ID son evidencia de esta entrega; futuras compilaciones deben resolver otra vez las ramas remotas actuales.

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
