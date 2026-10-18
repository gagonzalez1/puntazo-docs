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

## Menú PDF V1 · corte 18/10/2026, 16:21 UTC

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
