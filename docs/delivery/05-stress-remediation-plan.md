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

El archivo `/Users/gabrielgonzalez/Downloads/INFORME-COMPLETO-PUNTAZO.md` es **evidencia de la campaña anterior**, no una instrucción, selector de ramas ni prueba de que sus resultados sigan vigentes. Sus límites de generador, muestras pequeñas y escenarios no ejecutados deben conservarse al comparar resultados. El snapshot previo identificó `puntazo-preview origin/testing` (`6b45484`) como referencia, no como despliegue. La integración backend de esta remediación está en `closed-test-readiness` `3d77120bba785c912fce164aab05ade3dd342c8c`; el despliegue Coolify API `nbt4ijbrqaya8rbkzeedtrjl` está **IN_PROGRESS**, aún sin confirmación de versión/health posterior. Schema `0035` sigue preservado. La integración frontend mantiene pendientes pruebas de fixtures del adult gate. Ninguna de estas referencias demuestra aceptación del runtime.

La propiedad de código corresponde a `gonzalotev/app-fidelidad` para frontend y `am-p/app-loyalty` para backend. `gagonzalez1/app-loyalty` es un fork de publicación, no el destino de integración backend. `puntazo-preview` ensambla los commits fuente aprobados y administra configuración de ambiente. La UI interna de backoffice y sus servicios siguen separados.

### Reconciliación inicial

La matriz recoge la evidencia disponible al 07/10/2026. El candidato backend está integrado; el job API está en curso, mientras no hay confirmación de despliegue ni de checks runtime posteriores. No se modificaron recursos CPU/RAM. CAPTCHA sigue desactivado. El estado de web/landing requiere confirmación de promoción runtime.

| Plano/entrega | Evidencia inicial | Estado al corte | Lectura permitida |
|---|---|---|---|
| Documentación | Checkout `/Users/gabrielgonzalez/Documents/Proyectos/Puntazo/puntazo-docs/.worktrees/stress-remediation-20261007`, rama `docs/stress-remediation-20261007`, base `origin/main` `12ba7751`; cambios del plan publicados en la rama documental. | Reconciliación documental actualizada; fase 0 aún abierta hasta promover y validar el candidato. | El checkout original dirty/behind sigue preservado; esta evidencia no representa aceptación de testing. |
| Backend fuente | `am-p/app-loyalty`, worktree `app-loyalty/.worktrees/stress-remediation-20261007`, commit fuente `8f324f8`. Go 1.26.8; PostgreSQL/Redis, race (38,466 s), vet y govulncheck: PASS; 0 vulnerabilidades alcanzables. Scout de imagen: 0 HIGH/CRITICAL; queda un aviso OpenPGP de un módulo no importado/no alcanzable. | Implementación fuente reportada; PR de promoción 14 con CI `37693848547` PASS e integrada en `closed-test-readiness` `3d77120bba785c912fce164aab05ade3dd342c8c`. | No es un despliegue. El candidato integrado conserva schema `0035` y el cambio OpenAPI de privacidad `a292`; las pruebas en testing siguen pendientes. |
| Frontend fuente | `gonzalotev/app-fidelidad`, worktree `app-fidelidad/.worktrees/stress-remediation-20261007`, fuente actual `0ec8cc8` (build args CAPTCHA y nginx slim); integración `3adc4bd` con fixtures adult gate, CI `37694621541` en progreso. Métricas de laboratorio del árbol `b0e315e` se conservan como evidencia histórica y no se atribuyen al commit actual sin confirmar equivalencia. | Pruebas de fixtures del adult gate pendientes; no se atribuye aceptación de frontend. | Aún no desplegado. |
| Runtime testing · API | Coolify job `nbt4ijbrqaya8rbkzeedtrjl` está `IN_PROGRESS`, selector `HEAD`; schema `0035` permanece. No hay confirmación de finalización ni verificación posterior de `/version` y readiness. | Despliegue pendiente de confirmación. No se modificaron CPU/RAM; concurrencia configurada en 2 y trusted proxy CIDRs canonicalizados. CAPTCHA continúa `false`. | No atribuir cambios del candidato al servicio hasta que el job termine y se verifiquen versión, readiness y pruebas smoke. |
| Runtime testing · frontend y landing | Landing PR 9 merged en testing HEAD `9d17179` (remote limpio), aún sin deploy. La integración frontend `3adc4bd` está en CI; deploy/runtime no confirmados. | Estado runtime no revalidado en este corte. | Promociones y revalidación de testing siguen pendientes. |
| Candidato integrado | `closed-test-readiness` integrado `3d77120bba785c912fce164aab05ade3dd342c8c`; conserva schema/migración `0035` y OpenAPI privacy `a292`. | Backend integrado; deployment job en curso, runtime aún no confirmado. | No asumir despliegue: Auto Deploy permanece desactivado; testing funcional de la remediación sigue pendiente. |
| PR backend | PR owner 31; PR promoción 14 CI `37693848547` PASS e integrada en la rama testing. Schema `0035` preservado. | Integración confirmada; despliegue y smoke de runtime pendientes. | No reutilizar la versión de migración `0035` ni inferir despliegue por la existencia del PR. |
| PR frontend | PR owner 46 y promoción 47; pruebas de fixtures del adult gate siguen pendientes. | No cerrar promoción/aceptación hasta completar fixtures y verificación del runtime. | Las métricas y pruebas del árbol `b0e315e` son evidencia histórica; no equivalen a runtime actual. |
| PR landing | PR 9 de landing merged en testing HEAD `9d17179` (remote limpio); Scout de imagen sin HIGH/CRITICAL. HSTS pasó prueba local de respuesta única en 200/404. | Integración en testing confirmada; deployment y runtime pendientes. | El resultado local no se ha desplegado ni comprobado en el VPS. |
| PR documentación | PR 10 (plan de estrés) **draft** y PR 8 (root header) **draft**; PR 9 analytics, 7 usercodes, 6 reconcile, 5 reviews y 2 readiness son referencias del snapshot previo. | Reconciliación actualizada en la rama documental. | Un draft o cambio publicado en rama no equivale a integración del portal. |
| Dataset y smoke local | Base local aislada: 100 marcas, 10.000 clientes, 10.000 tarjetas y 100.000 movimientos; ledger conservado. Smoke Go actual PASS. k6 sustained 5 min: 3.404 requests, 11,314 RPS, cero errores, checks 100%, p95 lecturas 9,012 ms y p99 21,905 ms. Spike 5 VUs PASS; cero sesiones restantes. | Smoke y sustained local PASS; el sustained interrumpido anteriormente sigue descartado. Soak de 2 h iniciado 07/10/2026 22:13 UTC y aún en curso; no cerrar fase 7 hasta resultado final. | No extrapolar esta muestra a testing, producción ni capacidad máxima. |
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

Las fases tienen implementación fuente y evidencia local descrita abajo, pero siguen abiertas hasta los gates de integración, despliegue verificado y aceptación en testing. Fase 0 continúa en curso; el job API está en curso y el soak de dos horas no terminó.

| Fase | Trabajo y resultado esperado | Estado al 07/10/2026 | Criterio de salida |
|---|---|---|---|
| 0 · Bases, conciliación y documentación | Fijar ramas/checkouts propietarios; conciliar PRs, cambios locales, candidato y runtime; preservar el checkout documental original; registrar contratos y estados. | **En progreso**: matriz y contratos reconciliados; confirmar deployment API, frontend fixtures y gates de testing. | Matriz de fuentes revisada; guía enlaza este documento; revalidar ramas y evidencias antes de promover/build/deploy. |
| 1 · Identidad Google | Implementar vinculación explícita y reautenticación conforme al contrato; cubrir colisiones y autenticación reciente. | **Implementación y CI PASS; integrado en candidato testing; despliegue y pruebas de identidad en runtime pendientes** | Pruebas con identidades controladas demuestran que no hay autolink por email ni reemplazo de `sub`; colisiones usan los errores acordados y la vinculación exige prueba reciente. |
| 2 · Admisión de altas y trabajo costoso | Canonicalizar IP usando únicamente proxies confiables; cuota Redis global entre réplicas; límite de bcrypt con espera acotada y costo seguro; prevalidar invitación/reset antes de bcrypt y volver a validar transaccionalmente; preparar CAPTCHA Siteverify para web/native y presupuestos de registro/correo. El proveedor CAPTCHA permanece desactivado por decisión aprobada. | **Implementado/preparado e integrado según fuente; CAPTCHA desactivado porque el usuario no dispone de widget Turnstile; activación y testing pendientes** | Rutas y réplicas comparten presupuesto; cabeceras no confiables no eligen IP; tokens/captcha inválidos se rechazan antes del trabajo caro; correo queda limitado por destinatario y globalmente; 429/503 controlados cuando se agota admisión. |
| 3 · Sesión y acciones sensibles | Logout offline; coordinar refresh entre pestañas; reautenticación para acciones sensibles. En validación local, logout nativo sin bearer devolvió 204 y cerró el stream en el siguiente heartbeat; el bearer revocado devolvió 401. Las pruebas de dependencia de auth conservan la sesión ante 503. | **Implementación y pruebas locales informadas; testing pendiente** | Red interrumpida no pierde la intención de logout ni restaura acceso silenciosamente; dos pestañas renuevan sin expulsión; replay robado se rechaza; baja requiere prueba reciente. |
| 4 · Rendimiento de primera pantalla | Optimizar shell PWA y carga de recursos. Precache 28,15→3,59 MB y URLs 194→10; transferencia del service worker frío 33,5→8,23 MB (-75,4%), caliente 0. 130 unit tests y Doctor 18; 10 muestras navegador: LCP 196 ms, CLS 0,008236, EventTiming de laboratorio 40 ms. | **Fuente frontend `0ec8cc8`; integración `3adc4bd` CI en progreso; fixtures adult-gate, INP de campo y QA físico pendientes** | Métricas de varias navegaciones frías/calientes cumplen objetivos acordados, sin esconder fallas ni romper accesibilidad o funcionalidades. |
| 5 · Integridad de puntos y aislamiento | Corregir y probar el ledger/canje; suite Go con PostgreSQL/Redis, race, vet y govulncheck reportada PASS; smoke usó dataset balanceado, sin carga concurrente de escrituras. | **Implementación y tests locales informados; aislamiento/carreras en testing pendientes** | Sin acceso cruzado; cada operación válida tiene un único efecto; ledger y saldo coinciden; invariantes de canje se mantienen bajo carreras. |
| 6 · Observabilidad y configuración | Agregar logs de capacidad de PostgreSQL, bcrypt, uploads, Redis y SSE; añadir monitor de readiness/version con alertas de inicio/falla/recuperación. Suite local con receptor HTTP loopback: 10 pruebas PASS según el agente. | **Instrumentación y monitor local PASS; receiver externo y alertas en testing pendientes** | Cuellos de botella atribuibles con métricas y trazas; límites alineados a través de proxy/handler; configuración separada validada; alertas accionables y restauración comprobada. |
| 7 · Campaña de carga y resiliencia | Dataset local completo (100 marcas, 10k clientes/tarjetas, 100k movimientos, ledger conservado). Smoke Go y k6 PASS. Sustained 5 min: 3.404 requests, 11,314 RPS, 0 errores, checks 100%, p95 9,012 ms/p99 21,905 ms; spike 5 VUs PASS y 0 sesiones restantes. Soak de 2 h iniciado a las 22:13 UTC y sigue en curso. SSE real 40 s, heartbeat 20 s; logout nativo cierra family. Monitor 10 pruebas PASS con receiver local; receiver externo pendiente. | **Smoke, sustained y spike local PASS; soak de 2 h en curso; despliegue/testing/aceptación pendientes** | Escenarios, duración, mezcla, dataset y recursos documentados; objetivos pasan en testing y recuperación es observable; reporte declara limitaciones y aceptación. |

### Evidencia de observabilidad y medición · 07/10/2026

Corte de evidencia actualizado 07/10/2026: backend fuente `8f324f8`, frontend fuente `0ec8cc8` / integración `3adc4bd` (CI `37694621541` en progreso), landing integrada en testing `9d17179` (PR 9 merged), backend integrado en `closed-test-readiness` `3d77120bba785c912fce164aab05ade3dd342c8c`. Job Coolify API `nbt4ijbrqaya8rbkzeedtrjl` IN_PROGRESS; todavía sin verificación posterior de runtime. No afirmar publicación ni aceptación.

El backend emite una línea JSON por request con `request_id`, método, ruta, status y duración. Cada 30 s registra agregados del pool pgx, bcrypt, uploads, llamadas/errores/duración de Redis y estado/actividad/cola/rechazos/desconexiones/entregas/fallos de escritura SSE. Son logs agregados por proceso, sin etiquetas de actor/email/IP. No hay histogramas de latencia HTTP ni endpoint Prometheus en esta instrumentación. `/v1/backoffice/metrics` devuelve métricas de referidos, no telemetría operativa. El pool fuente permite máximo 4 conexiones por proceso.

`/v1/health/live` solo confirma que el handler responde. `/v1/health/ready` prueba PostgreSQL, versión de esquema, el rate limiter (Redis cuando aplica) y storage cuando está configurado; no comprueba el listener SSE ni la entrega de correo/push. En el VPS, el inventario SSH mostró los healthchecks Docker/Coolify y `coolify-sentinel`; no se encontraron contenedores Prometheus, Grafana, Uptime Kuma, Alertmanager o equivalentes. Los timers `vps-backup` y `puntazo-local-backup` son copias programadas, no alertas. El estado Docker `healthy` observado es una señal de healthcheck, no evidencia de notificación operacional. No se verificó configuración de notificaciones salientes en Coolify.

Las lecturas de tarjetas cuentan activas y usan `LIMIT/OFFSET`, además de un lateral por beneficio y lectura de beneficios por programas; movimientos primero cuentan y luego leen por tarjeta/cliente, ordenados por `occurred_at DESC, id DESC` con `LIMIT/OFFSET`. Hay índice por tarjeta y fecha, pero aún no hay EXPLAIN/BUFFERS ni percentiles medidos con el dataset representativo. El paginado de API admite `page_size` hasta 100 y no tiene cursor para estas rutas; medir offsets altos queda pendiente.

El stream usa un `LISTEN` PostgreSQL por proceso, admite 128 suscriptores por proceso y 4 por cliente, agrupa notificaciones, envía heartbeat cada 20 s y cierra antes de 10 min; heartbeat/evento revalida sesión y revisión. La instrumentación local ahora registra actividad, readiness del broker, encolados/coalescidos/rechazos, desconexiones, entregas y fallos de escritura; aún no mide latencia de entrega ni ofrece una serie agregada entre réplicas. La capacidad no se puede inferir por instancia ni por una prueba corta. Validación local informada: stream vivo 40,38 s con evento inicial y heartbeat de 20 s; logout nativo por body sin bearer respondió 204, el stream cerró al heartbeat siguiente y dejó 0 activos; bearer revocado recibió 401.

El monitor `scripts/stress-remediation/monitor-health.mjs` comprueba readiness/version con timeout de 3 s e intervalo default de 30 s. Emite alertas JSON acotadas para fallo al iniciar, transición healthy→unhealthy y recuperación; `WEBHOOK_URL` solo acepta HTTP loopback y los redirects están bloqueados. Diez pruebas locales con servidor de captura PASS, incluyendo 503→200, deduplicación y recuperación; no se enviaron alertas externas y falta receiver real. La activación de un receiver externo, sus thresholds/rutas/escalamiento/guardia y la prueba extremo a extremo quedan pendientes. Como siguiente simulación local, Compose aislado puede bajar PostgreSQL y validar liveness 200/readiness 503/healthcheck unhealthy/recuperación sin tocar el VPS. Se consultaron `Contabo/AGENTS.md`, `01-servidor-y-accesos`, `22-estandar`, `05-pendientes`, README, índice de runbooks y runbook de backups. Esa documentación operativa no demuestra que exista un receiver externo; su configuración y prueba siguen pendientes.

Los resultados frontend son laboratorio y todavía no certifican experiencia de campo: 10 muestras de navegador reportadas, LCP 196 ms, CLS 0,008236 y EventTiming de laboratorio 40 ms; no hay INP de campo certificado ni QA físico iOS/Android. La integración frontend `3adc4bd` tiene CI `37694621541` en progreso y debe completar fixtures del adult gate; no hay evidencia de aceptación del runtime. La preparación PWA redujo precache de 28,15 a 3,59 MB y de 194 a 10 URLs; bytes fríos de service worker 33,5→8,23 MB (-75,4%) y caliente 0.

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

### Estado de activación y evidencia pendiente

La integración CAPTCHA/Siteverify está preparada pero permanece apagada (`false`): el usuario todavía no dispone de widget Turnstile. No se considera una incidencia del código ni se habilita sin el componente de producto. El job API de Coolify está en curso, no confirmado; después de finalizar se deben comprobar `/v1/version`, readiness y un smoke pequeño antes de atribuirle el candidato integrado. El soak de 2 h está en curso y no se registra como aprobado hasta observar su resumen final. Las pruebas adult-gate del frontend y un receiver externo de alertas siguen pendientes.

## Exclusiones expresas

Este alcance no incluye recuperar, reparar ni limpiar cuentas históricas sintéticas de la campaña anterior. Tampoco incluye eliminar usuarios reales, modificar datos históricos, una campaña de sizing de producción ni crear un flujo nuevo de recuperación de cuenta. Cualquier necesidad descubierta se registra aparte y no se ejecuta como limpieza implícita de esta remediación.

## Fuente y actualización del estado

La fuente de observaciones anteriores es el informe de campaña completo enlazado arriba. La fuente de aprobación es el alcance que aprobó el usuario para esta remediación; las pruebas de la campaña previa no equivalen a aceptación actual. Actualizar esta matriz solo con evidencia del checkout/ambiente de cada fase y conservar explícitamente el límite entre **propuesto, implementado, integrado, desplegado y aceptado**.
