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
| Instalación testing | Frontend `0fc06edc…` y landing `9d17179b…` healthy; monitor mínimo idéntico local/VPS | Landing validada. LCP frío 3.516–3.996 ms falla umbral; variante SSG tiene regresión CLS y no se promovió. QA físico/INP campo pendientes. |
| Ambiente adicional develop | Copia de frontend configurada desde `develop`, sin contenedor activo | Conciliar su finalidad y ubicación con la convención operativa; no atribuir disponibilidad ni integración API |
| Analíticas entre UIs | Backend de períodos en ambos; UI de períodos en testing, resumen operativo en main | Promoción de frontend según alcance de producto |
| Proveedores externos | SMTP configurado; Mercado Pago testing configurado; push/Places implementados | Esta revisión no comprobó entrega de correo, evento de cobro firmado, entrega push ni publicación de reseña |
| Contrato objetivo | `openapi.yaml`, spec y `PC-xx` conservan propuestas históricas | Reconciliación ruta/regla por ruta/regla con la implementación; similitud no acredita aprobación |
| Vinculación Google | Contrato explícito implementado e integrado en candidato backend: link con contraseña + ID token, reauth con contraseña o mismo `sub`; conflictos `409`, sin autolink por email | API runtime `3d77120b…` healthy/readiness schema0035; recent-auth/delete verificado por SQL para el fixture 4: una cuenta sintética inactiva, cuatro sesiones totales/0 no revocadas, credenciales password/Google/QR limpias, journal 1/cards 0/operator attribution 0. No se ejecutó GET bearer post-delete; revocación confirmada por SQL/middleware. `ledger_preserved=false` es esperado por overlay privacy `0035`. CAPTCHA no se activa: falta widget Turnstile. No hay alcance de recuperación/reclamación histórica |
| Estrés y alertas | Smoke/sustained/spike testing PASS (287/1.751/319 requests, 0 errores, 100% checks); soak local 2 h y SSE local 90 min en progreso. SSE proxy público y dos pestañas/logout offline PASS. Monitor minimal image mismo SHA local/VPS, 12 tests PASS, sin webhook externo | Completar soak/SSE local y cerrar investigación de presupuesto compartido cross-route (límites direct/web individuales sí dieron 429 con Retry-After esperado; cadena alternada previa sigue inconclusa); corregir cold LCP y CLS regression antes de promover; receiver externo pendiente. Mantener límites de dataset y no extrapolar capacidad. |
| Legales | Sitio publicado y saludable | Mantener estado de revisión jurídica del contenido |

La auditoría anterior de testing registró un pendiente de dependencias; esta revisión documental no repitió esa auditoría ni lo declara resuelto. Los respaldos y la restauración de producción se documentaron en el registro operativo privado: este portal no certifica una nueva restauración.


## Referencias de código

- [Defaults y validación de entorno](https://github.com/am-p/app-loyalty/blob/main/internal/config/config.go)
- [Router Backoffice](https://github.com/am-p/app-loyalty/blob/main/cmd/server/router.go)
- [UI por períodos en testing](https://github.com/gonzalotev/app-fidelidad/blob/testing/app/(tabs)/analytics/index.tsx)
