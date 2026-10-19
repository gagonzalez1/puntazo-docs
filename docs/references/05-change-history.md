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

### 2026-10-18 — Búsqueda del mapa y lectura PDF dentro de Puntazo

- Solicitud explícita de búsqueda funcional y lectura interna; frontend [PR70](https://github.com/gonzalotev/app-fidelidad/pull/70), fuente final `492282d83cd7812ab06a11c2da75ca7b18e1c1fd` sobre `067dc68`, integrada en testing como `b7de8ec5414c3e7144fa87bb700e9c2e6e4c00a6`. Backend y datos sin cambios.
- Búsqueda local por marca/sucursal/dirección/localidad/provincia, normalizada y coherente entre mapa y lista. PDF.js 6.4.299 local compartido entre iframe web y WebView Android, controles de página/zoom/texto, renovación del enlace y alternativa externa explícita.
- Actualizados flujos 25/26, C4 frontend/contenedores, operación CSP, matriz, brechas y estado observado. Se preservan los cortes históricos de 30 MiB/PWA y V2 futura.
- Testing `b7de8ec` saludable desde las 21:49:35 Argentina; QA real aprobada a las 21:52:24 con búsqueda sobre 37 tiendas, mapa → menú interno y lectura pública móvil/escritorio. Sin respuestas simuladas ni escrituras comerciales.
- Validación local: 140 unidades, typecheck, Doctor 18/18, auditoría, build web y export JS nativo aprobados; 14 casos browser dirigidos aprobados (12 de mapa/PDF/PWA y dos de scans codificados) según el reporte de la tarea. Scans genuinos Group 4 y 35 MP comprobados independientemente. [Publicación y límites de aceptación](#/runtime-snapshot); no acredita dispositivo físico ni publicación del portal.

### 2026-10-18 — Ampliación a 30 MiB y apertura con PWA activa

- Solicitud explícita: ampliar el PDF a 30 MB y corregir «Esta pantalla no existe» al abrirlo.
- Incidencia reproducida con SW real activo: la descarga era un PDF válido, mientras la navegación recibía el shell HTML. Se excluyen medios/API del fallback y se abre un Blob validado para firmas del mismo origen; HTTPS externo y native conservan sus visores.
- Backend 30 MiB, multipart +64 KiB y proxies 31 MiB. Migración 0042 amplía sólo el CHECK; 0041 y los punteros/documentos previos se preservan. Respaldo/restauración y migración doble aprobados; concurrencia efectiva 2/2 dentro de 768 MiB de API.
- Backend PR39 sigue propuesto al propietario; frontend PR69 y landing PR11 integradas en testing. [Fuentes, despliegue y aceptación final](#/runtime-snapshot) conservan los límites de evidencia. V2 futura y producción sin cambios.

### 2026-10-18 — Menú PDF V1 implementado y verificado en testing

- Ampliación de [PR12 documental](https://github.com/gagonzalez1/puntazo-docs/pull/12); portal aún sin publicar.
- API0041, editor PDF por sucursal, enlace/QR público y entradas desde mapa/tarjetas; V2 conservada únicamente como idea.
- Actualizados C4, topología, flujos comercio/cliente, datos, contrato implementado, matriz, brechas, operación y estado observado. Nuevo flujo Menú PDF V1.
- Corregidas las incidencias detectadas en QA: clasificación de cifrado, modal del mapa y límites del cuerpo en landing/API. SQL previo preservado.
- Backend PR39 abierta al propietario; frontend PR67/68 y landing PR10 integradas en testing. Producción sin cambios. [Fuentes y validaciones](#/runtime-snapshot).


### 2026-10-17 — Mapa del cliente y alcance de menús

- Actualización propuesta en [PR12](https://github.com/gagonzalez1/puntazo-docs/pull/12); portal todavía sin publicar desde esta rama.

- Backend testing pasa de `f568686`/0035 a `4640caf`/0040; frontend testing de `66cf859` a `6a90482` (PR66). Producción sin cambios. Fuente backend oficial `am-p/app-loyalty:main@dbeb03c` contenida en el candidato.
- Implementados descubrimiento de sucursales activas y favoritos propios persistidos, sin requisito de tarjeta previa. La UI conserva los locales sin coordenadas, separa estados y calcula distancia solo con ubicación real.
- Actualizados guía, flujo de cliente, componentes backend, datos, matriz, brechas y estado observado. Nuevo flujo dedicado [Mapa y menú](#/flow-customer-map-menu).
- Alcance acordado: únicamente V1 PDF como siguiente implementación. V2 digital/IA se documenta como idea futura, sin tablas, procesos ni editor implementados.
- Backend PR38 abierta al propietario; frontend PR66 integrada en testing. Validaciones y alcance de la comprobación se detallan en [Estado observado](#/runtime-snapshot). La PR de esta actualización y el resultado del portal se registran en el informe de reconciliación de la tarea.


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
