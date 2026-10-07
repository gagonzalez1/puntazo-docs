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

## Corte intermedio de remediación · 07/10/2026

Este corte complementa, no reescribe, la observación histórica del 02/10/2026.

| Servicio | Artefacto esperado/observado | Estado comprobado |
|---|---|---|
| API testing | Integración `closed-test-readiness` `3d77120b…`; runtime reportó commit `3d77120b…`, schema `0035` | Coolify job `nbt4ijbrqaya8rbkzeedtrjl` FINISHED; ready/healthy, liveness 200; 1 CPU y 768 MiB. CAPTCHA `false`; concurrencia 2 y trusted proxy CIDRs canónicos. |
| Web testing | Fuente `0ec8cc8`, integración `3adc150`, deploy `0fc06edc0b62308ade33b535a8e784087586c019` | PR 47 merged; deployment healthy, 0,5 CPU y 384 MiB. CI `37694621541` PASS, 150 unit tests y cinco fixtures adult-gate nuevos confirmados. |
| Landing testing | PR 9 merged en testing `9d17179`; runtime aún `fc3bea3` | Primer deploy falló healthcheck porque `localhost` resolvió IPv6 en BusyBox; prueba local `wget localhost` falla y `wget 127.0.0.1` pasa. Retry Coolify `bgumk…` QUEUED; no se confirma reemplazo del runtime actual. |
| Monitor de readiness | Servicio VPS activo, tres contenedores healthy | 96 MiB / 0,1 CPU; logs JSON en journal, 15,75 MB observados; sin webhook externo. No interpretar healthchecks saludables como alertamiento externo. |

### Pruebas y límites del corte

- API testing: smoke 287 requests, 0 errores, checks 100%, lecturas p95 315,434 ms/p99 361,148 ms. Sustained 1.751 requests/5 min (5,752 RPS), 0 errores/checks 100%, p95 280,856 ms/p99 352,141 ms. El spike sigue en progreso.
- Dataset de testing contiene fixtures con tarjetas vacías y cinco fixtures nuevos adult-gate; no se modificaron entidades históricas. No equivale al dataset local de 100 marcas/10.000 clientes/10.000 tarjetas/100.000 movimientos con ledger conservado.
- EXPLAIN de 11 lecturas se guardó en `/tmp/...` y no es un artefacto durable. Máximo observado offset 9.802: 2.425 ms; 1.000 movimientos de una marca/tarjeta no tuvieron spill. No es un test de 100.000 movimientos por marca.
- Cinco mediciones de navegación fría en web dieron LCP 3.516–3.996 ms (no cumple <2,5 s); caliente 340–360 ms. CLS 0,023–0,027 cumple. EventTiming de laboratorio 40–48 ms no acredita INP de campo. Se investiga optimización SSG; SafeAreaProvider/restore gate son hipótesis, no causa confirmada.
- Soak Go 1.26 de 2 h iniciado a 22:13 UTC seguía en progreso tras 21 min observados. SSE local de 90 min empezó a las 22:29 UTC y seguía en progreso. El primer harness SSE se descartó: coincidió con tres logins (uno rate-limited) y no reintentaba recuperación de LISTEN tras 503; no es evidencia de regresión API.
- Health local ejercitó readiness 503/200 con PostgreSQL/Redis aislados y cuatro transiciones/deduplicación; suite monitor 12 tests PASS. PR 15 (`ba1109d`) para la integración del monitor sigue pendiente y no ejecutó CI por estar sus archivos fuera de los paths actuales del workflow.
- Las imágenes locales API/web/landing reportaron cero HIGH/CRITICAL en Scout. El Dockerfile de monitor aún usa Node completo con 11 HIGH en paquetes npm/zlib sin uso; se está reduciendo la imagen en fuente, sin rebuild API.

No se modificaron datos históricos ni recursos de producción. El estado del VPS de testing y las pruebas descritas no acreditan aceptación final ni capacidad de producción.
