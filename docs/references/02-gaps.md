---
id: implementation-gaps
title: Brechas entre código y spec
group: 05 · Referencias
order: 20
parent: documented-commits
level: reference
status: gap
authority: mixed
summary: Pendientes observados de publicación, configuración y reconciliación del contrato objetivo.
diagram: false
---

# Brechas y límites actuales

Revisión base de fuentes y runtime del **02/10/2026, 22:30–22:33 UTC**, con actualización de brechas de estrés al **07/10/2026**. Los SHA y las diferencias por ambiente están en [Estado observado](#/runtime-snapshot). Esta revisión describe arquitectura e integración; no certifica todos los invariantes de negocio ni ejecuta operaciones sobre cuentas reales.

La comparación inicial de agosto —sólo `users`, cuatro rutas y fidelidad mock— fue superada por el código actual. El historial de Git conserva esa revisión. Estas son las diferencias que afectan la lectura de la arquitectura hoy:

| Diferencia | Estado observado | Trabajo pendiente |
|---|---|---|
| Producción frente a testing | Esquema `0033` en ambos; producción sin `APP_ENV=production` explícito, media disabled, rate limit memory y Mercado Pago disabled según variables/defaults | Revisar configuración productiva y validar proveedores antes de atribuirle paridad funcional |
| Backoffice productivo | Recurso preparado, sin contenedor activo; API main ya registra sus rutas | Promoción y aceptación de UI, cookies, acceso y configuración; el viejo bloqueo por ausencia de rutas no describe el código actual |
| Aislamiento de red | Proyectos y datos separados; aislamiento estricto no acreditado | Conciliar redes/proxy y demostrar límites; proyecto distinto no es prueba |
| Instalación testing | Frontend actual `636bc89…`, API `3d77120b…` y landing `9d17179b…` healthy; el Compose web conserva redes/recursos y alias real `puntazo-app-testing` | Cinco muestras del `/login` público por HTTPS: LCP frío 1.320–1.504 ms y warm 12–28 ms; CLS 0,00387083249. Cumplen LCP/CLS; EventTiming lab máximo 56 ms no certifica INP. En esa misma página pública, `coldUsableMs` (desde `page.goto` hasta input editable) fue 3.901–4.676 ms y warm 361–393 ms; este hito no es LCP ni corresponde a una sesión/ruta autenticada. La regresión CLS de una variante SSR intermedia fue corregida antes de promoción. QA físico/INP campo pendientes. |
| Ambiente adicional develop | Copia de frontend configurada desde `develop`, sin contenedor activo | Conciliar su finalidad y ubicación con la convención operativa; no atribuir disponibilidad ni integración API |
| Analíticas entre UIs | Backend de períodos en ambos; UI de períodos en testing, resumen operativo en main | Promoción de frontend según alcance de producto |
| Proveedores externos | SMTP configurado; Mercado Pago testing configurado; push/Places implementados | Esta revisión no comprobó entrega de correo, evento de cobro firmado, entrega push ni publicación de reseña |
| Contrato objetivo | `openapi.yaml`, spec y `PC-xx` conservan propuestas históricas | Reconciliación ruta/regla por ruta/regla con la implementación; similitud no acredita aprobación |
| Vinculación Google y baja sensible | Contrato explícito implementado e integrado en candidato backend: link con contraseña + ID token, reauth con contraseña o mismo `sub`; conflictos `409`, sin autolink por email | API runtime `3d77120b…` healthy/readiness schema0035; frontend `636bc89…` desplegado. Dos cuentas sintéticas nuevas anonimizadas (fixtures 4 y 5), sin cambios a cuentas históricas ni escrituras SQL. Fixture 4: SQL read-only confirma cuenta inactiva, 4 sesiones totales/0 no revocadas, credenciales password/Google/QR limpias, journal 1/cards 0/operator attribution 0; no hubo GET postdelete. Fixture 5 separada: login 200, DELETE recent-auth 202, `ledger_preserved=false` esperado por overlay `0035`, acceso revocado; GET bearer y refresh postdelete 401, cleanup logout 204. CAPTCHA apagado por falta de widget Turnstile; sin alcance de recuperación/reclamación histórica |
| Sesión, SSE y alertas | Browser postdeploy real PASS: 2 pestañas refresh exitoso, máx 1 concurrente; logout offline, reload no restaura, 0 refresh tras marker, reconnect limpia cola, tokens capturados postlogout 401. SSE proxy público PASS: primer heartbeat 20,065 s; logout 204, cierre 18,807 s, bearer 401. Fix de wait/listener monitor source `e58f648…`, PR31 CI `37703238898` PASS; PR16 testing merged en build `34099e4…`; 16 tests Node22/26, 2.000 ciclos sin listeners retenidos; imagen VPS `sha256:2e421f1…` healthy, 96 MiB/0,1 CPU, hardening read-only/UID65534/cap drop ALL, sin ports/secrets. API no restart; tres probes ready/version 200. Soak local 2 h y SSE local/testing 90 min terminaron PASS: 705 heartbeats, 18 refreshes y 0 errores por ambiente; 3 workers cerraron con logout 204 y bearer revocado 401. | Campañas automatizadas aceptadas en estos límites; receiver externo y prueba real de entrega siguen pendientes. El timeout frío produjo `startup_failure` seguido de recovery transitorio, sin notificación externa. |
| Estrés y ledger | Smoke/sustained/spike testing PASS (287/1.751/319 requests, 0 errores, 100% checks); cuota compartida cross-route PASS con spoof headers (10×401, direct 11.ª 429/Retry-After 583, web 12.ª 429/Retry-After 581, sin reset). Snapshot SQL read-only posterior al soak `artifacts/stress-remediation-20261007/local-final-ledger-after-soak-readonly.json`: 100 marcas, 10.100 usuarios, 10.000 tarjetas, 100.000 movimientos, invariantes sin brechas, sin mutaciones y 0 familias activas locales. Soak k6 local 2 h: 84.671 requests, 0 errores, 105.828/105.828 checks, lecturas p95 6,656 ms/p99 8,499 ms; testing smoke/sustained/spike también PASS. | Campañas automatizadas cerradas con estos perfiles, no equivalen a capacidad máxima/producción. Mantener separado el dataset local del testing y no extrapolar. LCP/CLS públicos pasan en cinco muestras; `coldUsableMs` (page.goto hasta input editable en la misma página pública `/login`) es distinto de LCP. Mantener límites de dataset y no extrapolar capacidad. |
| Legales | Sitio publicado y saludable | Mantener estado de revisión jurídica del contenido |

La auditoría anterior de testing registró un pendiente de dependencias; esta revisión documental no repitió esa auditoría ni lo declara resuelto. Los respaldos y la restauración de producción se documentaron en el registro operativo privado: este portal no certifica una nueva restauración.


## Referencias de código

- [Defaults y validación de entorno](https://github.com/am-p/app-loyalty/blob/main/internal/config/config.go)
- [Router Backoffice](https://github.com/am-p/app-loyalty/blob/main/cmd/server/router.go)
- [UI por períodos en testing](https://github.com/gonzalotev/app-fidelidad/blob/testing/app/(tabs)/analytics/index.tsx)
