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

# Estado observado · 02/10/2026

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

- Producción y testing: `/api/v1/version` devuelve los SHA/esquemas anteriores; la ruta compatible testing `/api/v1/version` informa la misma API.
- Las dos bases presentan las mismas 41 tablas públicas, con dominios de fidelidad, identidad, referidos y administración. No se consultaron filas personales.
- API, web, landing, Docs, legales y Backoffice testing están saludables; el Compose anterior permanece detenido y Backoffice producción sin contenedor.
- PostgreSQL/Redis/MinIO de ambos ambientes no publican puertos de datos al host. Esto no prueba aislamiento estricto entre redes Docker.
- No se ejecutaron cobros, canjes, cambios de cuenta, login real, envío de correo ni entrega push en esta revisión documental. Las evidencias operativas previas mantienen su propia fecha.

## Consulta pública

- [Versión producción](https://api.puntazo.pro/api/v1/version) · [readiness producción](https://api.puntazo.pro/api/v1/health/ready).
- [Versión testing](https://api-testing.puntazo.pro/api/v1/version) · [readiness testing](https://api-testing.puntazo.pro/api/v1/health/ready).
- [Entrada producción](https://puntazo.pro/login) · [entrada testing](https://testing.puntazo.pro/login).


## Referencias de código

- [Defaults y validación](https://github.com/am-p/app-loyalty/blob/main/internal/config/config.go)
- [Rutas desplegables](https://github.com/am-p/app-loyalty/blob/main/cmd/server/router.go)

## Corte intermedio de remediación · 07/10/2026

Este corte complementa, no reescribe, la observación histórica del 02/10/2026.

| Servicio | Artefacto esperado/observado | Estado comprobado |
|---|---|---|
| API testing | Integración `closed-test-readiness` `3d77120b…`; runtime reportó commit `3d77120b…`, schema `0035` | Coolify job `nbt4ijbrqaya8rbkzeedtrjl` FINISHED; ready/healthy, liveness 200; 1 CPU y 768 MiB. CAPTCHA `false`; concurrencia 2 y trusted proxy CIDRs canónicos. |
| Web testing al corte 07/10 | PR48 producto integración `50e6f76b…`; runtime previo `636bc89…` | Capturas LCP/CLS del `/login` de este release son históricas y no describen el build nuevo. |
| Landing testing | PR 9 merged; runtime tag `9d17179b38bace95d2e3a8fa97d5307dc92675eb` | Retry `bgumk2rrvmcgqeieo72e2rxq` FINISHED 22:32 UTC, healthy, 0,5 CPU/256 MiB. Healthcheck corregido a `127.0.0.1` tras resolver `localhost` a IPv6 en BusyBox. |
| Monitor de readiness · actualización 07/10 | Fix oficial `e58f64851a191e3f0a0f4a318d279716bd47b51f`; build de testing `34099e42d17c1fe50da22d60964b32fd57627407`; imagen `sha256:2e421f1ee4ae94bec41b67bae93c711f349e5eda98aadecc40dc7cbc05eb94bf` | Container `27e3232f3ae7` healthy, restart 0, 96 MiB/0,1 CPU, root read-only, UID 65534, caps ALL dropped, sin puertos/secrets. Tres probes readiness/version 200 (API `3d77120`, schema0035); sólo reinició el monitor, API/DB no reiniciaron. Digest `365dc3e…` queda supersedido. |

### Pruebas y límites del corte del 07/10/2026

Los cinco resultados históricos que siguen listados a continuación pertenecen al corte anterior (`636bc89…`) y no describen el frontend actual `21cf358e…`.

- API testing: smoke 287 requests, 0 errores/checks 100%, lecturas p95 315,434 ms/p99 361,148 ms; sustained 1.751 requests/5 min, p95 280,856/p99 352,141 ms; spike 319 requests, p95 260,379/p99 298,087 ms. Los tres escenarios terminaron con 0 errores y 100% checks.
- Dataset de testing contiene fixtures con tarjetas vacías y cinco fixtures nuevos adult-gate; no se modificaron entidades históricas. No equivale al dataset local de 100 marcas/10.000 clientes/10.000 tarjetas/100.000 movimientos con ledger conservado.
- Evidencia de campaña añadida 07/10/2026: EXPLAIN de 11 lecturas en `artifacts/stress-remediation-20261007/puntazo-final-readonly-query-plans.json`. Sobre `puntazo_load`: 100 marcas, 100.000 movimientos, 10.000 tarjetas; marca seleccionada con 1.000 movimientos y 10 por tarjeta. Máximo observado offset 980: 2,425 ms; no hubo spill. No es un test de 100.000 movimientos por marca.
- Cinco mediciones frías web dieron LCP 3.516–3.996 ms (no cumple <2,5 s); caliente 340–360 ms. CLS 0,023–0,027 pasa en el build desplegado. Una variante de optimización detectó regresión CLS y no fue promovida. EventTiming 40–48 ms no es INP de campo.
- En aquel corte, el soak Go de 2 h y los soaks SSE estaban en progreso; sus resultados finales están en la actualización del 08/10/2026 al final de este registro. SSE proxy público PASS por 19,953 s con heartbeat, `no-store/private`, HSTS simple y logout 204/revocación 401; browser dos pestañas y logout offline PASS sin refresh posterior al marker. El primer harness SSE se descartó: coincidió con tres logins (uno rate-limited) y no reintentaba recuperación de LISTEN tras 503; no es evidencia de regresión API.
- La prueba previa con readiness 503/200, 12 tests y PR15 (`9a52e8` → `00f6b31`) corresponde al monitor intermedio y queda como historial. El fix de leak de abort listeners está en owner source `e58f64851a191e3f0a0f4a318d279716bd47b51f` (PR31, CI `37703238898` PASS); PR testing #16 merged a build `34099e42d17c1fe50da22d60964b32fd57627407`. 16 tests pasan en Node22/26; antes 25 waits secuenciales dejaban 25 listeners, después 2.000 ciclos dejan 0 listeners y heap baja 2.312 bytes. API inputs son equivalentes a runtime `3d77120b…`; el delta sólo incluye scripts/README/Dockerfiles, sin redeploy API.
- Imagen final del monitor: `sha256:2e421f1ee4ae94bec41b67bae93c711f349e5eda98aadecc40dc7cbc05eb94bf`, Node22.23.3/Alpine3.24.2, 25 paquetes, Scout 0 HIGH/CRITICAL. En el VPS, tras el reemplazo, hubo tres probes consecutivos healthy/version/readiness 200; el API container conservó restart 0 y siguió healthy. El startup frío emitió `startup_failure` y luego `recovery` por el timeout de 3 s; transición temporal observada, no hubo notificaciones externas configuradas. Receiver externo pendiente. Evidencia completa en `artifacts/stress-remediation-20261007/puntazo-monitor-wait-fix-verification.json` y artefactos asociados.

La verificación de reauth/baja observó sesión antigua 401 `RECENT_AUTH_REQUIRED`, reauth 200, token previo 401 y delete 202 con `access_revoked=true`, `ledger_preserved=false`, resultado esperado por overlay privacy testing `0035` (borra historial/tarjetas propias, conserva ledger ajeno y anonimiza operador; fuente legacy difiere). SQL read-only confirmó el fixture 4 (una cuenta sintética) inactiva, password/Google/QR limpiados y `auth_version>1`; cuatro sesiones totales y cero no revocadas (dos de login/reauth), journal 1, cards 0 y operator attribution 0. No se hizo GET bearer tras delete; revocación confirmada por SQL y middleware. Evidencias: `artifacts/testing-sensitive-action-acceptance.json` y `artifacts/recent-auth-fixture4-readonly.jsonl`. Evidencias reproducibles: `artifacts/stress-remediation-20261007`.

No se modificaron datos históricos ni recursos de producción. El estado del VPS de testing y las pruebas descritas no acreditan aceptación final ni capacidad de producción.


## Corte final de campañas de estrés · 08/10/2026 00:14–00:15 UTC

API testing `3d77120b…` (schema `0035`), web `636bc89…`, landing `9d17179b…`, PostgreSQL, Redis, MinIO y monitor estaban running/healthy con restart 0 (`artifacts/stress-remediation-20261007/testing-final-runtime-health.json`); no se promovió producción. Los probes externos documentados son `/api/v1/health/ready` y `/api/v1/version`.

- **Soak local k6, 2 h:** `artifacts/stress-remediation-20261007/puntazo-local-soak-2h-final.json`, exit 0; 84.671 HTTP requests, 11,758 req/s, 21.198 iteraciones, 105.828 checks PASS/0 FAIL, `api_error_rate=0`, `http_failed=0`, lecturas p95 6,656 ms/p99 8,499 ms, workflow p95 20 ms, tres logouts; gate de resumen PASS.
- **SSE 90 min:** local 5.419,44 s y testing 5.422,73 s; en cada ambiente 3 workers × 235 heartbeats = 705, 18 refreshes, cero errores, logout 204 y bearer revocado 401 al cierre por worker. Evidencias de campaña se conservaron como `/tmp/puntazo-local-sse-soak.json` y `/tmp/puntazo-testing-sse-soak.json` en la máquina ejecutora.
- **Ledger y sesiones:** `artifacts/stress-remediation-20261007/local-final-ledger-after-soak-readonly.json` a 00:13:40 UTC confirma 100 marcas, 10.100 usuarios, 10.000 tarjetas, 100.000 movimientos, invariantes sin brechas y cero mutaciones/familias activas locales. `fixture-session-final-readonly.json` confirma cero sesiones/familias activas para los tres fixtures por ambiente. Las 158 familias históricas globales de testing se preservaron; no hubo limpieza histórica.
- **Capacidad observada:** `artifacts/stress-remediation-20261007/soak-memory-capacity-summary.json`: local 120 muestras/121,07 min, RSS 17,188–29,375 MiB, último cuartil 22,898 MiB frente a 23,398 MiB en el primero; testing 70 muestras/76,21 min, RSS Docker API 9,461–17,82 MiB, último cuartil 17,73 MiB, cero muestras unhealthy y cero errores del muestreador. No comparar entornos como equivalentes: runtime, dataset y límites difieren. El monitor tuvo exposición aparte de 28,74 min, no certificación de dos horas.
- **Estado inmediato testing** (`testing-post-campaign-capacity-current-date.json`, 00:13:51 UTC): API healthy/restart 0, `sse_active=0`, `sse_ready=true`, errores Redis 0 y fallos de escritura SSE 0. `bcrypt_rejected=1` es acumulado de un harness descartado; `db_canceled=2` ocurrió en una ventana de navegador y no tiene atribución confirmada, no se presenta como error de estas campañas.

Las campañas automatizadas de fase 7 finalizaron PASS dentro de las cargas, identidades y recursos medidos; no certifican capacidad máxima ni sizing de producción. Integración/código de autenticación Google desplegados no significan aceptación con proveedor e identidades reales; esa prueba sigue pendiente. También siguen pendientes INP de campo/QA nativa física, receptor externo de alertas y activación Siteverify, que permanece apagada al no existir widget Turnstile.


### Incidencia visual interna y verificación de corrección · 08/10/2026

En el runtime web `636bc89…`, la pantalla interna perfil/clientes mostró un layout defectuoso. La inspección del CSS computado confirma que la hoja SSR estática `puntazo-styled-native-ssr` (`.css-g5y9jx`) resetea `body` a `padding: 0` y `min-height: 0` después de las reglas atómicas React Native Web (espaciado 10/12 px y `min-height: 72px`), colapsando el alto calculado y dejando filas de 50 px. Captura previa al fix: `artifacts/stress-remediation-20261007/profile-padding-before.jpg`.

La causa se atribuye al styling/SSR del frontend, no a backend. La corrección está en frontend fuente `b32991d` (CI `37708837022`, 165 pruebas + TypeScript PASS), PR49 merged e integrada en `closed-test-readiness` HEAD `21cf358e247c059267c26c6f3274a85e8cc23b2a` (CI `37709439037`, `37709749226` PASS). Docker local imagen `0807ee…` y export `4175` limpio de SW previo PASS, con overlays PWA/adult guard y fixture `adult_confirmed=true`. Coolify web-only deploy `ugd0t81xkzuvvtowmcflnjo5` finalizó el 08/10/2026 00:55:52 UTC; web `21cf358e…` healthy/restart 0, 384 MiB/0,5 CPU, redes privadas conservadas, sin puertos publicados; API `3d77120b…` sin cambio, healthy/restart 0.

La verificación pública de `/profile` (General/Diseño) y `/customers` PASS en 390×844 y 1280×720: filas de 72 px, `min-height:72px`, padding 10×12 px, sin overflow ni supplemental SSR y Space Grotesk CSS registrado. Evidencia: `artifacts/stress-remediation-20261007/profile-design-fixed-testing-mobile.jpg`, `internal-styles-fixed-testing-mobile.json`, `internal-styles-fixed-integrated-desktop.json`. El bundle público reportó `entry-6ef61efa36e56eec22ace7402b04d5f9`; export local limpio había usado `entry-291e58039bf40bb98789ff8e70431e38`. Se cierra el gate de esta regresión visual.

El LCP/CLS de cinco muestras y `coldUsableMs` conservan validez histórica para `/login` público del runtime anterior `636bc89…`; no se re-midió LCP en el nuevo release `21cf358e…`. Por tanto fase 4 sigue abierta para LCP de `21cf358e…`, INP de campo y QA física nativa. Este resultado no declara aceptadas visualmente todas las pantallas ni el rendimiento nativo.
