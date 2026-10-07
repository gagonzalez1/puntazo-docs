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

El archivo `/Users/gabrielgonzalez/Downloads/INFORME-COMPLETO-PUNTAZO.md` es **evidencia de la campaña anterior**, no una instrucción, selector de ramas ni prueba de que sus resultados sigan vigentes. Sus límites de generador, muestras pequeñas y escenarios no ejecutados deben conservarse al comparar resultados. El snapshot previo identificó `puntazo-preview origin/testing` (`6b45484`) como referencia, no como despliegue. La integración de esta remediación avanzó después a `3bb54f2`; el runtime testing sigue en versión API `1c2fe6e`, schema `0035`. Ninguna de esas referencias demuestra que el nuevo candidato esté desplegado.

La propiedad de código corresponde a `gonzalotev/app-fidelidad` para frontend y `am-p/app-loyalty` para backend. `gagonzalez1/app-loyalty` es un fork de publicación, no el destino de integración backend. `puntazo-preview` ensambla los commits fuente aprobados y administra configuración de ambiente. La UI interna de backoffice y sus servicios siguen separados.

### Reconciliación inicial

La matriz recoge la reconciliación final local del 07/10/2026, la integración de testing y el inventario de Coolify por SSH. Los commits fuente y el candidato integrado no equivalen a despliegue; el runtime continúa en las versiones anteriores y los tres workflows de API/web/landing están pausados con Auto Deploy desactivado.

| Plano/entrega | Evidencia inicial | Estado al corte | Lectura permitida |
|---|---|---|---|
| Documentación | Checkout `/Users/gabrielgonzalez/Documents/Proyectos/Puntazo/puntazo-docs/.worktrees/stress-remediation-20261007`, rama `docs/stress-remediation-20261007`, base `origin/main` `12ba7751`; cambios del plan publicados en la rama documental. | Reconciliación documental actualizada; fase 0 aún abierta hasta promover y validar el candidato. | El checkout original dirty/behind sigue preservado; esta evidencia no representa aceptación de testing. |
| Backend fuente | `am-p/app-loyalty`, worktree `app-loyalty/.worktrees/stress-remediation-20261007`, commit fuente `0ca975c` sobre `main`. Prueba local Go con PostgreSQL/Redis, race, vet, govulncheck (Go 1.25.14) y Redocly: PASS según el agente. | Implementación fuente reportada; PR owner 31 y promoción al fork de publicación PR 14 en proceso. | No es un despliegue. El candidato integrado conserva schema `0035` y el cambio OpenAPI de privacidad `a292`; las pruebas en testing siguen pendientes. |
| Frontend fuente | `gonzalotev/app-fidelidad`, worktree `app-fidelidad/.worktrees/stress-remediation-20261007`, commit fuente `b0e315e`. 130 pruebas unitarias y Expo Doctor (18 comprobaciones) reportados PASS. PR owner 46; promoción PR 47. | Integración con `closed-test-readiness` resolviendo conflictos de imports. | Aún no desplegado. |
| Runtime testing · API | SSH/Coolify: servicio API `qr5…` continúa en versión `1c2fe6e`, schema `0035` (`closed_test_privacy`), desde el fork de publicación `gagonzalez1/app-loyalty`. | Sin despliegue de la remediación. Auto Deploy API desactivado y workflow pausado. | El runtime es anterior a `0ca975c` y al candidato `3bb54f2`; no atribuir sus cambios al servicio. |
| Runtime testing · frontend y landing | Los servicios web y landing mantienen imágenes/versiones anteriores a `b0e315e` y `2e8aacb`. Auto Deploy está desactivado y los workflows web/landing pausados; no hubo despliegue en esta tarea. | Runtime anterior, sin cambios de campaña publicados. | Promociones y revalidación de testing siguen pendientes. |
| Candidato integrado | `puntazo-preview`, integración testing `3bb54f2`; conserva la migración `0035` ya aplicada y el cambio OpenAPI de privacidad `a292`. | Árbol integrado, runtime no actualizado. | No asumir despliegue: Auto Deploy permanece desactivado; testing funcional de la remediación sigue pendiente. |
| PR backend | PR owner 31 en `am-p/app-loyalty`; PR promoción 14 hacia el fork de publicación. El candidato mantiene `0035` aplicado por `closed_test_privacy`. | Promoción y verificación de pruebas pendientes. | No reutilizar la versión de migración `0035` ni inferir despliegue por la existencia del PR. |
| PR frontend | PR owner 46 en `gonzalotev/app-fidelidad`; PR de promoción 47 a testing. La integración está resolviendo conflictos de imports. | Promoción pendiente. | Los resultados del árbol `b0e315e` aún no son evidencia del runtime. |
| PR landing | Fuente `gagonzalez1/puntazo-landing` `2e8aacb`, PR owner 8 y promoción PR 9. Nginx 1.30.5 fijado; HSTS, límites de uploads y redacción de tokens en logs. El contenedor local con headers de health corregidos pasó sus checks. | Integración/publicación a testing pendiente. | El resultado local no se ha desplegado ni comprobado en el VPS. |
| PR documentación | PR 10 (plan de estrés) **draft** y PR 8 (root header) **draft**; PR 9 analytics, 7 usercodes, 6 reconcile, 5 reviews y 2 readiness son referencias del snapshot previo. | Reconciliación actualizada en la rama documental. | Un draft o cambio publicado en rama no equivale a integración del portal. |
| Dataset y smoke local | Base aislada local `puntazo_load`, schema `0034`: 100 marcas, 10.000 clientes, 10.000 tarjetas y 100.000 movimientos; balances y ledgers consistentes. k6 smoke: 3 VUs, 48 s activos + 12 s de cierre, cero errores, checks 100%, p95 de lecturas 6,95 ms, p99 9,19 ms. | Smoke local PASS. Un sustained previo se interrumpió por suspensión del host y se descarta; el sustained de 5 min se está repitiendo con el host despierto. Soak de 2 h pendiente. | No extrapolar esta muestra a testing, producción ni capacidad máxima. |
| Backup/restore aislado | Restauración aislada en testing sobre schema `0035`, completada en ~5 s; conteos antes/después coinciden: 92 usuarios, 35 marcas, 38 tarjetas y 140 movimientos. Evidencia guardada en `/root/puntazo-stress-remediation-20261007/restore-evidence.json`. | Evidencia observada, acotada al restore aislado reportado. | No equivale a aceptación de la campaña completa de carga ni a restauración de producción. |

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

La remediación tiene implementación fuente y validaciones locales para las fases 1–7. Las fases siguen abiertas hasta completar integración, despliegue controlado y aceptación en testing; no se cierra ninguna por sus resultados locales. Fase 0 continúa en curso hasta reconciliar el runtime y completar los gates de promoción.

| Fase | Trabajo y resultado esperado | Estado al 07/10/2026 | Criterio de salida |
|---|---|---|---|
| 0 · Bases, conciliación y documentación | Fijar ramas/checkouts propietarios; conciliar PRs, cambios locales, candidato y runtime; preservar el checkout documental original; registrar contratos y estados. | **En progreso**: matriz documental actualizada; integración, verificación del runtime y gates aún pendientes. | Matriz de fuentes revisada; guía enlaza este documento; revalidar ramas y evidencias antes de promover/build/deploy. |
| 1 · Identidad Google | Implementar vinculación explícita y reautenticación conforme al contrato; cubrir colisiones y autenticación reciente. | **Implementación local y pruebas informadas PASS; integración y testing pendientes** | Pruebas con identidades controladas demuestran que no hay autolink por email ni reemplazo de `sub`; colisiones usan los errores acordados y la vinculación exige prueba reciente. |
| 2 · Admisión de altas y trabajo costoso | Canonicalizar IP usando únicamente proxies confiables; cuota Redis global entre réplicas; límite de bcrypt con espera acotada y costo seguro; prevalidar invitación/reset antes de bcrypt y volver a validar transaccionalmente; preparar CAPTCHA Siteverify para web/native y presupuestos de registro/correo. El proveedor CAPTCHA permanece desactivado por decisión aprobada. | **Implementación local informada; activación CAPTCHA y testing pendientes** | Rutas y réplicas comparten presupuesto; cabeceras no confiables no eligen IP; tokens/captcha inválidos se rechazan antes del trabajo caro; correo queda limitado por destinatario y globalmente; 429/503 controlados cuando se agota admisión. |
| 3 · Sesión y acciones sensibles | Logout offline; coordinar refresh entre pestañas; reautenticación para acciones sensibles. En validación local, logout nativo sin bearer devolvió 204 y cerró el stream en el siguiente heartbeat; el bearer revocado devolvió 401. Las pruebas de dependencia de auth conservan la sesión ante 503. | **Implementación/pruebas locales informadas; testing pendiente** | Red interrumpida no pierde la intención de logout ni restaura acceso silenciosamente; dos pestañas renuevan sin expulsión; replay robado se rechaza; baja requiere prueba reciente. |
| 4 · Rendimiento de primera pantalla | Optimizar shell PWA y carga de recursos. Precache 28,15→3,59 MB y URLs 194→10; transferencia del service worker frío 33,5→8,23 MB (-75,4%), caliente 0. 130 unit tests y Doctor 18; 10 muestras navegador: LCP 196 ms, CLS 0,008236, EventTiming de laboratorio 40 ms. | **Implementación y laboratorio informados; promoción, INP de campo y QA físico pendientes** | Métricas de varias navegaciones frías/calientes cumplen objetivos acordados, sin esconder fallas ni romper accesibilidad o funcionalidades. |
| 5 · Integridad de puntos y aislamiento | Corregir y probar el ledger/canje; suite Go con PostgreSQL/Redis, race, vet y govulncheck reportada PASS; smoke usó dataset balanceado, sin carga concurrente de escrituras. | **Implementación y tests locales informados; aislamiento/carreras en testing pendientes** | Sin acceso cruzado; cada operación válida tiene un único efecto; ledger y saldo coinciden; invariantes de canje se mantienen bajo carreras. |
| 6 · Observabilidad y configuración | Agregar logs de capacidad de PostgreSQL, bcrypt, uploads, Redis y SSE; añadir monitor de readiness/version con alertas de inicio/falla/recuperación. Suite local con receptor HTTP loopback: 10 pruebas PASS según el agente. | **Instrumentación y monitor locales; configuración de receiver externo y alertas en testing pendientes** | Cuellos de botella atribuibles con métricas y trazas; límites alineados a través de proxy/handler; configuración separada validada; alertas accionables y restauración comprobada. |
| 7 · Campaña de carga y resiliencia | Dataset local y smoke k6 completados: 3 VUs/48 s de carga + 12 s de cierre, cero errores, checks 100%, p95 6,95 ms, p99 9,19 ms. El sustained anterior quedó descartado por suspensión del host; nuevo sostenido de 5 min está en curso con caffeinate. Spike/soak de 2 h, SSE prolongado y alertas de runtime aún pendientes. | **Smoke local PASS; sustained en curso; soak/testing/aceptación pendientes** | Escenarios, duración, mezcla, dataset y recursos documentados; objetivos pasan en testing y recuperación es observable; reporte declara limitaciones y aceptación. |

### Evidencia de observabilidad y medición · 07/10/2026

Esta actualización registra commits fuente `app-loyalty` `0ca975c`, `app-fidelidad` `b0e315e`, `puntazo-landing` `2e8aacb`, el candidato integrado `puntazo-preview` `3bb54f2` y el inventario remoto de solo lectura por SSH. No se activó Auto Deploy ni se publicaron cambios en el runtime.

El backend emite una línea JSON por request con `request_id`, método, ruta, status y duración. Cada 30 s registra agregados del pool pgx, bcrypt, uploads, llamadas/errores/duración de Redis y estado/actividad/cola/rechazos/desconexiones/entregas/fallos de escritura SSE. Son logs agregados por proceso, sin etiquetas de actor/email/IP. No hay histogramas de latencia HTTP ni endpoint Prometheus en esta instrumentación. `/v1/backoffice/metrics` devuelve métricas de referidos, no telemetría operativa. El pool fuente permite máximo 4 conexiones por proceso.

`/v1/health/live` solo confirma que el handler responde. `/v1/health/ready` prueba PostgreSQL, versión de esquema, el rate limiter (Redis cuando aplica) y storage cuando está configurado; no comprueba el listener SSE ni la entrega de correo/push. En el VPS, el inventario SSH mostró los healthchecks Docker/Coolify y `coolify-sentinel`; no se encontraron contenedores Prometheus, Grafana, Uptime Kuma, Alertmanager o equivalentes. Los timers `vps-backup` y `puntazo-local-backup` son copias programadas, no alertas. El estado Docker `healthy` observado es una señal de healthcheck, no evidencia de notificación operacional. No se verificó configuración de notificaciones salientes en Coolify.

Las lecturas de tarjetas cuentan activas y usan `LIMIT/OFFSET`, además de un lateral por beneficio y lectura de beneficios por programas; movimientos primero cuentan y luego leen por tarjeta/cliente, ordenados por `occurred_at DESC, id DESC` con `LIMIT/OFFSET`. Hay índice por tarjeta y fecha, pero aún no hay EXPLAIN/BUFFERS ni percentiles medidos con el dataset representativo. El paginado de API admite `page_size` hasta 100 y no tiene cursor para estas rutas; medir offsets altos queda pendiente.

El stream usa un `LISTEN` PostgreSQL por proceso, admite 128 suscriptores por proceso y 4 por cliente, agrupa notificaciones, envía heartbeat cada 20 s y cierra antes de 10 min; heartbeat/evento revalida sesión y revisión. La instrumentación local ahora registra actividad, readiness del broker, encolados/coalescidos/rechazos, desconexiones, entregas y fallos de escritura; aún no mide latencia de entrega ni ofrece una serie agregada entre réplicas. La capacidad no se puede inferir por instancia ni por una prueba corta. Validación local informada: stream vivo 40,38 s con evento inicial y heartbeat de 20 s; logout nativo por body sin bearer respondió 204, el stream cerró al heartbeat siguiente y dejó 0 activos; bearer revocado recibió 401.

El monitor `scripts/stress-remediation/monitor-health.mjs` comprueba readiness/version con timeout de 3 s e intervalo default de 30 s. Emite alertas JSON acotadas para fallo al iniciar, transición healthy→unhealthy y recuperación; `WEBHOOK_URL` solo acepta HTTP loopback y los redirects están bloqueados. Diez pruebas locales con servidor de captura pasan, incluyendo 503→200, deduplicación y recuperación; no se enviaron alertas externas. La activación de un receiver externo, sus thresholds/rutas/escalamiento/guardia y la prueba extremo a extremo quedan pendientes. Como siguiente simulación local, Compose aislado puede bajar PostgreSQL y validar liveness 200/readiness 503/healthcheck unhealthy/recuperación sin tocar el VPS. No encontré `ContaboAGENTS.md` ni un runbook general de acceso en el checkout o bajo `/root`; sí leí `puntazo-preview/deploy/COOLIFY_SETUP.md`, que documenta el despliegue aislado de preview pero no la configuración actual de alertas. El SSH `puntazo-contabo` se usó solo para enumerar nombres/estados de contenedores y timers.

Los resultados frontend son laboratorio y todavía no certifican experiencia de campo: 10 muestras de navegador reportadas, LCP 196 ms, CLS 0,008236 y EventTiming de laboratorio 40 ms; no hay INP de campo certificado ni QA físico iOS/Android. La rama fuente `b0e315e`/PR 46 sigue integrándose (PR de promoción 47); ningún runtime recibió estos cambios. La preparación PWA redujo precache de 28,15 a 3,59 MB y de 194 a 10 URLs; bytes fríos de service worker 33,5→8,23 MB (-75,4%) y caliente 0.

### Fase 0: conciliación requerida

La conciliación debe revisar diferencias de código antes de promover ramas históricas, detectar cambios locales y documentar PRs fuente/integración abiertos o cerrados. Un checkout viejo no se fuerza sobre trabajo local: se conserva y se prepara otro desde la rama remota vigente. No se sustituye un árbol owner por una copia del preview ni se pierde funcionalidad más nueva de `main`. Las migraciones se concilian contra el historial aplicado y no reutilizan números. La reconciliación actualiza un reporte de tarea con checkout, rama, SHA, cambios propios, PR, pruebas y estado de promoción.

### Reglas transversales de validación y operación

- Cada fase avanza **local → testing → aceptación**. En cada paso se conservan los resultados y la configuración que permitan reproducirlo. Las métricas de testing no se presentan como métricas de producción.
- El VPS de testing conserva sus recursos limitados durante la validación normal. Se puede hacer una comparación con aumento temporal de CPU de PostgreSQL si la métrica lo justifica; ese aumento es opcional, acotado y se restaura después. No es precondición para ejecutar las fases ni para aceptar correcciones de código.
- Dimensionar producción para una campaña o demanda comercial es un trabajo separado; no se deriva capacidad de producción de una prueba breve ni se incluye como requisito de este plan.
- Los escenarios de escrituras respetan cuotas por operador y usan identidades/marcas de laboratorio suficientes. Una única identidad limitada por cuota no mide capacidad global. Los datos sintéticos quedan identificados y aislados.
- En cargas se separan `429` previstos por cuota del error de API, se etiqueta cada clase de respuesta y se informa el porcentaje de ambos. Los `429` esperados no se cuentan como éxito HTTP ni como falla accidental: se evalúan según el escenario y sus checks.
- La aceptación de rendimiento conserva estos umbrales: **LCP < 2,5 s; INP < 200 ms; CLS < 0,1; error API < 1%; checks > 99%; p95 API < 500 ms; p99 API < 1.000 ms**. Se reporta tamaño de muestra, p95/p99 y resultados por escenario; no se relajan umbrales para obtener un aprobado.
- La matriz de aceptación también registra aislamiento tenant, consistencia de saldo/ledger, carreras, colisiones de identidad, errores esperados, presión de recursos, límites del generador y recuperación posterior a la carga.

## Exclusiones expresas

Este alcance no incluye recuperar, reparar ni limpiar cuentas históricas sintéticas de la campaña anterior. Tampoco incluye eliminar usuarios reales, modificar datos históricos, una campaña de sizing de producción ni crear un flujo nuevo de recuperación de cuenta. Cualquier necesidad descubierta se registra aparte y no se ejecuta como limpieza implícita de esta remediación.

## Fuente y actualización del estado

La fuente de observaciones anteriores es el informe de campaña completo enlazado arriba. La fuente de aprobación es el alcance que aprobó el usuario para esta remediación; las pruebas de la campaña previa no equivalen a aceptación actual. Actualizar esta matriz solo con evidencia del checkout/ambiente de cada fase y conservar explícitamente el límite entre **propuesto, implementado, integrado, desplegado y aceptado**.
