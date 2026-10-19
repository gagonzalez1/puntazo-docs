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

### 2026-10-19 — Unificación de PR y limpieza de ramas frontend

Las PR66–80 y65 están integradas; al iniciar, main/testing coincidían en29f91e9. Se retiraron31ramas propias remotas cuyos HEAD eran ancestros de testing, con gitbundle verificado para recuperar referencias y leases por SHA para evitar borrar avances concurrentes. La primera pasada dejó14ramas. Por pedido posterior de conservar sólo principales, se archivaron y retiraron también las restantes ramas propias; todo el contenido único conserva referencias y gitbundle verificable. Worktrees locales preservados. La rama ajena identificada requiere autorización específica; estado final en la reconciliación.

[PR82](https://github.com/gonzalotev/app-fidelidad/pull/82), desde el fork gagonzalez1/app-fidelidad y destino testing, reemplaza60/61/81 (cerradas). El traslado81→82 conserva exactamente el candidato. Su candidato6c8d1f7 extrae precios públicos del alta y tres guards de checkout Android; conserva edad, updates, canje, apellido, sesión, PDF/mapa/cardA actuales. APIprecios HTTP200,166unitarias/Doctor18/18/web/PWA/exportJSAndroid/23browser PASS. No se fusionó ni desplegó esta candidata, no hay binario nuevo; no cambia la evidencia runtime anterior.


### 2026-10-19 — Card con pie A reemplaza composición C

El usuario cambió su selección a A. [PR80](https://github.com/gonzalotev/app-fidelidad/pull/80)/testing `45ab3f972f7722bb8a208fdb00a39d7b65d8d7d6` publicada: identidad/progreso sobre color de marca completo, pie neutro con acciones iguales; funciones/editor comercial conservados.153unidades,Doctor18/18,10browser/cincoanchos,web/PWA/exportJSAndroid y QA real claro/oscuro PASS. SinAPI/DB/producción/APK/AAB nuevos; V2 idea, portal sin publicar. C queda como corte histórico.


### 2026-10-19 — Opción C: tarjeta, premios y menú unificados

- [PR79](https://github.com/gonzalotev/app-fidelidad/pull/79) integrada/desplegada en testing `d20abd436ff935a346905a791f076017cbf96d4c`: card neutra con identidad, panel de progreso de marca y dos acciones iguales. Mis Tarjetas adopta la composición C elegida por el usuario; el editor comercial conserva sus plantillas. Backend sin cambios.
- TypeScript,153 unidades,Doctor18/18,web/PWA,exportJSAndroid y10 browser PASS; Sellos/Puntos, cinco anchos, temas, premios/menú, plantillas, celebración y PDF. QA real en Comercio1 y evidencia del despliegue en runtime. Sin APK/AAB, QA física ni cambios de producción.
- Documentos: flujo23, componentes frontend, runtime e historial. Aprobación visual explícita; sin nueva decisión de negocio/contrato, sin modificación de C4 de contenedores o secuencias. Portal sin publicar; V2 sigue idea.


### 2026-10-19 — Alinear las cajas de acciones del local

- [PR78 frontend](https://github.com/gonzalotev/app-fidelidad/pull/78) integrada/desplegada en testing4c1c3be: cuatro acciones a todo el ancho, dos columnas de igual tamaño y separación uniforme. Fuente candidata751bb1f, controles y publicación con ramas frescas/checkouts limpios. Backend sin cambios.
- TypeScript,153unidades,Doctor18/18,web/PWA,exportJSAndroid y13browser PASS. Geometría comprobada en cinco anchos320–1440px y CUA real519×730 sobre Amalia: cuatrobotones230×56px/gaps8px. CI/Deploy PASS; producción preservada. Sin nuevo APK/AAB ni QA física.
- Documentos: flujo25, corte runtime e historial. Aprobación visual explícita del usuario; sin decisión de negocio/contrato nueva, ni cambios de C4/secuencias. PR12 documental actualizada; portal sin publicar y V2 sólo idea.

### 2026-10-19 — Ver menú y reseña Google desde el resumen

- Frontend PR77 integrada en testing `50d56b9`, API `ea831cf`/0042 publicada en `fork/closed-test-readiness`; PR39 al propietario sigue abierta. Ver menú directo y resolución autenticada del destino Google para una sucursal elegible, sin exigir tarjeta/compra ni mutar invitaciones. Configuración existente y consulta de una sucursal, caché cinco minutos; sin N+1 ni URL inventada.
- Despliegues API/web terminados a las 13:03:11/13:06:13 UTC, CI/assets aprobados. Se autorizó por separado un INSERT QA de configuración manual de Amalia/sucursal 1 a las 13:06:47 UTC, `enabled=false`, con backup/checksum e inversa comprobada; otros fingerprints/producción preservados. El endpoint permanece de sólo lectura.
- Backend race/vet/OpenAPI y frontend 153 unidades/typecheck/Doctor/build/export JS aprobados; 13 browser en 28,60 s aprobados. QA real: cuatro acciones, PDF interno de ocho páginas/regreso con búsqueda y formulario Google Amalia con estrellas/texto vacíos y Publicar deshabilitado, sin enviar opinión.
- Actualizados flujo 25, matriz, componentes frontend y corte de runtime. No cambia el OpenAPI objetivo del portal ni V2; Android sólo export JS, sin binario distribuido/QA física. Portal sin publicar. [Fuentes y evidencia](#/runtime-snapshot).

### 2026-10-19 — Opciones del local desde la tarjeta del mapa

- Aclaración del usuario: la tarjeta del carrusel debe abrir el resumen existente con Mostrar en mapa y Conoce más. PR76, fuente `4461c4d`, integrada en testing `bbbe9c8`, limita el resumen al local seleccionado y conserva el regreso desde el detalle; contador/favoritos/cierre limpian ese filtro.
- Actualizados sólo flujo 25 y corte de runtime; se conserva como histórica la QA CABA donde la tarjeta centraba el punto. No cambian API, esquema, datos, C4 ni visor PDF.
- 153 unidades, typecheck, Doctor 18/18, build web, export JS Android y seis browser existentes aprobados. CI y despliegue aprobados a las 12:27:38 UTC; assets públicos coincidentes con el contenedor y bundle nuevo comprobado tras actualizar SW. QA real aprobada: resumen individual desde tarjeta, detalle/regreso, Mostrar en mapa, contador 37, búsqueda y Enter, sin escrituras ni nueva lectura PDF. Sin binario nativo distribuido ni publicación del portal.

### 2026-10-19 — Confirmación explícita de edad y sesión compartida entre pestañas

- PR73 integra en testing `ae706dda` el flujo de edad que faltaba: no se montan lecturas privadas/contextos/SSE con flag false; cliente/comercio restaurados sin onboarding esperan y `/menu/*` permanece público. Contrato backend existente, sin nueva API, migración ni confirmación administrativa.
- Confirmación manual humana a las 04:05:58 UTC y tarjeta 200; después se reportó cierre inesperado. Se registra como incidencia de sesión independiente, sin atribuir logs agregados a una cuenta o una revocación concreta.
- PR74 integrada en `testing` `7dfa39a` implementa conservación de credenciales/cooldown, recuperación de restore, Web Locks y renovación SSE por expiración, con CI y despliegue aprobados a las 04:26:46 UTC. La QA real de tres pestañas no repitió logout, pero agotó cuota por rotaciones repetidas y dejó el QR cargando; PR75 integra coordinación de access en memoria entre pestañas en `testing` `ed9b9fa`, con CI aprobada y aceptación real de tres pestañas limitada a la ventana posterior de 242,73 s. Pruebas locales 144 unidades, typecheck/Doctor/build/export y 15 casos simulados edad/sesión más cuatro regresiones de menú aprobados; guardias de ID/sesión sólo revisadas estáticamente.
- PR75: BroadcastChannel del mismo origen, marcador opaco/no secreto en localStorage y Web Locks, sin persistir tokens. 153 unidades (nueve de protocolo), typecheck/Doctor/build/export y 19 browser en 80,97 s aprobados; pruebas simuladas de tres pestañas, SID antiguos, expiración, reload/logout y cambio de identidad. Desplegada a las 04:46:56 UTC; QA real aprobada durante 242,73 s en tres pestañas sin login/spinner/error. Una renovación 200 y cero refresh 401/429 en logs agregados, recuperación visible ante reconexiones SSE y recorrido mapa → Amalia → PDF → tarjeta aprobados.
- Actualizados auth/pasaporte, login/restauración, C4 frontend, matriz, brechas y corte de runtime. La aceptación se limita a esa ventana; no acredita nuevo binario distribuido ni QA física; portal sin publicar. [Estado observado](#/runtime-snapshot).


### 2026-10-19 — Nombres y ubicaciones de los fixtures CABA en el mapa

- Solicitud explícita de añadir nombres/ubicaciones a los tres registros QA ya cargados. A las 03:33:14 UTC se actualizaron tres marcas y tres sucursales con sufijo - TESTING, domicilios y puntos aproximados Georef corroborados por USIG. Piegari Carnes corresponde a Posadas 1089; no se usa la dirección Ristorante 1042.
- Backup y restauración aislada aprobados; snapshot/rollback cifrados. Marcas/sucursales en v2 y reejecución sin escrituras; estados de menú v3, documentos/hashes y publicación original de sucursal 29/v12 preservados. Continúan 37 tiendas elegibles, 16 con coordenadas (13 antes).
- API y CUA real aprobaron búsquedas, marcador/centrado, listado → ficha → menú y Volver para las tres cartas. Actualizados flujos mapa/PDF y nuevo suplemento de runtime; corte anterior del seed sin nombres/coordenadas preservado íntegro.
- Sin nuevo código, build, despliegue ni migraciones: frontend `9074aa57` y API `64bb3fc`/0042. No nueva subida comercial, QA nativa física ni publicación del portal. [Evidencia y alcance](#/runtime-snapshot).


### 2026-10-19 — Dataset de cartas CABA para QA de consulta pública

- Solicitud explícita: descargar tres PDFs y cargarlos por base de datos. Se publicaron fixtures Amalia, Piegari y El Arte de la Pizza en sucursales sintéticas 1/2/37, con nombres PRUEBA; catálogo y menú previo de sucursal 29 preservados. Sin cambio de código ni nuevo despliegue: frontend `9074aa57` y API `64bb3fc`/0042.
- Backup cifrado/restore aislado aprobados; tres documentos READY y tres publicaciones v3. Parser fuente y entrega API/storage de los tres aprobados, con hash/tamaño/MIME y privacidad de firmas. CUA real de primera/última página de las tres cartas aprobada a las 03:21:33 UTC, con único Volver y sin desbordes; texto e imagen comprobados.
- Actualizados flujo PDF, brechas de compatibilidad y suplemento del estado observado, sin modificar la aceptación histórica del visor de las 03:04 UTC. Baradentro/Capitán/FICO rechazados por el parser no se cargaron; no se aprueba validación relajada ni se amplían límites.
- La carga por base de datos no acredita upload UI/HTTP, permisos/If-Match ni QA física. [Fuentes y alcance de la prueba](#/runtime-snapshot); portal sin publicar.


### 2026-10-19 — Cliente PDF a pantalla completa y título libre de Volver

- [PR71](https://github.com/gonzalotev/app-fidelidad/pull/71) y [PR72](https://github.com/gonzalotev/app-fidelidad/pull/72) integradas en `testing` como `9074aa57fe84d8f0ec03d50898d532d4857ce4c3`. Fuente de app `8ac19ee`; ajuste posterior `bacf196` sólo de CSS servido y prueba. Backend y datos sin cambios.
- Cliente sin cabeceras, metadatos ni herramientas: un Volver y scroll continuo con canvas diferidos/presupuesto total de seis millones de píxeles; renovación de firma automática una vez. Asistente oculto sólo en `/menu/`; comercio conserva sus controles. La observación real detectó el título tapado por Volver: PR72 reserva 56 px al inicio del scroll sin reducir el iframe.
- Actualizados flujo PDF, C4 frontend, matriz, brechas, flujo de mapa, guía y estado observado. Se conserva el corte de PR70 y la evidencia histórica de 30 MiB/PWA; V2 futura.
- Build/typecheck aprobados; 14 casos browser en 32,5 s y selección de siete comprobaciones CSS en 20,3 s, sin sumarlos como casos únicos. Export JS nativo de `8ac19ee` aprobado; app/src no cambió después, sin APK/AAB distribuido. QA pública real y recursos del contenedor verificados; [fuentes, runtime y alcance](#/runtime-snapshot). No publica portal ni producción.

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
