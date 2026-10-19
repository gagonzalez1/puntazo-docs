---
id: runtime-snapshot
title: Estado observado · Fuentes y despliegues
group: 05 · Referencias
order: 60
parent: documented-commits
level: reference
status: mixed
authority: mixed
summary: Corte fechado con SHA completos, deriva de publicación y configuración por ambiente.
diagram: false
---

# Estado observado

## Acciones alineadas · 19/10/2026 10:25–10:27 Argentina (13:25–13:27 UTC)

Frontend [PR78](https://github.com/gonzalotev/app-fidelidad/pull/78), candidato `751bb1fda3a60fdb8708719c32a3fc104a38d3d5`, integrado y desplegado desde `testing` **`4c1c3bef03b9063cd4dc48b00b9ae1fdfc20da07`**. Rama remota obtenida de nuevo y checkout limpio antes de build/export/deploy. Coolify `g6xp3qdlwizhnnzruyiuo0tn` finished13:25:52UTC, imagen `sha256:333d71e7e3b848217e5e517f6bfb9c3e87efbcddffbc014c5da708363d77b1f3`, healthy/cero reinicios,384MiB/0,5CPU y redes preservadas. Entry público `3d079f93e6074c4af262a16856f5cb6c`,SW y reader coinciden con contenedor; nuevo bundle observado en DOM tras recargas, conservando sesión.

Las acciones del local ocupan dos columnas iguales a todo el ancho de la tarjeta. TypeScript,153unidades,Doctor18/18,web/PWA,exportJSAndroid y13browser PASS; el caso existente verifica dimensiones y gaps en320/390/519/768/1440px. CI [39259360326](https://github.com/gonzalotev/app-fidelidad/actions/runs/39259360326) y Deploy [39259740350](https://github.com/gonzalotev/app-fidelidad/actions/runs/39259740350) SUCCESS. CUA real519×730: búsquedaAmalia→resumen, cuatroacciones230×56px, separación8px y sin overflow. Se dejó la ficha abierta. Esta continuación visual no repitió PDF ni formulario Google reales; sus pruebas funcionales simuladas pasaron.

API testingea831cf/0042, API productivadbeb03c/0035 y web productiva34bbcb7 preservadas con imágenes/versiones idénticas. Sin API,datos,migraciones,dependencias o permisos nuevos; Android sólo exportJS, sinAPK/AAB ni QA física/PWAinstalada. Rollback web50d56b9 disponible. Evidencia: `artifacts/map-card-actions-responsive-20261019/{context-deploy.json,runtime-after.json,public-assets.json,validation.json,live-layout.json,selected-store-final.png}`. Sólo cambia presentación; C4,secuencias y contrato siguen vigentes. Portal sin publicar; V2 sigue idea.

## Menú y reseña Google en el resumen · 19/10/2026 10:03–10:09 Argentina (13:03–13:09 UTC)

Entrega desplegada y verificada en testing. Frontend [PR77](https://github.com/gonzalotev/app-fidelidad/pull/77), candidato `77e31dc7881428ffd22f2f825dc187a267c32ddb`, integrado en la rama seleccionada fresca `testing` como **`50d56b9bedb0fd4ad6ad2134e9497252535a791b`**. API **`ea831cf863b1e6852843198baa9ac4c4c134b4db`/0042**, rama seleccionada `fork/closed-test-readiness`, publicada para testing; [PR39 al propietario](https://github.com/am-p/app-loyalty/pull/39) sigue abierta y no se presenta como integrada en su main. Fuentes finales limpias e iguales a los remotos seleccionados; no hay migración nueva.

La API añade GET autenticado `/v1/clientes/me/tiendas/:branch_id/resena-google`, con cliente/edad/elegibilidad del mapa: envelope `{branch_id, review_url:null|stringHTTPSGoogle}`, 404 inelegible, 503 Places no disponible y `Cache-Control: no-store`. Reutiliza configuración `MANUAL_LINK`/`GOOGLE_PLACE`, sin exigir compra/tarjeta ni reservar/consumir invitaciones o escribir sus eventos. `enabled` mantiene su función en invitaciones automáticas. El frontend consulta sólo la sucursal del resumen/detalle, caché de cinco minutos, y usa `openReviewURL`. Ver menú navega a la ruta pública existente. No genera un destino Google para locales no configurados.

Coolify API `5wbfusxiljun2jmg6qipgpnc` terminó a las **13:03:11 UTC**, imagen `sha256:8706fa01fcada23053bd5b255c7f5fcb694dbd33e54d0397983cb33edab3bcf0`, healthy/cero reinicios y 768 MiB/1 CPU. Coolify web `7cazcjcysigce8yv9tm7l00f` terminó a las **13:06:13 UTC**, imagen `sha256:d0b18230648b38463105ed13e314afd78d85fd7e3bd876615093e6fbe41c9d6e`, healthy/cero reinicios y 384 MiB/0,5 CPU; redes conservadas. Web productiva `34bbcb7`, API productiva `dbeb03c`/0035 y sus imágenes/versiones observadas permanecen iguales y saludables. Entry público `f24701c2347a0ca902102e81ba7e78b9`, SW y reader coinciden con los bytes del contenedor; bundle nuevo observado tras recargas, manteniendo la sesión.

Validación: backend `go test -race -count=1 ./...` contra PostgreSQL 16 aislado, `go vet` y lint OpenAPI aprobados; CI [39255875885](https://github.com/am-p/app-loyalty/actions/runs/39255875885) aprobada. Frontend typecheck, 153 unidades, Doctor 18/18, build web con API fixture y export JS Android aprobados; **13 browser en 28,60 s**, sin fallos, flaky ni skips. CI [39256042739](https://github.com/gonzalotev/app-fidelidad/actions/runs/39256042739) y workflow de despliegue [39257011709](https://github.com/gonzalotev/app-fidelidad/actions/runs/39257011709) aprobados.

La búsqueda en Google Maps y la activación de Amalia fueron autorizadas explícitamente. Se comprobó negocio/dirección Humberto 1º 299 y formulario de opinión del Place ID `ChIJNZB5usY1o5URYGKczVi__po`. A las **13:06:47 UTC** se confirmó **un INSERT de configuración de reseñas de testing, sucursal 1/marca 1**, `MANUAL_LINK`, `enabled=false`, versión 1. Backup/checksums con archivo 0600/directorio 0700 e inversa con savepoint aprobados. Fingerprints de usuarios, marcas, sucursales, menús/documentos, invitaciones, progreso y otras configuraciones se conservaron; las sucursales 2/37 siguen sin destino. Esta escritura QA autorizada se distingue del endpoint de sólo lectura; no se afirma una entrega sin escrituras de base ni activación de invitaciones automáticas.

La QA CUA real aprobó a las **13:09:35 UTC**, en 573×730 con sesión cliente existente y sin mocks: buscar Amalia → tarjeta → resumen con cuatro acciones → Ver menú → `/menu/1`, PDF real interno con ocho páginas y un único Volver → mapa conservando búsqueda → reabrir resumen → Calificar en Google Maps. Abrió otra pestaña con Escribir una opinión y encabezado Amalia, estrellas sin seleccionar, texto vacío y Publicar deshabilitado. **No se envió calificación ni opinión**; se cerró esa pestaña y se dejó abierto el resumen. No acredita PWA instalada, QA física ni APK/AAB distribuido; Android sólo tiene export JS aprobado.

Evidencia: `artifacts/map-card-menu-review-20261019/source-final.json`, `runtime-web-after.json`, `public-assets.json`, `backend-local-validation.json`, `frontend-validation.json`, `amalia-review-config-report.json`, `amalia-google-discovery.json`, `live-qa.json`, `menu-open.png` y `selected-store-final.png`. Portal sin publicar; V2 sigue futura.

## Opciones del local desde el carrusel · 19/10/2026 09:27–09:29 Argentina (12:27–12:29 UTC)

[PR76](https://github.com/gonzalotev/app-fidelidad/pull/76), fuente frontend `4461c4d5a593809cd2988ffb9cd621d4883a2afc` sobre la base `testing` `ed9b9fa`, se integró en la rama seleccionada fresca `testing` como **`bbbe9c891768aa0e7b65f0e5bafdb90721d42336`**. Modifica sólo la pantalla del mapa: tarjeta → resumen de la sucursal con Mostrar en mapa y Conoce más → detalle → Volver al local. Cerrar, Mostrar en mapa, contador y favoritos limpian el filtro individual. No cambia API, esquema, datos ni visor PDF.

Coolify `oamkh19bdds8wpgj3kzbkxkv` terminó a las **12:27:38 UTC**, fuente `bbbe9c891768aa0e7b65f0e5bafdb90721d42336`, imagen `sha256:770cfcf270c92765c4709c7fcd41a4ab6b8e9fde7d0a4dbe4c8e348469f65b99`; healthy, cero reinicios, 384 MiB/0,5 CPU y redes conservadas. API testing `64bb3fc`/0042, web productiva `34bbcb7` y API productiva `dbeb03c`/0035 permanecen iguales y saludables. CI [39251467725](https://github.com/gonzalotev/app-fidelidad/actions/runs/39251467725) y workflow de despliegue [39251924246](https://github.com/gonzalotev/app-fidelidad/actions/runs/39251924246) aprobados.

Validación local: 153 unidades, typecheck, Doctor 18/18, build web con API fixture, export JS Android y **seis casos browser existentes en 12,34 s**, sin fallos, flaky ni skips. El primer build se detuvo por configuración pública local ausente y se repitió con configuración explícita tras otro gate limpio, sin cambio de producto. Entry público `f80090c6d650879dab17ed22339079c9`, SW y reader PDF coinciden con el contenedor. La primera recarga conservó el bundle anterior; la segunda aplicó el nuevo, observado en DOM antes de la QA.

La QA CUA real, sin mocks y con sesión existente, aprobó a las **12:29:17 UTC** en el navegador integrado (capturas de 573×730): tocar Amalia sin búsqueda abrió sólo su resumen; Conoce más abrió detalle con Ver menú, y Volver al local recuperó el resumen. Mostrar en mapa cerró/centró; el contador abrió las 37 tiendas; buscar Amalia dio un resultado; Enter abrió el resumen y volver al mapa conservó la búsqueda. La vista solicitada quedó abierta al finalizar. No hubo escrituras de datos/favoritos/auth/edad ni nueva QA de lectura PDF en esta continuación. Export JS Android no acredita APK/AAB distribuido ni dispositivo físico.

Evidencia: `artifacts/map-card-local-view-20261019/scope.md`, `context-deploy.json`, `validation.json`, `browser-results.json`, `runtime-after.json`, `public-assets.json`, `live-qa.json` y `selected-store-final.png`. Portal sin publicar.

## Edad y estabilidad de sesión · corte del 19/10/2026 01:02–01:51 Argentina (04:02–04:51 UTC)

[PR73](https://github.com/gonzalotev/app-fidelidad/pull/73) se integró en frontend testing `ae706dda013ed43881be623ed9236e5602c93d01`; Coolify `656lpyunnnsvbjp883dfnlml` terminó a las **04:02:51 UTC**, imagen `sha256:156ea6603170074ae654956219b8b5966e47a6a45d441a78275a96da670d3bb4`, healthy/cero reinicios y 384 MiB/0,5 CPU. API sigue en `64bb3fc901293791adcf7738c49d3bbf290c8a20`/0042; producción web `34bbcb7` y API `dbeb03c`/0035 permanecen sin cambios. No se agregó endpoint ni migración.

El diagnóstico inicial identificó cuenta activa/verificada sin confirmación de edad y rechazos 403 `ADULT_CONFIRMATION_REQUIRED` antes de tarjeta/mapa; no era ausencia de tarjetas de comercios. La UI de PR73 pide marcado y aceptación explícitos, difiere lecturas privadas/contextos/SSE y conserva `/menu/*` público. La persona afectada confirmó manualmente a las **04:05:58 UTC**, con endpoint y posteriores lecturas de pasaporte/tarjetas 200. El agente no aceptó edad en su nombre ni modificó ese estado por SQL. Google tampoco acredita mayoría de edad.

Luego el usuario confirmó un cierre de sesión inesperado. El diagnóstico del cliente encontró borrado de credenciales ante cualquier refresh no2xx; la ventana agregada mostró SSE 401/503 y refresh 429. Esa secuencia no vincula cada request con la cuenta afectada ni prueba por sí sola reutilización de refresh o la causa de una revocación. La estabilidad no se declara resuelta por el éxito anterior de edad/tarjeta.

[PR74](https://github.com/gonzalotev/app-fidelidad/pull/74) se integró en la rama seleccionada `testing` como `7dfa39a033caab134498b19738b7c63d5a574470`, desde `58d2c28fc3ca1fffef4d0faf5e54e826c04ad070` (mismo árbol de producto que `180cec6`). **CI aprobada y desplegada; su QA real fue parcial y no cerró la incidencia.** Conserva credenciales ante fallos transitorios/malformados de refresh, respeta Retry-After, expone recuperación de restore, serializa escrituras de cookie con Web Locks disponibles, renueva SSE sólo por expiración y evita restore/stream en carga pública del menú. Coolify `58gq4srpcoeucoihjgtpm47r` terminó a las **04:26:46 UTC**, fuente `7dfa39a033caab134498b19738b7c63d5a574470`, imagen `sha256:823ca9cd264656ec6a05ac35ca425c555ff0034493cb66234bd808f98424124b`; healthy, cero reinicios, 384 MiB/0,5 CPU. Backend/esquema/producción permanecieron iguales.

CI [39199062993](https://github.com/gonzalotev/app-fidelidad/actions/runs/39199062993) aprobada, incluida auditoría. El workflow de despliegue [39199304730](https://github.com/gonzalotev/app-fidelidad/actions/runs/39199304730) publicó PR74; la salud del contenedor no acredita estabilidad de sesión. Validación local de la fuente: 144 unidades, typecheck, Doctor 18/18, build web y export JS Android aprobados. JSON browser: **15/15 casos de edad/sesión en 58,74 s**, sin fallos, flaky ni skips, con respuestas simuladas; **4/4 regresiones de menú/mapa/scans en 2,98 s**. Incluye 429/503/red/2xx inválido, refresh401 definitivo, restauración fallida y reintento, SSE con access vigente/expirado, dos pestañas y menú público/retorno privado. Las guardias de ID/sesión y respuestas tardías fueron revisadas estáticamente; no se presenta una prueba de carrera de cambio de identidad como ejecutada. Tampoco se acredita QA física, APK/AAB distribuido ni PWA instalada.

La QA real posterior, con tres pestañas actuales, no repitió el cierre de sesión pero encontró QR cargando y rotaciones REST repetidas. El diagnóstico de las 04:28:41 UTC registró diez refresh 200 nuevos entre 04:27:30–04:27:40 y 429 desde 04:27:41; la cuota es diez/600 s, no se afirma un instante exacto de desbloqueo. Las consultas de identidad también completaron 200. Los logs agregados no vinculan cada petición con la cuenta ni demuestran por sí solos la causa del spinner; la observación del cliente y el código son consistentes con invalidación sucesiva del access de otras pestañas pese al lock de cookie. Los 19 casos simulados de PR74 no acreditan ese escenario estable.

[PR75](https://github.com/gonzalotev/app-fidelidad/pull/75), rama `fix/shared-web-session-20261019`, está **integrada y desplegada, con CI y QA real de tres pestañas aprobadas en la ventana observada**. Fuente seleccionada fresca de `testing`: `ed9b9facc73c9ca60e2a16fb96f7e7847fa89f16`, desde el candidato `0cc8ce2017f92d07fcfd81f2327cf4cf624be628`. Comparte access sólo en memoria mediante BroadcastChannel del mismo origen, marcador opaco/no secreto de autoridad en localStorage y Web Locks. No persiste tokens ni cambia backend/cuota. La revisión comprueba autoridad, correlación, expiración, exclusión del token rechazado, logout sin bucles e identidad local coherente.

CI [39200735475](https://github.com/gonzalotev/app-fidelidad/actions/runs/39200735475) aprobada, incluida auditoría; workflow de despliegue [39201016272](https://github.com/gonzalotev/app-fidelidad/actions/runs/39201016272) aprobado. Coolify `bxekqytotzpboey8c4fb9bse` terminó a las **04:46:56 UTC** (01:46:56 Argentina), fuente `ed9b9facc73c9ca60e2a16fb96f7e7847fa89f16`, imagen `sha256:a951712f86b139f00145c12f8aebd2b2f5acc3490e58bd18ee16402d119b4a86`; healthy, cero reinicios, 384 MiB/0,5 CPU y redes conservadas. API testing `64bb3fc`/0042, web productiva `34bbcb7` y API productiva `dbeb03c`/0035 siguen iguales y saludables. Typecheck, 153 unidades (incluidas nueve del protocolo), Doctor 18/18, build web y export JS Android aprobados. El conjunto browser final pasó **19/19 en 80,97 s**, sin fallos, flaky ni skips, con respuestas simuladas. El caso de tres pestañas valida peers sin refresh adicional tras login, una rotación al expirar, REST que rechaza SID antiguos, reload sin POST, storage sin credenciales y logout/reingreso con otra identidad. No se extrapola a una carrera probada del POST de confirmación de edad ni a QA física.

La comprobación pública de las **04:47:22 UTC** cotejó entry `b13d1e754d50f038e7bfe62a3a8ee1b0`, service worker y reader PDF contra los bytes del contenedor, con respuestas HTTP 200 en login/tarjeta/mapa/menús/health/manifest. La QA real, sin mocks ni sesión inyectada, cubrió **04:47:41–04:51:43,730 UTC: 242,73 s** (más del mínimo de 185 s), en tres pestañas del navegador integrado con el bundle nuevo. Las tres conservaron tarjeta/membresía visibles sin nuevo login humano, spinner ni error. Se verificó mapa con 37 locales → búsqueda Amalia (un resultado/marcador) → listado/detalle → `/menu/1` renderizado → Volver al mapa → Mi tarjeta. No se publican capturas del QR privado.

La evidencia backend de esa ventana registra **un refresh POST 200 y cero 401/429/500/503 de refresh**, lecturas de identidad/pasaporte/tarjetas/mapa 200, una familia de sesión activa y última rotación a las 04:47:44,989 UTC. Son logs agregados de todas las cuentas/clientes, sin vínculo de actor/pestaña: no se atribuye cada request a la persona observada. Los SSE completados registraron seis 200 y cinco 503 breves, sin 401/403/429; hubo dos desconexiones del listener por deadline de 90 s y recuperación visible, sin refresh extra ni logout. No se presenta ausencia de 503 como criterio: la aceptación verifica recuperación y estabilidad de tarjeta en esa ventana. No acredita sesiones de mayor duración, navegador sin BroadcastChannel/Web Locks, dispositivo físico, binario distribuido o PWA instalada.

Evidencia: `artifacts/new-customer-card-20261019/backend-diagnosis.json`, `frontend-diagnosis.json`, `runtime-after.json`, `session-diagnosis.json`, `review.json`, `review-session.json`, `session-browser-results.json` y `session-menu-browser-results.json`, `runtime-session-after.json` y `session-live-diagnosis.json`. La evidencia de PR75 está en `context-shared-deploy.json`, `shared-local-validation.json`, `shared-ci-status.json`, `review-shared-session.json`, `shared-three-tab-results.json`, `shared-browser-results.json`, `runtime-shared-after.json`, `shared-public-bundle.json`, `shared-session-live.json` y `shared-browser-live.json` del mismo directorio. Este corte conserva la separación entre éxito de edad, mejora parcial de PR74 y aceptación de PR75 en la ventana real descrita; no amplía las pruebas de identidad/edad más allá de su alcance. Portal sin publicar.


## Suplemento mapa CABA · 19/10/2026 00:33–00:36 Argentina (03:33–03:36 UTC)

Operación de datos autorizada para que las tres cartas QA pudieran encontrarse por nombre y ubicación. Confirmada a las **03:33:14 UTC**, con backup cifrado/descifrado/checksum y restauración aislada aprobados, snapshot previo y rollback cifrados. Se actualizaron tres marcas y tres sucursales (1/1, 2/2 y 37/36), con nombres **Amalia Restaurante & Cava - TESTING**, **Piegari Carnes - TESTING** y **El Arte de la Pizza - TESTING**, domicilios oficiales y coordenadas aproximadas. Las tres marcas y sucursales quedaron en versión 2; se preservaron los demás campos/registros y conteos. La reejecución confirmó ALREADY_APPLIED, sin nuevas escrituras. `operation-evidence.json` registra versiones de entrada 1; `idempotence-report.json` confirma las finales 2. El inventario elegible sigue en 37, ahora 16 con coordenadas (antes 13).

Los puntos almacenados son los Georef del plan congelado, registrados también en `selected_for_db`; los valores USIG de `proposed_point` son corroboración y no sustituyen la base. USIG queda a 11,77/1,55/6,41 m de los puntos Georef. En Posadas 1089 se resolvió la ambigüedad de dos candidatos separados 40,3 m a favor del primero; sigue siendo una localización aproximada por altura, sin acreditar entrada relevada. El nombre Piegari Carnes y el número 1089 corresponden al contacto oficial y al PDF CARNES conservado. [Tabla de nombres, fuentes y coordenadas](#/flow-customer-map-menu).

Los tres estados de menú permanecieron en versión 3 con los mismos document_id/punteros, bytes y SHA; la sucursal 29 siguió en versión 12 con su publicación `b4220335-ba40-436c-9e8f-bfa759104ae3`. La QA API de las **03:33:19 UTC** aprobó búsqueda por nombre y dirección, `has_menu`, hash/tamaño original de cada PDF y preservación de menú 29; logout del cliente QA devolvió 204.

La QA CUA de las **03:36:40 UTC**, con login normal del cliente, API real y sin interceptar respuestas ni inyectar sesión, comprobó en escritorio 1280×720 los tres nombres: un resultado por búsqueda, marcador y centrado correctos. Desde el botón de cantidad se abrió el listado, luego Conocé más → Ver menú → Volver. `/menu/1`, `/menu/2` y `/menu/37` mostraron la primera página del PDF y 8/9/8 contenedores, con un único Volver. Tocar directamente la tarjeta bajo el mapa centra el punto; la ficha se alcanza desde el listado. La sesión QA cerró por UI y se cerró la pestaña temporal. Esta operación no repite subida por el editor/multipart ni acredita QA física Android/iOS.

No hubo nuevo build o despliegue del producto: frontend testing `9074aa57fe84d8f0ec03d50898d532d4857ce4c3` y API `64bb3fc901293791adcf7738c49d3bbf290c8a20`/0042 permanecen como en los cortes previos. No cambia esquema, contrato PDF, límites ni producción. Son fixtures con nombres de prueba, sin afiliación comercial confirmada. La operación posterior de catálogo no altera la verdad histórica del seed de las 03:18 UTC, que no había cambiado esos campos.

Evidencia: `artifacts/menu-caba-map-20261019/operation-evidence.json`, `api-qa.json`, `ui-qa.json`, `review.json`, `idempotence-report.json`, `plan.json` y `location-sources.json`. El material fuente diferencia las coordenadas escritas de su corroboración USIG. Esta actualización documental no ejecuta SQL ni modifica infraestructura.


## Suplemento QA CABA · 19/10/2026 00:18–00:21 Argentina (03:18–03:21 UTC)

Datos de prueba incorporados por instrucción explícita del usuario de descargar PDFs y cargarlos por base de datos. **No hubo nuevo despliegue**: frontend testing `9074aa57fe84d8f0ec03d50898d532d4857ce4c3` y API `64bb3fc901293791adcf7738c49d3bbf290c8a20`/0042 siguen siendo las fuentes del corte anterior. El corte de verificación del visor de las 03:04 UTC conserva abajo su evidencia independiente.

A las **03:18:19 UTC** se confirmó el seed tras backup cifrado con checksum/descifrado y restore aislado aprobados. Se agregaron tres documentos READY y se fijaron tres publicaciones en versión 3: sucursal/marca 1/1 (Amalia, 8 páginas, 457.295 bytes), 2/2 (Piegari, 9 páginas, 122.637 bytes) y 37/36 (El Arte de la Pizza, 8 páginas, 12.669.083 bytes). Los destinos son Brand Fixture y K6 Synthetic: no se escribieron catálogo de comercios, nombres, domicilios ni coordenadas, ni se infiere afiliación de los restaurantes. Documentos pasaron de 5 a 8; usuarios 102, marcas 38, sucursales 39, tarjetas 41 y movimientos 206 permanecieron iguales. Sucursal 29 conservó versión 12 y publicación `b4220335-ba40-436c-9e8f-bfa759104ae3`.

El validador de la fuente testing `64bb3fc`, ejecutado mediante harness con función y dependencias verificadas, aprobó los tres archivos a las 03:17:22 UTC. No escribió base/storage durante esa validación. El seed posterior verificó hash y bytes en storage privado con cifrado AES256. La consulta pública a las **03:19:30 UTC** aprobó para los tres: JSON no-store, PDF HTTP 200 application/pdf con tamaño/SHA originales, firma de 300 segundos, acceso sin firma rechazado (403) y marca con `has_menu`. No se persistieron URLs firmadas.

La QA CUA real, sin mocks ni sesión inyectada, se completó a las **03:21:33 UTC**: primera/última página de Amalia (8), Piegari (9) y El Arte (8) visibles, con un único Volver, frame/viewport de 1280×720 y sin desbordes. El Arte requirió scroll largo hasta la octava página, mostró su imagen y precios sin alertas y liberó el primer canvas. Se comprobó lectura de texto e imágenes; esto no afirma inspección exhaustiva de cada página ni de cada precio. Se rotula Piegari de forma genérica: el origen está en una página oficial Ristorante, pero el PDF dice CARNES. [Tabla, fuentes y tamaños](#/flow-branch-menu-pdf). No se presentan las cartas/precios como vigentes.

La carga autorizada por base de datos no ejercita selección de archivo del comercio, POST multipart, roles/If-Match ni manejo de rechazo en ese endpoint. Los tres rechazos previos del parser (Baradentro, Capitán y FICO) se conservan en [brechas de compatibilidad](#/implementation-gaps), sin cargar esos documentos ni aprobar validación relajada. No se ampliaron límites ni se modificaron fuentes, migraciones o producción. QA física Android/iOS, PWA instalada y APK/AAB distribuido siguen sin acreditarse.

Evidencia local: `artifacts/menu-pdf-caba-20261019/seed-evidence.json`, `seed-manifest.json`, `public-qa.json`, `validator-final-accepted-report.json`, `fixtures/sources.json` y `ui-qa.json`; capturas `amalia-client.png`, `piegari-client.png`, `pizza-client.png` y `pizza-last-page.png`. El reporte registra respaldo y rollback; esta documentación no aplica SQL ni modifica infraestructura.


## Cliente PDF a pantalla completa · 19/10/2026 00:04 Argentina (03:04 UTC)

Fuente seleccionada y obtenida nuevamente: `gonzalotev/app-fidelidad:testing`, `9074aa57fe84d8f0ec03d50898d532d4857ce4c3`, checkout limpio y coincidente con el remoto. [PR71](https://github.com/gonzalotev/app-fidelidad/pull/71) y [PR72](https://github.com/gonzalotev/app-fidelidad/pull/72) integradas. La primera se desplegó como `910b0531ac5e22f83acbd6b11d918f094f85832d`; la segunda completa el margen inicial de lectura. Los SHA acreditan lo observado y nunca seleccionan un build futuro.

| Componente | Runtime observado |
|---|---|
| Web testing | `9074aa57fe84d8f0ec03d50898d532d4857ce4c3`, healthy, cero reinicios, 384 MiB/0,5 CPU |
| API testing | `64bb3fc901293791adcf7738c49d3bbf290c8a20`, esquema 0042, versión/readiness 200; sin cambios |
| Web / API producción | `34bbcb798d1bd7fbcad76f13c2c9ecd1fc37ef1a` / `dbeb03cff69ec512cb7f59f0a92fe8c8bfd9d181`, esquema 0035; sin cambios, saludables |

Coolify PR71 `abspprddi1zvfwhju6yzedhe` terminó el 19/10 a las 02:15:43 UTC (18/10 23:15:43 Argentina). La publicación final PR72 `xrhf9p0arjnmbhi1huwidroc` terminó a las **02:22:46 UTC (18/10 23:22:46 Argentina)**, imagen `sha256:581ce267db0cc0baf96e93c8085fc50e9158167aa369c13978d9864dc602ce6e`. Redes web conservadas: `coolify`, `dhzoesfa51iivxxrezzvz7wx`, `puntazo-backoffice-testing-api`. La lectura de runtime se registró a las 03:02 UTC.

CI [PR71 39188565272](https://github.com/gonzalotev/app-fidelidad/actions/runs/39188565272), [PR72 39189303514](https://github.com/gonzalotev/app-fidelidad/actions/runs/39189303514) y [despliegue final 39189496930](https://github.com/gonzalotev/app-fidelidad/actions/runs/39189496930) aprobados. Typecheck y build web aprobados; 14 pruebas browser dirigidas en 32,5 s y una selección de siete pruebas CSS en 20,3 s, sin afirmar 21 casos únicos ni suite global. La exportación JS nativa pasó en `8ac19ee4a85392b22057fbbc7d668f364505dfaa`; el diff hasta la fuente final sólo afecta CSS servido y su prueba, sin cambios de app/src posteriores. No se generó/distribuyó APK/AAB nuevo.

La QA pública anónima de las **03:04 UTC**, por CUA y sin mocks ni sesión inyectada, abrió `/menu/29`: PDF visible, título libre de Volver, un solo botón y ningún control adicional. En 1280×720 el iframe coincide con el viewport (x/y 0, ancho 1280, alto 720), sin desbordes; Volver llevó a login. La observación anterior había detectado el botón sobre parte del título y motivó PR72: se reservan 56 px al inicio del scroll, manteniendo el iframe a pantalla completa. El comercio conserva `index.html` y sus herramientas.

Diez recursos públicos coincidieron por hash con el contenedor, incluidos bundle, reader, CSS, renderer, worker, decoder y SW. Renderer servido con `no-store`, SAMEORIGIN, `frame-ancestors self` y sin referrer; las páginas de app conservan DENY. Reader fuera del precache; sin herramientas para cliente y controles comerciales preservados. Evidencia de tarea: `artifacts/menu-fullscreen-20261018/runtime-final.json`, `public-assets.json`, `live-qa.json` y `menu-fullscreen-live.png`.

El reader recorre todas las páginas con carga visual diferida y un presupuesto de canvas compartido de seis millones de píxeles. Renueva la firma una sola vez ante fallo e ignora errores repetidos durante la consulta; el cierre cancela trabajo. No cambia API, esquema, 30 MiB/1–30 páginas, permisos ni TTL. La comprobación de navegador no acredita QA física Android/iOS, APK/AAB distribuido ni PWA instalada. Portal y producción no se publican; V2 permanece futura.

## Corte PR70 · búsqueda y PDF interno · 18/10/2026 21:49:35 Argentina (19/10/2026 00:49:35 UTC)

[PR70](https://github.com/gonzalotev/app-fidelidad/pull/70) integrada en la rama seleccionada `gonzalotev/app-fidelidad:testing` como `b7de8ec5414c3e7144fa87bb700e9c2e6e4c00a6`, desde la fuente final `492282d83cd7812ab06a11c2da75ca7b18e1c1fd`. La revisión final agrega safe areas nativas a las correcciones del visor y las fixtures codificadas. Fetch de testing confirmó la integración; estos SHA son evidencia, nunca selectores de futuros builds.

| Componente | Runtime observado |
|---|---|
| Web testing | `b7de8ec5414c3e7144fa87bb700e9c2e6e4c00a6`, healthy, cero reinicios |
| API testing | `64bb3fc901293791adcf7738c49d3bbf290c8a20`, esquema 0042; sin cambios, healthy |
| Web / API producción | `34bbcb7` / `dbeb03c`, esquema 0035; sin cambios, healthy |

Coolify `y3xxkiz5lzdax2enbfbdzckl` terminó a las 00:49:35 UTC; imagen web `sha256:f0c4f3463f1b5fcb69ccb3c4a1c7b09569b00c1fb38f8d0a04613fdab1d932da`. Web conserva 384 MiB/0,5 CPU y sus redes. CI [39181911865](https://github.com/gonzalotev/app-fidelidad/actions/runs/39181911865) y despliegue automático [39182300366](https://github.com/gonzalotev/app-fidelidad/actions/runs/39182300366) aprobados. **Despliegue saludable y aceptación del recorrido real aprobada a las 21:52:24 Argentina (00:52:24 UTC del 19/10).**

El mapa filtra el inventario completo por marca, sucursal, dirección, localidad y provincia, sin sensibilidad a tildes/mayúsculas. PDF.js 6.4.299 local muestra una página en canvas con controles de página/zoom/texto, dentro de iframe web o WebView Android 13.15.0. Se conserva la alternativa explícita «Abrir aparte» y la renovación de firmas. No cambia backend, API, esquema 0042 ni límites de 30 MiB/1–30 páginas. [Funcionamiento y restricciones](#/flow-branch-menu-pdf).

El reporte de la tarea acredita 140 pruebas unitarias, typecheck, Doctor 18/18, auditoría, build web y export JS nativo aprobados, más **14/14 casos browser dirigidos en 32,6 s**: 12 de mapa/PDF/PWA y dos de scans codificados. El renderer inline también mostró un PDF de 30 MiB exactos. La revisión independiente validó por estructura, Poppler y PDF.js un scan CCITT Group 4 de 8.535 bytes y otro RGB de 35 MP/972.365 bytes; son pruebas del renderer, no una ampliación de los límites de validación del servidor. Con límite de imagen 16 MP este último producía una página blanca; el límite corregido de 64 MP renderizó contenido. Los seis millones de píxeles del canvas acotan la superficie dibujada.

QA real mediante login/logout de UI, sin interceptar respuestas ni inyectar estado: inventario de 37 tiendas, búsqueda `cafe tortoni - testing` con una coincidencia y Google Maps visible, sin coincidencias y limpieza del filtro. Desde la sucursal QA 29, lista → ficha → menú mostró el PDF dentro de Puntazo con la ficha cerrada. La consulta pública anónima en 390×844 y 1440×1000 verificó píxeles reales del canvas, zoom y recarga, sin desbordes y con una sola página de contexto, sin abrir pestaña externa. No hubo escrituras comerciales. El primer helper comprobó el conteo de diálogos durante la animación de cierre y falló; se corrigió para esperar a que quedara oculto, sin modificar producto. El reporte inicial se conserva y el resultado final es PASS. Evidencia: `artifacts/map-search-pdf-viewer-20261018/live-qa.json`.

La comparación de siete recursos públicos contra los del contenedor aprobó; `/pdf-viewer/` respondió SAMEORIGIN/CSP del propio origen y las demás páginas conservaron DENY. Los cortes anteriores de PWA y 30 MiB se mantienen abajo como evidencia fechada, sin extender la QA física.

La guardia Android se probó en perfil preview: falta de APP_URL y origen incompatible con API testing rechazados; origen testing correcto aceptado. No se compiló/publicó un binario nuevo en esta comprobación; los clientes instalados requieren el módulo WebView en un nuevo build. No acredita QA física Android/iOS, instalación de PWA, suite global browser ni publicación del portal. Producción queda fuera del alcance; V2 continúa futura.

## PDF de 30 MiB y apertura con PWA · 18/10/2026 21:04 Argentina (19/10/2026 00:04 UTC)

| Componente testing | Rama seleccionada | Runtime observado |
|---|---|---|
| API | gagonzalez1/app-loyalty:closed-test-readiness | `64bb3fc901293791adcf7738c49d3bbf290c8a20`, esquema 0042, healthy |
| Web | gonzalotev/app-fidelidad:testing | `067dc68c78992f9c49f197eca72b7d685ba5da9e`, healthy |
| Landing | gagonzalez1/puntazo-landing:testing | `6533196d148e9dfafa016618784a029dd0f2d87e`, healthy |

El usuario amplió el PDF a 30 MB y reportó «Esta pantalla no existe». Se reprodujo con un SW real activo: fetch de la firma entregaba PDF correcto, pero navigate recibía el shell HTML. La corrección excluye medios/API del fallback y usa Blob validado para URLs del mismo origen, compatible con SW anterior; HTTPS externo no exige CORS nuevo. El perfil conservado demostró worker anterior activated→redundant y nuevo activated; navegación HTTPS al PDF 200 application/pdf, sin HTML del SPA. Descarga de 2.267 bytes, hash, texto y render local correctos. La inspección automatizada de la página blob en IAB fue bloqueada por la política de protocolo de CUA; no se eludió. Esa observación no se acredita: la verificación segura usó HTTPS/descarga y render del archivo.

PDF válido de **31.457.280 bytes exactos** cargado desde el selector de tienda, revisado con respuesta PDF completa/hash esperado y descartado por UI, sin publicar ni retirar el menú existente. La comprobación independiente por `/api` repitió upload 201, borrador privado y descarte. Estado final versión 12, borrador null, publicación `b4220335-ba40-436c-9e8f-bfa759104ae3` intacta. Ocho negativos aprobados: 428/412, aislamiento y archivos falso/protegido/31 páginas/excedido; **30 MiB + 1 byte devuelve 413** sin cambiar estado. Apertura pública anónima con SW activo y cinco controles sin desbordes en 390×844/1440×1000; logout UI aprobado. Dos primeros intentos del helper necesitaron corregir expectativas de descarga headless y un selector ambiguo: se conservan como diagnóstico y el reporte final aprobado documenta revisión/descarte.

Archivo 30 MiB, API multipart +64 KiB y proxies 31 MiB sólo en la ruta PDF. Páginas 1–30, parser 3 s/caps, firmas 300 s y permisos se conservan. Nueva 0042 amplía el CHECK; 0041 permanece intacta. Backup cifrado fresco verificado y restaurado en aislamiento; upgrade 0041→0042 y segundo pase aprobados en copia/live, con agregados y fingerprints de menús idénticos antes/después. Rollback de aplicación conserva 0042 y `EXPECTED_SCHEMA_VERSION=0042`; no DOWN live. API 768 MiB/1 CPU, global 2/actor 2 efectivos; web 384 MiB/0,5CPU, landing 256 MiB/0,5CPU, todos saludables sin reinicios. Imágenes, montajes y redes preservados; bundle público igual al contenedor.

Backend race/vet/parser/migraciones/OpenAPI/Docker/CI aprobados. Frontend 137 unidades, typecheck, 5 PWA, build web, export AndroidJS y CI aprobados; Doctor/auditoría también verdes en CI final. La suite browser amplia se interrumpió: 9 pasaron, 3 fallaron fuera del flujo PDF, 1 interrumpida y 82 no ejecutadas, sin baseline comparativo; no se presenta como suite global aprobada. No se acredita QA física Android/iOS ni PWA instalada.

[PR39 backend](https://github.com/am-p/app-loyalty/pull/39) sigue abierta al propietario, con main oficial observado contenido (0 detrás/7 delante) y dependencias PR37/38. [PR69 frontend](https://github.com/gonzalotev/app-fidelidad/pull/69) y [PR11 landing](https://github.com/gagonzalez1/puntazo-landing/pull/11) integradas en testing. Portal documental de PR12 aún sin publicar; producción API dbeb03c/0035 y web 34bbcb7 sin cambios. V2 sólo idea futura. Enlace estable: [menú de prueba](https://testing.puntazo.pro/menu/29); la firma copiada directamente caduca a los cinco minutos.

## Corte histórico V1 PDF · 18/10/2026, 16:21 UTC

| Componente testing | Rama seleccionada | Runtime observado |
|---|---|---|
| API | gagonzalez1/app-loyalty:closed-test-readiness | `c12c94da5c62fcaf062a0094109ed47fc2dedc90`, esquema 0041, healthy |
| Web | gonzalotev/app-fidelidad:testing | `72cf2229f8f732d705a63641692aff26481d5047`, healthy |
| Landing | gagonzalez1/puntazo-landing:testing | `f22bc86ac41e07a28c203f0dc3cb0e4d4b49f32c`, healthy |

Las ramas se obtuvieron nuevamente y los checkouts de build se verificaron limpios. Estos SHA son evidencia, nunca selectores para nuevos builds. Producción conserva API `dbeb03c`/esquema `0035` y web `34bbcb7`; no se modificó. El candidato backend contiene el main oficial observado, sin commits detrás, y se propone al propietario mediante [PR39](https://github.com/am-p/app-loyalty/pull/39), con las dependencias PR37/38. Frontend [PR67](https://github.com/gonzalotev/app-fidelidad/pull/67) y [PR68](https://github.com/gonzalotev/app-fidelidad/pull/68), y landing [PR10](https://github.com/gagonzalez1/puntazo-landing/pull/10), están integradas en testing. El portal de esta rama documental aún no se publicó.

La prueba real, sin mocks ni sesión inyectada, confirmó carga con selector de archivos, borrador oculto, revisión PDF HTTP 200, publicación y persistencia tras recarga, rechazo de protegido con indicación clara, retiro y reemplazo. Cliente desde mapa y visitante sin sesión abrieron el PDF con respuesta HTTP 200 application/pdf. Siete capturas y mediciones en 390×844 y 1440×1000 no muestran desbordamiento horizontal. La fixture de menú está identificada como prueba y no acredita afiliación comercial ni domicilio. [Demostración testing](https://testing.puntazo.pro/menu/29).

La API verificó If-Match 428/412, aislamiento, PDF falso/protegido/31 páginas/excedido y conservación del estado ante rechazo. El PDF válido de 3.040.417 bytes pasó por landing y proxy como borrador privado y se descartó conservando la publicación. El PDF público coincidió por SHA256 con el original; firma de 300 s, sin caché de las respuestas API. El bundle público coincide con el contenedor. Los límites generales e imágenes se conservan; solo el POST PDF admite el margen de 11 MiB en proxies y 10 MiB + 64 KiB en la API.

Respaldo cifrado con descifrado/checksum y restore completo aislado aprobados; upgrade 0040→0041 e idempotencia dos veces, agregados de usuarios/marcas/sucursales/tarjetas/movimientos preservados. El rollback de aplicación conserva 0041 y `EXPECTED_SCHEMA_VERSION=0041`; no ejecutar DOWN en la base viva. Se preservan imágenes/configuración previas. API 768 MiB/1 CPU, web 384 MiB/0,5 CPU y landing 256 MiB/0,5 CPU, saludables sin reinicios.

Checks de backend/race/migraciones/OpenAPI/Docker y frontend 131 unitarias/typecheck/Doctor/build/browser/export JS aprobados; auditorías dentro de sus políticas existentes. Los tres casos browser de contrato usan fixtures y se distinguen de la QA real anterior. No se acredita QA física Android/iOS ni instalación de PWA. La V2 digital/IA permanece idea futura. [Recorrido y contrato](#/flow-branch-menu-pdf).


## Corte histórico del mapa · 17/10/2026, 22:04–22:12 UTC

Corrección del mapa del cliente publicada exclusivamente en testing. Los SHA siguientes son evidencia, nunca selectores de futuros builds: se debe renovar el fetch de las ramas y comprobar las fuentes limpias antes de cada publicación.

| Componente | Fuente de integración seleccionada | Runtime observado |
|---|---|---|
| API testing | `gagonzalez1/app-loyalty:closed-test-readiness` | `4640caf95d6a00fb1567d8e2eeaacd0981b324e1`, esquema `0040`, healthy |
| Web testing | `gonzalotev/app-fidelidad:testing` | `6a90482ad79166bcdea51402055c2d1a23109daf`, healthy |
| API producción | `am-p/app-loyalty:main` | `dbeb03cff69ec512cb7f59f0a92fe8c8bfd9d181`, esquema `0035`; sin cambios en esta entrega |
| Web producción | `gonzalotev/app-fidelidad:main` | `34bbcb7`; sin cambios en esta entrega |

La API testing contiene el main oficial observado de Ariel, más la corrección de dos fixtures de fecha y el mapa/favoritos. [PR37](https://github.com/am-p/app-loyalty/pull/37) y [PR38](https://github.com/am-p/app-loyalty/pull/38) continúan abiertas hacia el propietario backend. [PR66 frontend](https://github.com/gonzalotev/app-fidelidad/pull/66) está integrada en `testing`. No se promovió este trabajo a producción. `puntazo-preview` está retirado.

- Coolify API `szhzwdwrsop0sykx5ltijjkz`: finished 21:59:34 UTC. Web `onfl5ucvjykzuzpqioy5bafs`: finished 22:04:00 UTC. Las imágenes corresponden a los SHA anteriores; API 768 MiB/1 CPU y web 384 MiB/0,5 CPU, sin reinicios. Se conservaron redes privadas, alias y montajes de API.
- Versión API directa y por el proxy `/api` coincidentes. La consulta autenticada real devuelve **37 sucursales elegibles, 3 con coordenadas y 34 con ubicación pendiente** en la aceptación inicial. Una lectura agregada posterior a las 22:09 UTC confirmó 37 elegibles, 13 con coordenadas válidas y 24 pendientes; los datos se actualizaron durante la comprobación, sin modificaciones de coordenadas por esta tarea. Se comprobaron búsqueda, validación de longitud, rechazo sin sesión, favoritos idempotentes y persistencia al iniciar otra sesión. Se restauró el favorito original del usuario QA y se cerraron las sesiones de prueba.
- Pantalla publicada comprobada contra API real, sin respuestas simuladas, en navegador emulado de 390×844 y 1440×1000: carga de Google Maps, lista, búsqueda, ficha sin coordenadas y acción de mapa deshabilitada. La revalidación final de las 22:12 UTC mostró 37 sucursales, 13 marcadores y 24 ubicaciones pendientes en ambos tamaños, con una sola sesión y logout desde UI. No se atribuye QA físico Android/iOS ni PWA instalada a esta comprobación.
- Migraciones 0036–0040 idénticas a las reservadas en PR34. Se restauró el respaldo cifrado de testing en una base aislada y se verificaron subida 0035→0040 e idempotencia. Los agregados de usuarios/marcas/sucursales/tarjetas/movimientos se conservaron. El trabajo separado de turnos con otras 0036–0038 debe conciliarse antes de integrar.
- Recuperación disponible con imágenes anteriores y respaldo verificado. Un rollback de aplicación conserva esquema `0040` y `EXPECTED_SCHEMA_VERSION=0040`; no se revierte la base viva como parte de ese rollback.
- CI backend y frontend aprobados, junto con pruebas locales de integración/race, contrato OpenAPI, calidad Expo y build. V1 PDF sigue pendiente; V2 se conserva solamente como idea en [Mapa y menú](#/flow-customer-map-menu).

La documentación de esta actualización está propuesta en una rama dedicada; crear su PR no acredita publicación del portal. Los cortes anteriores mantienen su fecha y no describen el runtime actual.

## Corte histórico · 02/10/2026

Corte de consulta **22:30–22:33 UTC (19:30–19:33 Argentina)**. Fuentes seleccionadas por rama y fetched en checkouts limpios; API oficial de Coolify, imágenes/health de Docker, endpoints públicos y nombres de tablas consultados sin leer datos de usuarios. Este registro es evidencia fechada, no un pin para futuros builds.

## Fuente y runtime

| Recurso | Rama seleccionada | HEAD remoto consultado | Imagen o `/version` observado |
|---|---|---|---|
| Frontend producción | `gonzalotev/app-fidelidad:main` | `259f6c839c0c79a4999def733c45e6f08251cf35` | Mismo SHA; healthy |
| Frontend testing | `gonzalotev/app-fidelidad:testing` | `4891072bde593f2432af00e3728143784c85e227` | Mismo SHA; healthy |
| Copia frontend develop | `gonzalotev/app-fidelidad:develop` | `25314c1a9c94206bd3bfeb93fd2a840da13c1c2a` | Recurso configurado sin contenedor; implementación de esa rama no evaluada |
| API producción | `am-p/app-loyalty:main` | `76984460126eb84b717fead5dca2c3fd01f56f97` | Mismo SHA; healthy; esquema `0033` |
| API testing | `gagonzalez1/app-loyalty:testing` | `f18ff083666e70954bfe8474a228dcca365f40bb` | Mismo SHA; healthy; esquema `0033` |
| Landing producción | `gagonzalez1/puntazo-landing:main` | `88021cdf37cd5057e3d3c3b54006443fc036b315` | Mismo SHA; healthy |
| Landing testing | `gagonzalez1/puntazo-landing:testing` | `fc3bea3e8c9961cd2ea1ebbb578e6d8be4d05943` | Mismo SHA; healthy |
| Backoffice testing | `gagonzalez1/puntazo-backoffice:testing` | `00a90773ce8a27f30705e3c3e0238a8997a3e03b` | Healthy; tag `latest`, sin revisión fuente acreditada |
| Legales | `gagonzalez1/puntazo-legal:main` | `755cae52ce063e2bf1189d6ef591ee03c1380cdc` | Mismo SHA; healthy; contenido `draft`, sin revisión jurídica aprobada |
| Docs antes de esta actualización | `gagonzalez1/puntazo-docs:main` | `5ad4f62e33e4d1d84d8f645932ce45a235f683d8` | Mismo SHA; healthy |

El diff API oficial main/fork testing sólo cambia workflows: no se encontró divergencia de código del producto en ese corte. El fork de publicación no reemplaza al repositorio dueño.

El corte inicial de las 22:10 UTC mostraba las imágenes anteriores de frontend y landing testing. Durante esta revisión terminaron sus publicaciones; el corte final acredita `4891072` y `fc3bea3`, que incluyen instalación PWA asistida y guías. Main frontend y testing siguen diferenciándose en interfaz de analíticas y edición/registro: disponibilidad backend no equivale a publicación de toda UI.

También apareció una copia configurada de frontend en `puntazo/develop`, sin contenedor, que eleva el inventario a 18 recursos (12 apps, 4 bases/Redis y 2 servicios MinIO). La finalidad del ambiente adicional requiere conciliación operativa; no se infiere integración desde el nombre del clon.

## Configuración observada sin secretos

| Capacidad API | Producción | Testing |
|---|---|---|
| Esquema esperado/informado | `0033` | `0033` |
| Entorno declarado | `APP_ENV` ausente | `staging` |
| Rate limit | Variable ausente → default `memory` | `redis` |
| Medios | Variable ausente → default `disabled` | `s3` con MinIO |
| Correo | `smtp` | `smtp` |
| Mercado Pago | Variable ausente → default `disabled` | `api` |

Los defaults se resolvieron contra `internal/config/config.go` de la imagen fuente observada. El nombre del recurso de producción no activa por sí solo las validaciones de `APP_ENV=production`.

## Runtime comprobado y límites

- Producción y testing: `/v1/version` devuelve los SHA/esquemas anteriores; la ruta compatible testing `/api/v1/version` informa la misma API.
- Las dos bases presentan las mismas 41 tablas públicas, con dominios de fidelidad, identidad, referidos y administración. No se consultaron filas personales.
- API, web, landing, Docs, legales y Backoffice testing están saludables; el Compose anterior permanece detenido y Backoffice producción sin contenedor.
- PostgreSQL/Redis/MinIO de ambos ambientes no publican puertos de datos al host. Esto no prueba aislamiento estricto entre redes Docker.
- No se ejecutaron cobros, canjes, cambios de cuenta, login real, envío de correo ni entrega push en esta revisión documental. Las evidencias operativas previas mantienen su propia fecha.

## Consulta pública

- [Versión producción](https://api.puntazo.pro/v1/version) · [readiness producción](https://api.puntazo.pro/v1/health/ready).
- [Versión testing](https://api-testing.puntazo.pro/v1/version) · [readiness testing](https://api-testing.puntazo.pro/v1/health/ready).
- [Entrada producción](https://puntazo.pro/login) · [entrada testing](https://testing.puntazo.pro/login).


## Referencias de código

- [Defaults y validación](https://github.com/am-p/app-loyalty/blob/main/internal/config/config.go)
- [Rutas desplegables](https://github.com/am-p/app-loyalty/blob/main/cmd/server/router.go)
