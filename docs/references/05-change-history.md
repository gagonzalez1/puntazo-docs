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

### 2026-11-01 — Guard de caché entre ediciones iOS

| Campo | Registro |
|---|---|
| Frontend | `origin/develop` `32f9e82da26f07789b7fd92f3480fd6ea9700260`; el código de producto export/baja/teclado continúa igual a `f4ceb708`. `4878aea` corrige la expectativa de una prueba existente y `32f9e82` incorpora guard de caché y tests |
| Causa y corrección | En Release (`--dev=false`), Expo SDK 54 omitió el reset de Metro cuando `CI=1`, permitiendo reutilizar valores transformados de otra edición. El guard ahora deriva `cacheVersion` de SHA-256 sobre las variables `EXPO_PUBLIC_*` ordenadas, sin imprimir ni almacenar sus valores |
| Validaciones | Cinco tests nuevos del guard; 424/424 unitarias localmente y TypeScript. CI `4878aea` completó con 161 browser aprobadas, 418 aprobaciones y un test Swift omitido. CI de `32f9e82` en curso. Releases de 32 auditados: free con 2473 fuentes, cero IAP, flags free correctos, 20 manifests y firma; interno con 2493 fuentes, 16 coincidencias exactas, flags internos correctos, Coordinator/IAP/OpenIAP/Sharing/FileSystem, 20 manifests, firma ad hoc y familias iPhone/iPad. El perfil free→internal con `CI=1` y sin reset manual pasó; conteos de bundles JS de prueba 2532/2552. El bundle intermedio `4878aea` CI=0 se conserva como evidencia anterior |
| Límites | Release interno `32f9e82` aún no instalado/ejecutado; prueba de UI de teclado posterior a `f4ceb708` pendiente en dispositivo. Sin merge, despliegue o promoción de servicios |
| Documentos | `docs/architecture/03-frontend-components.md`, `docs/data/03-integration-matrix.md`, `docs/delivery/02-ios-development-evidence.md`, `docs/flows/24-customer-profile.md`, `docs/references/02-gaps.md`, `docs/references/05-change-history.md` |

### 2026-11-01 — Exportación y baja de cuenta; cierre de evidencias iOS

| Campo | Registro |
|---|---|
| Documentación | Actualización de la evidencia de perfil y los límites de integración, componentes, brechas e historial; catálogo regenerado en el commit posterior para conservar el gate limpio de fuentes |
| Frontend | Corte anterior: `origin/develop` en `4878aeac961bc92bd4468ad0e8e13a3bb9f9914e`; producto igual a `f4ceb708` y el commit posterior corrigió la expectativa de una prueba existente. En ese corte, CI de 487 seguía en curso; se cerró después, según la actualización siguiente |
| Backend | Sin cambios; `gagonzalez1/app-loyalty` `fork/develop` permanece en `7fd33df`. PR #47 en borrador, sin promoción a `am-p/app-loyalty` |
| Cambios detectados | Exportación de cuenta comprobada por API y UI web/nativa con límites separados; baja API comprobada con la cuenta descartable. La baja confirmada desde la UI nativa no se ejecutó; se verificó apertura, escritura de BAJA y cancelación sin eliminar las cuentas originales. La hoja de exportación nativa se mostró y canceló con limpieza del temporal, sin completar Guardar en Archivos |
| Evidencia de cuenta | Export API devolvió 200; la baja API respondió 202 y la comprobación de base confirmó anonimización y revocación de sesiones para la cuenta descartable. Cuentas 2 y 3, marca 2 y ledger de 11 movimientos permanecieron intactos. El cambio de email recibió `503 EMAIL_CHANGE_UNAVAILABLE`; email sin cambios y no se envió correo |
| Validaciones frontend | En `f4ceb708`: 419/419 pruebas unitarias y TypeScript; Chrome y WebKit 5/5 para export/baja y controles visibles a 390×480. En el corte de esta entrada, CI 487 y la auditoría interna nueva estaban pendientes; la actualización siguiente registra el resultado CI y la auditoría intermedia con `CI=0`. La auditoría `free` de f4 pasó (2473 fuentes, cero IAP, Expo Sharing/hash del backport y 20 manifests de privacidad). `69ad97f` seguía siendo la evidencia interna histórica |
| Decisiones/entorno | Apple Developer y Google OAuth siguen pospuestos. No hubo merge ni promoción/despliegue de servicios; la rama frontend recibió commit directo en `develop` y su PR permanece abierto |
| Documentos | `docs/data/03-integration-matrix.md`, `docs/architecture/03-frontend-components.md`, `docs/references/02-gaps.md`, `docs/references/05-change-history.md`; el flujo de perfil y la evidencia de entrega se actualizaron por separado |

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
