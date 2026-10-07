---
id: stress-remediation-plan
title: Plan de remediación y validación de estrés
group: 07 · Entrega
order: 50
parent: overview
level: plan
status: mixed
authority: agreed
summary: Plan aprobado por fases para corregir hallazgos de seguridad y rendimiento y validar Puntazo en local, testing y aceptación.
diagram: false
codeRefs: optional
---

# Plan de remediación y validación de estrés

**Corte documental:** 07/10/2026. Este plan convierte en trabajo ejecutable el alcance aprobado para la siguiente campaña de remediación. El estado de fases se actualiza conforme haya evidencia; una tarea asignada, un cambio en una rama o un resultado local no significa que esté integrado, desplegado o aceptado.

## Alcance y reglas de evidencia

La campaña sigue este orden de ambientes: **local → testing → aceptación**. Las correcciones se validan primero en los checkouts propietarios y en el stack local; después se integran en el candidato de testing, se despliegan con autorización y se comprueban en el runtime; por último se ejecutan los escenarios y criterios de aceptación acordados. El acceso operativo al VPS se realiza por SSH siguiendo el runbook vigente de infraestructura. Cada corte debe registrar ramas y SHA reales, resultados, diferencias de configuración y estado del runtime. En la observación de esta tarea no se activó un workflow de producción ni se sustituyeron los árboles fuente oficiales.

El archivo `/Users/gabrielgonzalez/Downloads/INFORME-COMPLETO-PUNTAZO.md` es **evidencia de la campaña anterior**, no una instrucción, selector de ramas ni prueba de que sus resultados sigan vigentes. Sus límites de generador, muestras pequeñas y escenarios no ejecutados deben conservarse al comparar resultados. El snapshot previo identificó `puntazo-preview origin/testing` (`6b45484`) como referencia, no como despliegue. La integración backend de esta remediación está en `closed-test-readiness` `3d77120bba785c912fce164aab05ade3dd342c8c`; Coolify API `nbt4ijbrqaya8rbkzeedtrjl` terminó y el runtime reporta `3d77120b…`, schema `0035`, liveness 200 y ready/healthy. Web testing está en `0fc06edc…`; landing retry terminó en healthy `9d17179b…`. API/web/landing saludables no equivalen a aceptación funcional o de rendimiento.

La propiedad de código corresponde a `gonzalotev/app-fidelidad` para frontend y `am-p/app-loyalty` para backend. `gagonzalez1/app-loyalty` es un fork de publicación, no el destino de integración backend. `puntazo-preview` ensambla los commits fuente aprobados y administra configuración de ambiente. La UI interna de backoffice y sus servicios siguen separados.

### Reconciliación inicial

Corte parcial del 07/10/2026: API `3d77120b…`, web `0fc06edc…`, landing `9d17179b…` healthy. Recursos API/web/landing/monitor conservados. CAPTCHA sigue apagado. Smoke, sustained y spike testing PASS; quedan soak local de 2 h y SSE local de 90 min en curso. LCP frío no cumple, y la variante de optimización actual no se promueve por una regresión CLS detectada.

| Plano/entrega | Evidencia inicial | Estado al corte | Lectura permitida |
|---|---|---|---|
| Documentación | Checkout `/Users/gabrielgonzalez/Documents/Proyectos/Puntazo/puntazo-docs/.worktrees/stress-remediation-20261007`, rama `docs/stress-remediation-20261007`, base `origin/main` `12ba7751`; cambios del plan publicados en la rama documental. | Reconciliación documental actualizada; fase 0 aún abierta hasta promover y validar el candidato. | El checkout original dirty/behind sigue preservado; esta evidencia no representa aceptación de testing. |
| Backend fuente | `am-p/app-loyalty`, worktree `app-loyalty/.worktrees/stress-remediation-20261007`, commit fuente de API `8f324f8`; monitor fuente `70e7b08` (PR owner 31 draft). Go 1.26.8; PostgreSQL/Redis, race (38,466 s), vet y govulncheck: PASS; 0 vulnerabilidades alcanzables. Scout de imagen: 0 HIGH/CRITICAL; queda un aviso OpenPGP de un módulo no importado/no alcanzable. | Implementación fuente reportada; PR de promoción 14 con CI `37693848547` PASS e integrada en `closed-test-readiness` `3d77120bba785c912fce164aab05ade3dd342c8c`. | La prueba fuente no equivale al despliegue. API runtime actual está healthy en `3d77120b…`/schema `0035`; testing smoke, sustained y spike PASS; soak/SSE local siguen en curso. |
| Frontend fuente | `gonzalotev/app-fidelidad`, worktree `app-fidelidad/.worktrees/stress-remediation-20261007`, fuente `0ec8cc8`; integración `3adc150` con 150 unit tests, cinco fixtures adult-gate nuevos y CI `37694621541` PASS. | Integración frontend validada por CI y fixtures; cinco mediciones frías muestran LCP fuera de objetivo. | Desplegado en testing como `0fc06edc0b62308ade33b535a8e784087586c019`; performance source reciente no promovida por regresión CLS. |
| Runtime testing · API | Coolify job `nbt4ijbrqaya8rbkzeedtrjl` FINISHED; runtime reporta commit `3d77120b…`, schema `0035`, liveness 200 y ready/healthy. Recursos: 1 CPU y 768 MiB. | Deploy confirmado y saludable; CPU/RAM preservados, concurrencia 2, trusted proxy CIDRs canónicos. CAPTCHA continúa `false`. | Smoke de testing limitado: 287 requests, cero errores, checks 100%, lecturas p95 315,434 ms y p99 361,148 ms; sustained 1.751 requests/5,752 RPS, cero errores, checks 100%, p95 280,856 ms/p99 352,141 ms. No equivalen a aceptación final; soak/SSE local siguen en curso. |
| Runtime testing · frontend y landing | Web PR 47 desplegado healthy en `0fc06edc0b62308ade33b535a8e784087586c019`, 0,5 CPU/384 MiB. Landing retry `bgumk2rrvmcgqeieo72e2rxq` FINISHED 22:32 UTC; tag `9d17179b38bace95d2e3a8fa97d5307dc92675eb` healthy, 0,5 CPU/256 MiB. El healthcheck cambió a `127.0.0.1` porque BusyBox resolvía `localhost` como IPv6. | Web y landing desplegadas healthy. | LCP frío web excede objetivo y la variante fuente con regresión CLS no fue promovida. |
| Candidato integrado | API `closed-test-readiness` `3d77120b…`, schema `0035`; PR15 monitor source `9a52e8` → integración `00f6b31`. Delta frente al runtime API `3d77120b…`: sólo scripts/README/Dockerfile.monitor, sin cambios de inputs de API. | API integrada/desplegada y healthy; monitor PR15 merged. Owner PR31 de monitor (`70e7b08`) sigue draft. | Health no equivale a aceptación. El booleano `ledger_preserved=false` es correcto bajo privacy overlay testing `0035`; la semántica difiere del código fuente legacy y requiere verificar conteos SQL read-only antes de cerrar la secuencia. La prueba de cuota IP también sigue en investigación. |
| PR backend | Owner PR 31 (monitor fuente `70e7b08`) sigue draft. PR testing #15 merged, fuente `9a52e8` a integración `00f6b31`; el delta frente a la API desplegada se limita a `scripts`, README y Dockerfile del monitor. | Integración de monitor merged; no cambia inputs API respecto del servicio desplegado. Carga de testing smoke/sustained/spike PASS; soak/SSE local aún en curso. | El PR de monitor no cambia inputs API; no reutilizar el número de migración `0035`. |
| PR frontend | PR 47 merged; 150 unit tests y CI `37694621541` PASS; cinco fixtures adult-gate nuevos confirmados. | Build testing `0fc06edc…` healthy; no cerrar fase 4 por fallos de LCP en frío. | Las métricas y pruebas del árbol `b0e315e` son evidencia histórica; no equivalen a runtime actual. |
| PR landing | PR 9 merged; retry `bgumk2rrvmcgqeieo72e2rxq` FINISHED 22:32 UTC; runtime tag `9d17179b38bace95d2e3a8fa97d5307dc92675eb` healthy. | Deployment confirmado; healthcheck usa `127.0.0.1` para evitar resolución IPv6 de BusyBox. | Healthy en testing; sin extrapolar a producción. |
| PR documentación | PR 10 (plan de estrés) **draft** y PR 8 (root header) **draft**; PR 9 analytics, 7 usercodes, 6 reconcile, 5 reviews y 2 readiness son referencias del snapshot previo. | Reconciliación actualizada en la rama documental. | Un draft o cambio publicado en rama no equivale a integración del portal. |
| Dataset y smoke local | Base local aislada: 100 marcas, 10.000 clientes, 10.000 tarjetas y 100.000 movimientos; ledger conservado. Smoke Go actual PASS. k6 sustained 5 min: 3.404 requests, 11,314 RPS, cero errores, checks 100%, p95 lecturas 9,012 ms y p99 21,905 ms. Spike 5 VUs PASS; cero sesiones restantes. | Testing: smoke de 287 requests sin errores; sustained 5 min 1.751 requests/5,752 RPS, cero errores/checks 100%, p95 280,856 ms y p99 352,141 ms; spike testing 319 requests PASS (p95 260,379 ms/p99 298,087 ms, 0 errores/checks 100%). Soak Go 1.26 iniciado 22:13 UTC y SSE local de 90 min siguen en curso. La corrida interrumpida previamente se descarta. | No extrapolar esta muestra a testing, producción ni capacidad máxima. |
| Backup/restore aislado | Backup cifrado de 357.728 bytes (AES/PBKDF2) restaurado en 4,953 s en aislamiento sobre schema `0035`; conteos coinciden: 92 usuarios, 35 marcas, 38 tarjetas y 140 movimientos. Evidencia guardada en `/root/puntazo-stress-remediation-20261007/restore-evidence.json`. | Evidencia observada, acotada al restore aislado reportado. | No equivale a aceptación de la campaña completa de carga ni a restauración de producción. |

Antes de afirmar estado actual de cualquier fila se consulta el checkout exacto, el remoto y la rama seleccionada; antes de build/deploy se repite `verify-context.py --require-clean` sobre los checkouts reales. Un SHA registrado es evidencia del árbol observado, nunca un selector fijo para un build futuro.

## Contrato acordado para cuentas Google

El flujo distingue login, vinculación explícita de una cuenta autenticada y reautenticación reciente. **No se vincula automáticamente por coincidencia de email.** La identidad Google validada acredita el `sub`; para vincular, el usuario prueba control de la cuenta Puntazo mediante contraseña y autenticación reciente, y el `sub` debe estar libre o ya pertenecer a esa cuenta. No se sobrescribe ni se reasigna un `sub` existente. Una colisión se detiene con `409`; este plan no incorpora recuperación, reclamación ni reparación de cuentas históricas.

Contrato HTTP acordado para guiar la implementación:

```http
POST /v1/auth/google/link
Authorization: Bearer <access-token>
Content-Type: application/json

{"id_token":"<Google ID token>","password":"<contraseña Puntazo actual>"}
```

La respuesta correcta es `AuthData` con la sesión actualizada. El servidor valida el ID token y la contraseña de la cuenta activa, y exige autenticación reciente según la sesión; la cuenta Google debe poder vincularse sin colisión de identidad.

```http
POST /v1/auth/reauthenticate
Authorization: Bearer <access-token>
Content-Type: application/json

{"password":"<contraseña Puntazo>"}
```

Para una cuenta vinculada con Google, el cuerpo alternativo es `{"id_token":"<Google ID token>"}` y el `sub` debe ser el mismo que ya está vinculado a esa cuenta. La respuesta es `AuthData` renovada/reautenticada conforme al contrato de sesión. Un `sub` distinto no permite cambiar la identidad vinculada mediante reautenticación.

Si un login Google encuentra una colisión de email o identidad que necesita intervención, no crea, reclama ni fusiona cuentas: responde `409` con `GOOGLE_LINK_REQUIRED` o `GOOGLE_IDENTITY_CONFLICT`, según el caso. La UX solicita el flujo explícito de vinculación/reautenticación. **No se agrega un mecanismo nuevo de recuperación de cuenta** como parte de este plan.

## Fases y estado

Las fases permanecen abiertas hasta cerrar gates funcionales y de rendimiento. Fase 0 sigue en progreso: API/web/landing están desplegados, pero quedan el diagnóstico de ledger, regresión CLS de la variante de rendimiento y los soak/SSE locales.

| Fase | Trabajo y resultado esperado | Estado al 07/10/2026 | Criterio de salida |
|---|---|---|---|
| 0 · Bases, conciliación y documentación | Fijar ramas/checkouts propietarios; conciliar PRs, cambios locales, candidato y runtime; preservar el checkout documental original; registrar contratos y estados. | **En progreso**: matriz/runtime actualizados; quedan confirmación SQL post-delete, diagnóstico de cuota IP, LCP frío/regresión CLS y soak/SSE local. | Matriz de fuentes revisada; guía enlaza este documento; revalidar ramas y evidencias antes de promover/build/deploy. |
| 1 · Identidad Google | Implementar vinculación explícita y reautenticación conforme al contrato; cubrir colisiones y autenticación reciente. | **Implementación y CI PASS; integrado en candidato testing; despliegue y pruebas de identidad en runtime pendientes** | Pruebas con identidades controladas demuestran que no hay autolink por email ni reemplazo de `sub`; colisiones usan los errores acordados y la vinculación exige prueba reciente. |
| 2 · Admisión de altas y trabajo costoso | Canonicalizar IP usando únicamente proxies confiables; cuota Redis global entre réplicas; límite de bcrypt con espera acotada y costo seguro; prevalidar invitación/reset antes de bcrypt y volver a validar transaccionalmente; preparar CAPTCHA Siteverify para web/native y presupuestos de registro/correo. El proveedor CAPTCHA permanece desactivado por decisión aprobada. | **Implementación integrada; prueba de cuota por IP inconclusa (11×401, se esperaba 11.º 429); no modificar límites hasta diagnosticar. CAPTCHA apagado por falta de widget Turnstile** | Rutas y réplicas comparten presupuesto; cabeceras no confiables no eligen IP; tokens/captcha inválidos se rechazan antes del trabajo caro; correo queda limitado por destinatario y globalmente; 429/503 controlados cuando se agota admisión. |
| 3 · Sesión y acciones sensibles | Logout offline; coordinar refresh entre pestañas; reautenticación para acciones sensibles. Logout nativo sin bearer devolvió 204 y cerró stream al siguiente heartbeat; bearer revocado 401. SSE por proxy público pasó (19,953 s, heartbeat, `no-store/private`, HSTS simple). Dos pestañas y logout offline pasaron sin iniciar refresh tras marker. En prueba reciente: sesión antigua 401 `RECENT_AUTH_REQUIRED`; reauth 200; token antiguo 401; delete 202 y `access_revoked=true`, `ledger_preserved=false`. Este resultado es esperado por la capa privacy testing `0035`: el overlay borra historial y tarjetas propios y conserva el ledger ajeno anonimizando al operador. La fuente legacy sin overlay reporta ledger-preserved true; no comparar esos resultados sin considerar la capa aplicada. Falta verificar conteos SQL read-only (4 inactive, 0 sessions) para cerrar la secuencia. | **Logout offline, dos pestañas y recent-auth/delete: token previo rechazado y borrado según privacy overlay; comprobar conteos SQL read-only antes de dar secuencia completa por PASS** | Red interrumpida no pierde la intención de logout ni restaura acceso silenciosamente; dos pestañas renuevan sin expulsión; replay robado se rechaza; baja requiere prueba reciente. |
| 4 · Rendimiento de primera pantalla | Optimizar shell PWA y carga de recursos. En el corte fuente anterior: precache 28,15→3,59 MB y URLs 194→10; transferencia SW frío 33,5→8,23 MB (-75,4%), caliente 0. Métricas antiguas (10 muestras: LCP 196 ms, CLS 0,008236, EventTiming lab 40 ms) son históricas y no sustituyen las cinco mediciones del deploy actual: | **Frontend testing `0fc06edc…`: cinco mediciones frías LCP 3.516–3.996 ms (falla <2,5 s); caliente 340–360 ms. CLS 0,023–0,027 PASS; EventTiming lab 40–48 ms, no INP de campo. Corrección SSG en curso; fase abierta.** | Métricas de varias navegaciones frías/calientes cumplen objetivos acordados, sin esconder fallas ni romper accesibilidad o funcionalidades. |
| 5 · Integridad de puntos y aislamiento | Corregir y probar el ledger/canje; suite Go con PostgreSQL/Redis, race, vet y govulncheck reportada PASS; smoke usó dataset balanceado, sin carga concurrente de escrituras. | **Implementación y tests locales informados; aislamiento/carreras en testing pendientes** | Sin acceso cruzado; cada operación válida tiene un único efecto; ledger y saldo coinciden; invariantes de canje se mantienen bajo carreras. |
| 6 · Observabilidad y configuración | Agregar logs de capacidad de PostgreSQL, bcrypt, uploads, Redis y SSE; añadir monitor de readiness/version con alertas de inicio/falla/recuperación. Doce pruebas locales de health/monitor PASS; receiver del monitor sigue loopback y no hay webhook externo. | **Monitor mínimo desplegado local/VPS con imagen idéntica; validación local PASS; receiver externo pendiente** | Cuellos de botella atribuibles con métricas y trazas; límites alineados a través de proxy/handler; configuración separada validada; alertas accionables y restauración comprobada. |
| 7 · Campaña de carga y resiliencia | Dataset local completo (100 marcas, 10k clientes/tarjetas, 100k movimientos, ledger conservado). Smoke y k6 local PASS. Sustained 5 min local previo: 3.404 requests, 11,314 RPS, cero errores, checks 100%, p95 9,012 ms/p99 21,905 ms. En testing, smoke 287 requests y sustained 1.751 requests/5,752 RPS, ambos 0 errores/checks 100%; spike 319 requests PASS (p95 260,379 ms/p99 298,087 ms, 0 errores/checks 100%). Soak local de 2 h iniciado 22:13 UTC sigue en curso. SSE real 40 s, heartbeat 20 s; logout nativo cierra family. Monitor 12 pruebas PASS con receiver loopback; receiver externo pendiente. | **Smoke/sustained/spike de testing PASS (287/1.751/319 requests); soak local de 2 h y SSE local de 90 min siguen en curso; SSE proxy PASS; LCP frío falla y variante nueva CLS regression sin promover** | Escenarios, duración, mezcla, dataset y recursos documentados; objetivos pasan en testing y recuperación es observable; reporte declara limitaciones y aceptación. |

### Evidencia de observabilidad y medición · 07/10/2026

Corte parcial 07/10/2026: API `3d77120b…` ready/healthy schema0035; web `0fc06edc…` healthy; landing `9d17179b38bace95d2e3a8fa97d5307dc92675eb` healthy tras retry `bgumk2rrvmcgqeieo72e2rxq`. Monitor mínimo en digest `sha256:365dc3e24ad6bf96c1b94a74a6abb65c812c45d705d43c5fe889e9e148a7b714`. No inferir aceptación por deploy saludable.

El backend emite una línea JSON por request con `request_id`, método, ruta, status y duración. Cada 30 s registra agregados del pool pgx, bcrypt, uploads, llamadas/errores/duración de Redis y estado/actividad/cola/rechazos/desconexiones/entregas/fallos de escritura SSE. Son logs agregados por proceso, sin etiquetas de actor/email/IP. No hay histogramas de latencia HTTP ni endpoint Prometheus en esta instrumentación. `/v1/backoffice/metrics` devuelve métricas de referidos, no telemetría operativa. El pool fuente permite máximo 4 conexiones por proceso.

`/v1/health/live` solo confirma que el handler responde. `/v1/health/ready` prueba PostgreSQL, versión de esquema, el rate limiter (Redis cuando aplica) y storage cuando está configurado; no comprueba el listener SSE ni la entrega de correo/push. En el VPS, el inventario SSH mostró los healthchecks Docker/Coolify y `coolify-sentinel`; no se encontraron contenedores Prometheus, Grafana, Uptime Kuma, Alertmanager o equivalentes. Los timers `vps-backup` y `puntazo-local-backup` son copias programadas, no alertas. El monitor mínimo del VPS/local usa la misma imagen `sha256:365dc3e24ad6bf96c1b94a74a6abb65c812c45d705d43c5fe889e9e148a7b714`, 25 paquetes y Scout 0 HIGH/CRITICAL; UID 65534, capabilities none, sin secretos/puertos. VPS: 3 contenedores saludables, 96 MiB/0,1 CPU; JSON al journal y sin webhook externo. Healthy es healthcheck, no prueba de notificación operacional.

Las lecturas de tarjetas cuentan activas y usan `LIMIT/OFFSET`, además de consultas por programa/beneficios; movimientos cuentan y leen por tarjeta/cliente con orden estable y `LIMIT/OFFSET`. EXPLAIN de 11 lecturas (`artifacts/stress-remediation-20261007/final-readonly-query-plans.json`): offset 980 máximo 2.425 ms; 1.000 movimientos en una tarjeta/marca sin spill. No se midieron 100.000 movimientos por marca; no hay percentiles de producción.

El stream usa un `LISTEN` PostgreSQL por proceso, admite 128 suscriptores por proceso y 4 por cliente, agrupa notificaciones, envía heartbeat cada 20 s y cierra antes de 10 min; heartbeat/evento revalida sesión y revisión. La instrumentación local ahora registra actividad, readiness del broker, encolados/coalescidos/rechazos, desconexiones, entregas y fallos de escritura; aún no mide latencia de entrega ni ofrece una serie agregada entre réplicas. La capacidad no se puede inferir por instancia ni por una prueba corta. Validación local informada: stream vivo 40,38 s con evento inicial y heartbeat de 20 s; logout nativo por body sin bearer respondió 204, el stream cerró al heartbeat siguiente y dejó 0 activos; bearer revocado recibió 401.

El monitor `scripts/stress-remediation/monitor-health.mjs` (owner PR31/fuente `70e7b08` draft; PR testing #15 merged, source `9a52e8` a integración `00f6b31`; fix schema-string `2946922`) comprueba readiness/version con timeout de 3 s e intervalo default de 30 s. Emite alertas JSON acotadas para fallo al iniciar, transición healthy→unhealthy y recuperación; `WEBHOOK_URL` solo acepta HTTP loopback y los redirects están bloqueados. Doce pruebas de health con PG/Redis aislados 503→200 y transiciones/deduplicación PASS; receiver del monitor sigue local. Monitor de VPS activo y 3/3 contenedores saludables; uso 96 MiB/0,1 CPU, logs JSON en journal (15,75 MB observados); sin webhook externo. El PR15 de integración se mergeó; el owner PR31 sigue draft. La imagen final es idéntica local/VPS y no contiene secretos ni expone puertos. La activación de receiver externo, thresholds/rutas/escalamiento/guardia y prueba extremo a extremo quedan pendientes. Evidencia reproducible y durable en `artifacts/stress-remediation-20261007`. La prueba aislada ya ejercitó PG/Redis con readiness 503/200 y transiciones. No se modificó el VPS para inyectar fallos durante soak. Se consultaron `Contabo/AGENTS.md`, `01-servidor-y-accesos`, `22-estandar`, `05-pendientes`, README, índice de runbooks y runbook de backups. Esa documentación operativa no demuestra que exista un receiver externo; su configuración y prueba siguen pendientes.

En testing se midieron cinco navegaciones frías: LCP 3.516–3.996 ms, sobre el objetivo 2,5 s; calientes 340–360 ms. CLS 0,023–0,027 cumple; EventTiming laboratorio 40–48 ms no certifica INP. La variante de optimización SSG tiene una regresión CLS detectada y no se promovió; causa de LCP frío sigue investigándose (SafeAreaProvider/restore gate son hipótesis, no causa confirmada). CI de integración frontend `37694621541` PASS, 150 unit tests y cinco fixtures nuevos adult-gate confirmados. Sin QA físico ni INP campo.

### Fase 0: conciliación requerida

La conciliación debe revisar diferencias de código antes de promover ramas históricas, detectar cambios locales y documentar PRs fuente/integración abiertos o cerrados. Un checkout viejo no se fuerza sobre trabajo local: se conserva y se prepara otro desde la rama remota vigente. No se sustituye un árbol owner por una copia del preview ni se pierde funcionalidad más nueva de `main`. Las migraciones se concilian contra el historial aplicado y no reutilizan números. La reconciliación actualiza un reporte de tarea con checkout, rama, SHA, cambios propios, PR, pruebas y estado de promoción.

### Corte de medición de testing y datos

Pruebas de API con 287 requests: 0 errores, checks 100%, lectura p95 315,434 ms/p99 361,148 ms. Sustained: 1.751 requests en 5 min (5,752 RPS), 0 errores, checks 100%, p95 280,856 ms/p99 352,141 ms. Spike PASS: 319 requests, 0 errores, checks 100%, p95 260,379 ms/p99 298,087 ms. Los fixtures nuevos (5) validan adult confirmation; no se alteraron entidades históricas. La base de testing tiene fixtures con tarjetas vacías; no equivale al dataset local cargado. La campaña local mantiene 100 marcas, 10.000 clientes, 10.000 tarjetas y 100.000 movimientos, con ledger conservado.

EXPLAIN de 11 lecturas quedó durable en `artifacts/stress-remediation-20261007/final-readonly-query-plans.json`: máximo observado para offset 980 fue 2.425 ms; 1.000 movimientos de una marca/tarjeta no hicieron spill a disco. No presentar ese ensayo como medición sobre 100.000 movimientos por marca.

### Reglas transversales de validación y operación

- Cada fase avanza **local → testing → aceptación**. En cada paso se conservan los resultados y la configuración que permitan reproducirlo. Las métricas de testing no se presentan como métricas de producción.
- El VPS de testing conserva sus recursos limitados durante la validación normal. Se puede hacer una comparación con aumento temporal de CPU de PostgreSQL si la métrica lo justifica; ese aumento es opcional, acotado y se restaura después. No es precondición para ejecutar las fases ni para aceptar correcciones de código.
- Dimensionar producción para una campaña o demanda comercial es un trabajo separado; no se deriva capacidad de producción de una prueba breve ni se incluye como requisito de este plan.
- Los escenarios de escrituras respetan cuotas por operador y usan identidades/marcas de laboratorio suficientes. Una única identidad limitada por cuota no mide capacidad global. Los datos sintéticos quedan identificados y aislados.
- En cargas se separan `429` previstos por cuota del error de API, se etiqueta cada clase de respuesta y se informa el porcentaje de ambos. Los `429` esperados no se cuentan como éxito HTTP ni como falla accidental: se evalúan según el escenario y sus checks.
- La aceptación de rendimiento conserva estos umbrales: **LCP < 2,5 s; INP < 200 ms; CLS < 0,1; error API < 1%; checks > 99%; p95 API < 500 ms; p99 API < 1.000 ms**. Se reporta tamaño de muestra, p95/p99 y resultados por escenario; no se relajan umbrales para obtener un aprobado.
- La matriz de aceptación también registra aislamiento tenant, consistencia de saldo/ledger, carreras, colisiones de identidad, errores esperados, presión de recursos, límites del generador y recuperación posterior a la carga.

### Cuota por IP y evidencia pendiente

La prueba con 11 solicitudes alternadas (6 directas y 5 por proxy confiable) recibió HTTP 401 en las once; el escenario esperaba `429` en la última solicitud. El resultado no demuestra que la cuota global entre rutas/orígenes esté funcionando: queda en investigación hasta completar diagnóstico del agente. No se ajustaron límites ni configuración; no declarar que la cuota compartida pasó.

### Estado de activación y evidencia pendiente

La integración CAPTCHA/Siteverify está preparada pero permanece apagada (`false`): el usuario todavía no dispone de widget Turnstile. El deploy API terminó healthy con runtime `3d77120b…`, schema0035 y `/ready` confirmado. Aceptación sigue abierta hasta los checks read-only post-delete, diagnóstico de cuota IP, soak/SSE local y corrección de LCP frío/CLS. El soak Go 1.26 de 2 h iniciado 22:13 UTC y SSE local 90 min iniciado 22:29 UTC siguen en progreso. Spike testing ya terminó PASS (319 requests, p95 260,379 ms/p99 298,087 ms, 0 errores/checks 100%). SSE por proxy público pasó por 19,953 s con heartbeat y headers; quedan los soak locales. Adult-gate fixtures pasan. Landing ya healthy; queda receiver webhook externo. Evidencias de pruebas en `artifacts/stress-remediation-20261007`.

## Exclusiones expresas

Este alcance no incluye recuperar, reparar ni limpiar cuentas históricas sintéticas de la campaña anterior. Tampoco incluye eliminar usuarios reales, modificar datos históricos, una campaña de sizing de producción ni crear un flujo nuevo de recuperación de cuenta. Cualquier necesidad descubierta se registra aparte y no se ejecuta como limpieza implícita de esta remediación.

## Fuente y actualización del estado

La fuente de observaciones anteriores es el informe de campaña completo enlazado arriba. La fuente de aprobación es el alcance que aprobó el usuario para esta remediación; las pruebas de la campaña previa no equivalen a aceptación actual. Actualizar esta matriz solo con evidencia del checkout/ambiente de cada fase y conservar explícitamente el límite entre **propuesto, implementado, integrado, desplegado y aceptado**.
