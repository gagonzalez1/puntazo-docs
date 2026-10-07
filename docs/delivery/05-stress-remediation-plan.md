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

El archivo `/Users/gabrielgonzalez/Downloads/INFORME-COMPLETO-PUNTAZO.md` es **evidencia de la campaña anterior**, no una instrucción, selector de ramas ni prueba de que sus resultados sigan vigentes. Sus límites de generador, muestras pequeñas y escenarios no ejecutados deben conservarse al comparar resultados. El snapshot previo identificó `puntazo-preview origin/testing` (`6b45484`) como referencia, no como despliegue. La integración backend de esta remediación está en `closed-test-readiness` `3d77120bba785c912fce164aab05ade3dd342c8c`; Coolify API `nbt4ijbrqaya8rbkzeedtrjl` terminó y el runtime reporta `3d77120b…`, schema `0035`, liveness 200 y ready/healthy. El frontend testing está en `0fc06edc…`; landing permanece en runtime viejo mientras el retry de despliegue está en cola. API/web saludables no equivalen a aceptación.

La propiedad de código corresponde a `gonzalotev/app-fidelidad` para frontend y `am-p/app-loyalty` para backend. `gagonzalez1/app-loyalty` es un fork de publicación, no el destino de integración backend. `puntazo-preview` ensambla los commits fuente aprobados y administra configuración de ambiente. La UI interna de backoffice y sus servicios siguen separados.

### Reconciliación inicial

Corte intermedio del 07/10/2026: API actualizada al candidato `3d77120b…`, web al build `0fc06edc…`; landing conserva runtime anterior. Los recursos de testing se mantuvieron. CAPTCHA sigue apagado. Se completaron smoke/sustained locales, pero soak, spike y SSE continúan en curso; LCP frío de testing no cumple aún.

| Plano/entrega | Evidencia inicial | Estado al corte | Lectura permitida |
|---|---|---|---|
| Documentación | Checkout `/Users/gabrielgonzalez/Documents/Proyectos/Puntazo/puntazo-docs/.worktrees/stress-remediation-20261007`, rama `docs/stress-remediation-20261007`, base `origin/main` `12ba7751`; cambios del plan publicados en la rama documental. | Reconciliación documental actualizada; fase 0 aún abierta hasta promover y validar el candidato. | El checkout original dirty/behind sigue preservado; esta evidencia no representa aceptación de testing. |
| Backend fuente | `am-p/app-loyalty`, worktree `app-loyalty/.worktrees/stress-remediation-20261007`, commit fuente `8f324f8`. Go 1.26.8; PostgreSQL/Redis, race (38,466 s), vet y govulncheck: PASS; 0 vulnerabilidades alcanzables. Scout de imagen: 0 HIGH/CRITICAL; queda un aviso OpenPGP de un módulo no importado/no alcanzable. | Implementación fuente reportada; PR de promoción 14 con CI `37693848547` PASS e integrada en `closed-test-readiness` `3d77120bba785c912fce164aab05ade3dd342c8c`. | No es un despliegue. El candidato integrado conserva schema `0035` y OpenAPI privacy `a292`; testing smoke y sustained PASS, con spike todavía en curso. |
| Frontend fuente | `gonzalotev/app-fidelidad`, worktree `app-fidelidad/.worktrees/stress-remediation-20261007`, fuente `0ec8cc8`; integración `3adc150` con 150 unit tests, cinco fixtures adult-gate nuevos y CI `37694621541` PASS. | Integración frontend validada por CI y fixtures; cinco mediciones frías muestran LCP fuera de objetivo. | Desplegado en testing como `0fc06edc0b62308ade33b535a8e784087586c019`; rendimiento cold-start todavía no aceptado. |
| Runtime testing · API | Coolify job `nbt4ijbrqaya8rbkzeedtrjl` FINISHED; runtime reporta commit `3d77120b…`, schema `0035`, liveness 200 y ready/healthy. Recursos: 1 CPU y 768 MiB. | Deploy confirmado y saludable; CPU/RAM preservados, concurrencia 2, trusted proxy CIDRs canónicos. CAPTCHA continúa `false`. | Smoke de testing limitado: 287 requests, cero errores, checks 100%, lecturas p95 315,434 ms y p99 361,148 ms; sustained 1.751 requests/5,752 RPS, cero errores, checks 100%, p95 280,856 ms/p99 352,141 ms. No equivalen a aceptación final; spike está en curso. |
| Runtime testing · frontend y landing | Web PR 47 desplegado y healthy en `0fc06edc0b62308ade33b535a8e784087586c019`, 0,5 CPU/384 MiB. Landing PR 9 merged en `9d17179`; primer deploy falló healthcheck por `localhost` IPv6 en BusyBox; comprobación local: `localhost` falla y `127.0.0.1` funciona. Job corregido `bgumk…` QUEUED, sin confirmación; runtime sigue `fc3bea3`. | Web desplegada; landing pendiente de completar deploy y healthcheck. | LCP frío web excede objetivo; landing aún no actualizada. |
| Candidato integrado | `closed-test-readiness` integrado `3d77120bba785c912fce164aab05ade3dd342c8c`; conserva schema/migración `0035` y OpenAPI privacy `a292`. | Backend integrado y desplegado; API ready/healthy, schema `0035`. | No inferir aceptación por healthy: siguen pendientes spike, soak, SSE prolongado, LCP frío y validación de aplicación. |
| PR backend | PR owner 31; PR promoción 14 CI `37693848547` PASS e integrada en la rama testing. Schema `0035` preservado. | Integración y despliegue confirmados; smoke/sustained PASS con métricas descritas, spike/soak aún abiertos. | No reutilizar la versión de migración `0035` ni inferir despliegue por la existencia del PR. |
| PR frontend | PR 47 merged; 150 unit tests y CI `37694621541` PASS; cinco fixtures adult-gate nuevos confirmados. | Build testing `0fc06edc…` healthy; no cerrar fase 4 por fallos de LCP en frío. | Las métricas y pruebas del árbol `b0e315e` son evidencia histórica; no equivalen a runtime actual. |
| PR landing | PR 9 merged en HEAD `9d17179`; Scout local 0 HIGH/CRITICAL. Deploy previo falló por healthcheck IPv6 de BusyBox; retry `bgumk…` QUEUED, runtime conserva `fc3bea3`. | Integración confirmada; deploy de retry y runtime actualizado pendientes. | La imagen aún no está confirmada en el VPS; no asumir éxito del retry en cola. |
| PR documentación | PR 10 (plan de estrés) **draft** y PR 8 (root header) **draft**; PR 9 analytics, 7 usercodes, 6 reconcile, 5 reviews y 2 readiness son referencias del snapshot previo. | Reconciliación actualizada en la rama documental. | Un draft o cambio publicado en rama no equivale a integración del portal. |
| Dataset y smoke local | Base local aislada: 100 marcas, 10.000 clientes, 10.000 tarjetas y 100.000 movimientos; ledger conservado. Smoke Go actual PASS. k6 sustained 5 min: 3.404 requests, 11,314 RPS, cero errores, checks 100%, p95 lecturas 9,012 ms y p99 21,905 ms. Spike 5 VUs PASS; cero sesiones restantes. | Testing: smoke de 287 requests sin errores; sustained 5 min 1.751 requests/5,752 RPS, cero errores/checks 100%, p95 280,856 ms y p99 352,141 ms; spike testing en progreso. Soak Go 1.26 iniciado 22:13 UTC sigue en curso (21 min observados). La corrida interrumpida previamente se descarta. | No extrapolar esta muestra a testing, producción ni capacidad máxima. |
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

Las fases permanecen abiertas hasta los gates funcionales y de rendimiento. Fase 0 sigue en progreso: API/web se desplegaron, pero quedan retry landing, LCP frío y campañas de spike, soak y SSE.

| Fase | Trabajo y resultado esperado | Estado al 07/10/2026 | Criterio de salida |
|---|---|---|---|
| 0 · Bases, conciliación y documentación | Fijar ramas/checkouts propietarios; conciliar PRs, cambios locales, candidato y runtime; preservar el checkout documental original; registrar contratos y estados. | **En progreso**: matriz/runtime actualizados; quedan LCP frío, landing retry y campañas de spike/soak/SSE. | Matriz de fuentes revisada; guía enlaza este documento; revalidar ramas y evidencias antes de promover/build/deploy. |
| 1 · Identidad Google | Implementar vinculación explícita y reautenticación conforme al contrato; cubrir colisiones y autenticación reciente. | **Implementación y CI PASS; integrado en candidato testing; despliegue y pruebas de identidad en runtime pendientes** | Pruebas con identidades controladas demuestran que no hay autolink por email ni reemplazo de `sub`; colisiones usan los errores acordados y la vinculación exige prueba reciente. |
| 2 · Admisión de altas y trabajo costoso | Canonicalizar IP usando únicamente proxies confiables; cuota Redis global entre réplicas; límite de bcrypt con espera acotada y costo seguro; prevalidar invitación/reset antes de bcrypt y volver a validar transaccionalmente; preparar CAPTCHA Siteverify para web/native y presupuestos de registro/correo. El proveedor CAPTCHA permanece desactivado por decisión aprobada. | **Implementado/preparado e integrado según fuente; CAPTCHA desactivado porque el usuario no dispone de widget Turnstile; activación y testing pendientes** | Rutas y réplicas comparten presupuesto; cabeceras no confiables no eligen IP; tokens/captcha inválidos se rechazan antes del trabajo caro; correo queda limitado por destinatario y globalmente; 429/503 controlados cuando se agota admisión. |
| 3 · Sesión y acciones sensibles | Logout offline; coordinar refresh entre pestañas; reautenticación para acciones sensibles. En validación local, logout nativo sin bearer devolvió 204 y cerró el stream en el siguiente heartbeat; el bearer revocado devolvió 401. Las pruebas de dependencia de auth conservan la sesión ante 503. | **Implementación y pruebas locales informadas; testing pendiente** | Red interrumpida no pierde la intención de logout ni restaura acceso silenciosamente; dos pestañas renuevan sin expulsión; replay robado se rechaza; baja requiere prueba reciente. |
| 4 · Rendimiento de primera pantalla | Optimizar shell PWA y carga de recursos. En el corte fuente anterior: precache 28,15→3,59 MB y URLs 194→10; transferencia SW frío 33,5→8,23 MB (-75,4%), caliente 0. Métricas antiguas (10 muestras: LCP 196 ms, CLS 0,008236, EventTiming lab 40 ms) son históricas y no sustituyen las cinco mediciones del deploy actual: | **Frontend testing `0fc06edc…`: cinco mediciones frías LCP 3.516–3.996 ms (falla <2,5 s); caliente 340–360 ms. CLS 0,023–0,027 PASS; EventTiming lab 40–48 ms, no INP de campo. Corrección SSG en curso; fase abierta.** | Métricas de varias navegaciones frías/calientes cumplen objetivos acordados, sin esconder fallas ni romper accesibilidad o funcionalidades. |
| 5 · Integridad de puntos y aislamiento | Corregir y probar el ledger/canje; suite Go con PostgreSQL/Redis, race, vet y govulncheck reportada PASS; smoke usó dataset balanceado, sin carga concurrente de escrituras. | **Implementación y tests locales informados; aislamiento/carreras en testing pendientes** | Sin acceso cruzado; cada operación válida tiene un único efecto; ledger y saldo coinciden; invariantes de canje se mantienen bajo carreras. |
| 6 · Observabilidad y configuración | Agregar logs de capacidad de PostgreSQL, bcrypt, uploads, Redis y SSE; añadir monitor de readiness/version con alertas de inicio/falla/recuperación. Doce pruebas locales de health/monitor PASS; receiver del monitor sigue loopback y no hay webhook externo. | **Instrumentación y monitor local PASS; receiver externo y alertas en testing pendientes** | Cuellos de botella atribuibles con métricas y trazas; límites alineados a través de proxy/handler; configuración separada validada; alertas accionables y restauración comprobada. |
| 7 · Campaña de carga y resiliencia | Dataset local completo (100 marcas, 10k clientes/tarjetas, 100k movimientos, ledger conservado). Smoke Go y k6 local PASS. Sustained 5 min local previo: 3.404 requests, 11,314 RPS, cero errores, checks 100%, p95 9,012 ms/p99 21,905 ms. En testing, smoke 287 requests y sustained 1.751 requests/5,752 RPS, ambos 0 errores/checks 100%; spike actual en progreso. Soak local de 2 h iniciado 22:13 UTC sigue en curso. SSE real 40 s, heartbeat 20 s; logout nativo cierra family. Monitor 12 pruebas PASS con receiver loopback; receiver externo pendiente. | **Smoke/sustained local y testing PASS; spike testing, soak local de 2 h (observado 21 min) y SSE local de 90 min en curso; LCP frío no pasa** | Escenarios, duración, mezcla, dataset y recursos documentados; objetivos pasan en testing y recuperación es observable; reporte declara limitaciones y aceptación. |

### Evidencia de observabilidad y medición · 07/10/2026

Corte intermedio 07/10/2026: backend `3d77120b…` integrado y runtime API ready/healthy schema0035; frontend fuente `0ec8cc8`, integración `3adc150` y deploy `0fc06edc…` healthy; landing integrada `9d17179`, pero runtime sigue `fc3bea3` porque retry `bgumk…` del healthcheck está QUEUED. No inferir aceptación por deploy saludable.

El backend emite una línea JSON por request con `request_id`, método, ruta, status y duración. Cada 30 s registra agregados del pool pgx, bcrypt, uploads, llamadas/errores/duración de Redis y estado/actividad/cola/rechazos/desconexiones/entregas/fallos de escritura SSE. Son logs agregados por proceso, sin etiquetas de actor/email/IP. No hay histogramas de latencia HTTP ni endpoint Prometheus en esta instrumentación. `/v1/backoffice/metrics` devuelve métricas de referidos, no telemetría operativa. El pool fuente permite máximo 4 conexiones por proceso.

`/v1/health/live` solo confirma que el handler responde. `/v1/health/ready` prueba PostgreSQL, versión de esquema, el rate limiter (Redis cuando aplica) y storage cuando está configurado; no comprueba el listener SSE ni la entrega de correo/push. En el VPS, el inventario SSH mostró los healthchecks Docker/Coolify y `coolify-sentinel`; no se encontraron contenedores Prometheus, Grafana, Uptime Kuma, Alertmanager o equivalentes. Los timers `vps-backup` y `puntazo-local-backup` son copias programadas, no alertas. El monitor del VPS está activo con tres contenedores saludables, 96 MiB/0,1 CPU y logs JSON en journal; no tiene webhook externo. Healthy es healthcheck, no prueba de notificación operacional.

Las lecturas de tarjetas cuentan activas y usan `LIMIT/OFFSET`, además de consultas por programa/beneficios; movimientos cuentan y leen por tarjeta/cliente con orden estable y `LIMIT/OFFSET`. EXPLAIN de 11 lecturas (artefacto efímero en `/tmp/...`): offset 9.802 máximo 2.425 ms; 1.000 movimientos en una tarjeta/marca sin spill. No se midieron 100.000 movimientos por marca; no hay percentiles de producción.

El stream usa un `LISTEN` PostgreSQL por proceso, admite 128 suscriptores por proceso y 4 por cliente, agrupa notificaciones, envía heartbeat cada 20 s y cierra antes de 10 min; heartbeat/evento revalida sesión y revisión. La instrumentación local ahora registra actividad, readiness del broker, encolados/coalescidos/rechazos, desconexiones, entregas y fallos de escritura; aún no mide latencia de entrega ni ofrece una serie agregada entre réplicas. La capacidad no se puede inferir por instancia ni por una prueba corta. Validación local informada: stream vivo 40,38 s con evento inicial y heartbeat de 20 s; logout nativo por body sin bearer respondió 204, el stream cerró al heartbeat siguiente y dejó 0 activos; bearer revocado recibió 401.

El monitor `scripts/stress-remediation/monitor-health.mjs` (PR 15 de integración pendiente, rama `ba1109d`; fix schema-string `2946922`) comprueba readiness/version con timeout de 3 s e intervalo default de 30 s. Emite alertas JSON acotadas para fallo al iniciar, transición healthy→unhealthy y recuperación; `WEBHOOK_URL` solo acepta HTTP loopback y los redirects están bloqueados. Doce pruebas de health local con PG/Redis aislados 503→200 y cuatro transiciones/deduplicación PASS; receiver del monitor sigue loopback. Monitor de VPS activo y 3/3 contenedores saludables; uso 96 MiB/0,1 CPU, logs JSON en journal (15,75 MB observados); sin webhook externo. PR 15 de integración del monitor en `ba1109d` pendiente, sin ejecución CI por fuera de paths del workflow. La activación de un receiver externo, sus thresholds/rutas/escalamiento/guardia y la prueba extremo a extremo quedan pendientes. Como siguiente simulación local, Compose aislado puede bajar PostgreSQL y validar liveness 200/readiness 503/healthcheck unhealthy/recuperación sin tocar el VPS. Se consultaron `Contabo/AGENTS.md`, `01-servidor-y-accesos`, `22-estandar`, `05-pendientes`, README, índice de runbooks y runbook de backups. Esa documentación operativa no demuestra que exista un receiver externo; su configuración y prueba siguen pendientes.

En testing se midieron cinco navegaciones frías: LCP 3.516–3.996 ms, sobre el objetivo 2,5 s; calientes 340–360 ms. CLS 0,023–0,027 cumple; EventTiming laboratorio 40–48 ms no certifica INP. El agente trabaja en SSG; causa del LCP frío en investigación (SafeAreaProvider/restore gate son hipótesis, no causa confirmada). CI de integración frontend `37694621541` PASS, 150 unit tests y cinco fixtures nuevos adult-gate confirmados. Sin QA físico ni INP campo.

### Fase 0: conciliación requerida

La conciliación debe revisar diferencias de código antes de promover ramas históricas, detectar cambios locales y documentar PRs fuente/integración abiertos o cerrados. Un checkout viejo no se fuerza sobre trabajo local: se conserva y se prepara otro desde la rama remota vigente. No se sustituye un árbol owner por una copia del preview ni se pierde funcionalidad más nueva de `main`. Las migraciones se concilian contra el historial aplicado y no reutilizan números. La reconciliación actualiza un reporte de tarea con checkout, rama, SHA, cambios propios, PR, pruebas y estado de promoción.

### Corte de medición de testing y datos

Pruebas de API con 287 requests: 0 errores, checks 100%, lectura p95 315,434 ms/p99 361,148 ms. Sustained: 1.751 requests en 5 min (5,752 RPS), 0 errores, checks 100%, p95 280,856 ms/p99 352,141 ms. Spike continúa ejecutándose. Los fixtures nuevos (5) validan adult confirmation; no se alteraron entidades históricas. La base de testing tiene fixtures con tarjetas vacías; no equivale al dataset local cargado. La campaña local mantiene 100 marcas, 10.000 clientes, 10.000 tarjetas y 100.000 movimientos, con ledger conservado.

EXPLAIN de 11 lecturas quedó en `/tmp/...` (artefacto efímero/no durable): máximo observado para offset 9.802 fue 2.425 ms; 1.000 movimientos de una marca/tarjeta no hicieron spill a disco. No presentar ese ensayo como medición sobre 100.000 movimientos por marca.

### Reglas transversales de validación y operación

- Cada fase avanza **local → testing → aceptación**. En cada paso se conservan los resultados y la configuración que permitan reproducirlo. Las métricas de testing no se presentan como métricas de producción.
- El VPS de testing conserva sus recursos limitados durante la validación normal. Se puede hacer una comparación con aumento temporal de CPU de PostgreSQL si la métrica lo justifica; ese aumento es opcional, acotado y se restaura después. No es precondición para ejecutar las fases ni para aceptar correcciones de código.
- Dimensionar producción para una campaña o demanda comercial es un trabajo separado; no se deriva capacidad de producción de una prueba breve ni se incluye como requisito de este plan.
- Los escenarios de escrituras respetan cuotas por operador y usan identidades/marcas de laboratorio suficientes. Una única identidad limitada por cuota no mide capacidad global. Los datos sintéticos quedan identificados y aislados.
- En cargas se separan `429` previstos por cuota del error de API, se etiqueta cada clase de respuesta y se informa el porcentaje de ambos. Los `429` esperados no se cuentan como éxito HTTP ni como falla accidental: se evalúan según el escenario y sus checks.
- La aceptación de rendimiento conserva estos umbrales: **LCP < 2,5 s; INP < 200 ms; CLS < 0,1; error API < 1%; checks > 99%; p95 API < 500 ms; p99 API < 1.000 ms**. Se reporta tamaño de muestra, p95/p99 y resultados por escenario; no se relajan umbrales para obtener un aprobado.
- La matriz de aceptación también registra aislamiento tenant, consistencia de saldo/ledger, carreras, colisiones de identidad, errores esperados, presión de recursos, límites del generador y recuperación posterior a la carga.

### Estado de activación y evidencia pendiente

La integración CAPTCHA/Siteverify está preparada pero permanece apagada (`false`): el usuario todavía no dispone de widget Turnstile. El deploy API terminó healthy con runtime `3d77120b…`, schema0035 y `/ready` confirmado. Aceptación sigue abierta hasta spike, soak/SSE, corrección LCP frío y healthcheck del landing. El soak Go 1.26 de 2 h (22:13 UTC) seguía en progreso tras 21 min; SSE local de 90 min comenzó 22:29 UTC, spike testing sigue en progreso. Adult-gate fixtures pasan. El webhook externo y retry del landing quedan pendientes.

## Exclusiones expresas

Este alcance no incluye recuperar, reparar ni limpiar cuentas históricas sintéticas de la campaña anterior. Tampoco incluye eliminar usuarios reales, modificar datos históricos, una campaña de sizing de producción ni crear un flujo nuevo de recuperación de cuenta. Cualquier necesidad descubierta se registra aparte y no se ejecuta como limpieza implícita de esta remediación.

## Fuente y actualización del estado

La fuente de observaciones anteriores es el informe de campaña completo enlazado arriba. La fuente de aprobación es el alcance que aprobó el usuario para esta remediación; las pruebas de la campaña previa no equivalen a aceptación actual. Actualizar esta matriz solo con evidencia del checkout/ambiente de cada fase y conservar explícitamente el límite entre **propuesto, implementado, integrado, desplegado y aceptado**.
