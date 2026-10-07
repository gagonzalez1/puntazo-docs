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

El archivo `/Users/gabrielgonzalez/Downloads/INFORME-COMPLETO-PUNTAZO.md` es **evidencia de la campaña anterior**, no una instrucción, selector de ramas ni prueba de que sus resultados sigan vigentes. Sus límites de generador, muestras pequeñas y escenarios no ejecutados deben conservarse al comparar resultados. La observación disponible para esta tarea identifica `puntazo-preview` en `origin/testing` (`6b45484`) como candidato, no como despliegue; el runtime testing observado reportó versión `1c2fe6e` y schema `0035`. Son evidencia de planos separados y no prueban que ese candidato esté desplegado.

La propiedad de código corresponde a `gonzalotev/app-fidelidad` para frontend y `am-p/app-loyalty` para backend. `gagonzalez1/app-loyalty` es un fork de publicación, no el destino de integración backend. `puntazo-preview` ensambla los commits fuente aprobados y administra configuración de ambiente. La UI interna de backoffice y sus servicios siguen separados.

### Reconciliación inicial

La matriz combina el snapshot inicial recibido el 07/10/2026 con la reconciliación posterior de Coolify por SSH y la evidencia de restore aislado. No sustituye una nueva consulta de las ramas o del runtime antes de promover cambios.

| Plano/entrega | Evidencia inicial | Estado al corte | Lectura permitida |
|---|---|---|---|
| Documentación | Checkout `/Users/gabrielgonzalez/Documents/Proyectos/Puntazo/puntazo-docs/.worktrees/stress-remediation-20261007`, rama `docs/stress-remediation-20261007`, desde `origin/main` resuelto a `12ba7751d978f6d7a7262438266264c949979e84`. | Fase 0 en progreso. Checkout de trabajo separado del directorio original dirty/behind, que se preserva. | Base documental seleccionada; los cambios de este plan aún son locales hasta su integración. |
| Backend fuente | Worktree `app-loyalty/.worktrees/stress-remediation-20261007`, rama `fix/stress-remediation-20261007`, HEAD observado `1181cd4` sobre la base seleccionada `origin/main`; el checkout presenta actividad de fase 1 y archivos locales en integración. El helper de carga de esta tarea vive en `scripts/stress-remediation/` y no se ejecutó contra servicios ni DB. | Fase 1 en progreso por agentes. | Evidencia de fuente de ese checkout; no acredita PR integrado ni despliegue. |
| Frontend fuente | Worktree `app-fidelidad/.worktrees/stress-remediation-20261007`, rama `fix/stress-remediation-20261007`, HEAD observado `c1cabba`, publicado en la rama de trabajo; integración con `closed-test-readiness` en curso según actualización del 07/10. No acredita despliegue. | Fase 1 en progreso por agentes. | Evidencia de fuente de ese checkout; no acredita PR integrado ni despliegue. |
| Runtime testing · API | SSH/Coolify: servicio API `qr5…`, fuente de publicación `gagonzalez1/app-loyalty`, rama `closed-test-readiness`, pin/despliegue `1c2fe…`; HEAD remoto actual de esa rama en el fork `a08f1c9`. `/v1/version` informó versión `1c2fe6e`, schema `0035`. `0035` corresponde a `closed_test_privacy`. | Runtime observado; difiere del `main` oficial de `am-p/app-loyalty` (`c13fbd9`). | Runtime proviene del fork/publicación. No usarlo para seleccionar integración ni atribuirlo al `main` oficial. |
| Runtime testing · frontend | SSH/Coolify: servicio frontend `dhzo…`, rama `closed-test-readiness`, despliegue y remoto de esa rama `ca8e776`; `origin/testing` de `app-fidelidad` resuelve a `3929e08`. | Runtime observado; la rama desplegada y `origin/testing` difieren. | Registrar ambos árboles; no asumir que `testing` está desplegado ni sustituir el árbol oficial. |
| Candidato integrado | `puntazo-preview`, `origin/testing`, SHA observado `6b45484`. | Pendiente de integrar y verificar las correcciones de esta campaña; referencia por revalidar. | Candidato de testing; no asumir despliegue. |
| PR backend | PR 29 (webpush) **abierto** y con conflicto en `0035_web_push`; PR 30 **abierto** (el título contiene “closed-test-readiness”, pero su estado no es cerrado). El runtime ya tiene schema `0035` aplicado por `closed_test_privacy`. | Requiere conciliación en fase 0 antes de integración. | No integrar la migración conflictiva sin reconciliar el historial aplicado; no reutilizar `0035`. |
| PR frontend | PR 45→testing **abierto**; PR 37→main (imágenes) y PR 32→main (usercodes). `origin/testing` frontend está en `3929e08`, distinto del checkout de fase 1 (`c1cabba`). | Reconciliación pendiente dentro de fase 0. | Verificar equivalencia y estado contra las ramas propietarias antes de promover. |
| PR documentación | PR 10 (plan de estrés) **draft** y PR 8 (root header) **draft**; PR 9 (analytics), 7 (usercodes), 6 (reconcile), 5 (reviews), 2 (readiness) en el snapshot. | Reconciliación pendiente dentro de fase 0. | Verificar estado y equivalencia de contenido; el draft no representa integración. |
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

El estado inicial es deliberado: fase 0 está en progreso; fase 1 también está en progreso por trabajo de agentes; las fases 2–7 siguen pendientes. No se marca resuelta ninguna fase por haber sido propuesta, documentada o iniciada.

| Fase | Trabajo y resultado esperado | Estado al 07/10/2026 | Criterio de salida |
|---|---|---|---|
| 0 · Bases, conciliación y documentación | Fijar ramas/checkouts propietarios; conciliar PRs, cambios locales, candidato y runtime; preservar el checkout documental original; registrar contratos y estados. | **En progreso** | Matriz de fuentes y diferencias revisada; guía enlaza este documento; ramas y evidencias actuales verificadas antes de integrar/build/deploy. |
| 1 · Identidad Google | Implementar vinculación explícita y reautenticación conforme al contrato; cubrir colisiones y autenticación reciente. | **En progreso · agentes trabajando** | Pruebas con identidades controladas demuestran que no hay autolink por email ni reemplazo de `sub`; colisiones usan los errores acordados y la vinculación exige prueba reciente. |
| 2 · Admisión de altas y trabajo costoso | Canonicalizar IP usando únicamente proxies confiables; cuota Redis global entre réplicas; límite de bcrypt con espera acotada y costo seguro; prevalidar invitación/reset antes de bcrypt y volver a validar transaccionalmente; preparar la verificación CAPTCHA por servidor (Siteverify) para web y native; el proveedor CAPTCHA está desactivado por decisión aprobada para el entorno actual; presupuestos coherentes de registro y correo. | **Pendiente** | Rutas y réplicas comparten presupuesto; cabeceras no confiables no eligen IP; tokens/captcha inválidos se rechazan antes del trabajo caro; correo queda limitado por destinatario y globalmente; 429/503 controlados cuando se agota admisión. |
| 3 · Sesión y acciones sensibles | Logout recuperable offline; coordinar refresh entre pestañas sin aceptar reuso robado; exigir autenticación reciente para baja de cuenta. | **Pendiente** | Red interrumpida no pierde la intención de logout ni restaura acceso silenciosamente; dos pestañas renuevan sin expulsión; replay robado se rechaza; baja requiere prueba reciente. |
| 4 · Rendimiento de primera pantalla | Evitar bloquear primer render por fuentes; reducir/cargar bajo demanda fuentes, iconos, bundle, imágenes y sprites. | **Pendiente** | Métricas de varias navegaciones frías/calientes cumplen objetivos acordados, sin esconder fallas ni romper accesibilidad o funcionalidades. |
| 5 · Integridad de puntos y aislamiento | Probar canjes, acreditaciones, idempotencia y saldos bajo concurrencia con datos e identidades representativos; corregir únicamente fallas demostradas. | **Pendiente** | Sin acceso cruzado; cada operación válida tiene un único efecto; ledger y saldo coinciden; invariantes de canje se mantienen bajo carreras. |
| 6 · Observabilidad y configuración | Medir métricas/consultas, espera y ocupación del pool, CPU/memoria/I/O, proxy, límites de uploads, SSE, Redis/correo y variables por ambiente. Comparar cambios controlados de recursos. | **Pendiente** | Cuellos de botella atribuibles con métricas y trazas; límites alineados a través de proxy/handler; configuración separada validada; alertas accionables y restauración comprobada. |
| 7 · Campaña de carga y resiliencia | Ejecutar carga representativa con k6: sostenida, spike y soak; SSE/conexiones/revalidaciones; restaurar backup y verificar alertas/dependencias/CSP. Distinguir límites del generador, servicio, DB y entorno. El harness local y el helper transaccional para 100 marcas, 10.000 clientes y 10 movimientos por tarjeta están preparados en el checkout backend; todavía no se ejecutaron contra la API ni la base. | **Pendiente** | Escenarios, duración, mezcla, dataset y recursos documentados; objetivos pasan en testing y recuperación es observable; reporte declara limitaciones y aceptación. |

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
