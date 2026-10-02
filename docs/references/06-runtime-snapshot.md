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

Corte de consulta **22:10 UTC (19:10 Argentina)**. Fuentes seleccionadas por rama y fetched en checkouts limpios; API oficial de Coolify, imágenes/health de Docker, endpoints públicos y nombres de tablas consultados sin leer datos de usuarios. Este registro es evidencia fechada, no un pin para futuros builds.

## Fuente y runtime

| Recurso | Rama seleccionada | HEAD remoto consultado | Imagen o `/version` observado |
|---|---|---|---|
| Frontend producción | `gonzalotev/app-fidelidad:main` | `259f6c839c0c79a4999def733c45e6f08251cf35` | Mismo SHA; healthy |
| Frontend testing | `gonzalotev/app-fidelidad:testing` | `4891072bde593f2432af00e3728143784c85e227` | `af1ca5e0e7d399cde2db33cde0700db477aa04e8`; healthy |
| API producción | `am-p/app-loyalty:main` | `76984460126eb84b717fead5dca2c3fd01f56f97` | Mismo SHA; healthy; esquema `0033` |
| API testing | `gagonzalez1/app-loyalty:testing` | `f18ff083666e70954bfe8474a228dcca365f40bb` | Mismo SHA; healthy; esquema `0033` |
| Landing producción | `gagonzalez1/puntazo-landing:main` | `88021cdf37cd5057e3d3c3b54006443fc036b315` | Mismo SHA; healthy |
| Landing testing | `gagonzalez1/puntazo-landing:testing` | `fc3bea3e8c9961cd2ea1ebbb578e6d8be4d05943` | `789717bf6e30519204b299af568b2e55d7feaeaa`; healthy |
| Backoffice testing | `gagonzalez1/puntazo-backoffice:testing` | `00a90773ce8a27f30705e3c3e0238a8997a3e03b` | Healthy; tag `latest`, sin revisión fuente acreditada |
| Legales | `gagonzalez1/puntazo-legal:main` | `755cae52ce063e2bf1189d6ef591ee03c1380cdc` | Mismo SHA; healthy; contenido `draft`, sin revisión jurídica aprobada |
| Docs antes de esta actualización | `gagonzalez1/puntazo-docs:main` | `43ac4cdfca57b27f2bebe70a1cdcb18cd6bfcf18` | Mismo SHA; healthy |

El diff API oficial main/fork testing sólo cambia workflows: no se encontró divergencia de código del producto en ese corte. El fork de publicación no reemplaza al repositorio dueño.

La diferencia frontend testing agrega instalación PWA asistida; la diferencia landing testing agrega las guías de instalación. No estaban en las imágenes observadas. Main frontend y testing también difieren en interfaz de analíticas y edición/registro: disponibilidad backend no equivale a publicación de toda UI.

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
