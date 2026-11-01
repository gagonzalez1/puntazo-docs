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

El [desarrollo iOS del 01/11/2026](#/ios-development) tiene un plano propio de fuentes locales y pruebas. No actualiza las observaciones runtime de octubre que siguen ni convierte los pendientes de publicación en bloqueos de desarrollo local.

Revisión de fuentes y runtime del **02/10/2026, 22:30–22:33 UTC**. Los SHA y las diferencias por ambiente están en [Estado observado](#/runtime-snapshot). Esta revisión describe arquitectura e integración; no certifica todos los invariantes de negocio ni ejecuta operaciones sobre cuentas reales.

La comparación inicial de agosto —sólo `users`, cuatro rutas y fidelidad mock— fue superada por el código actual. El historial de Git conserva esa revisión. Estas son las diferencias que afectan la lectura de la arquitectura hoy:

| Diferencia | Estado observado | Trabajo pendiente |
|---|---|---|
| Producción frente a testing | Esquema `0033` en ambos; producción sin `APP_ENV=production` explícito, media disabled, rate limit memory y Mercado Pago disabled según variables/defaults | Revisar configuración productiva y validar proveedores antes de atribuirle paridad funcional |
| Backoffice productivo | Recurso preparado, sin contenedor activo; API main ya registra sus rutas | Promoción y aceptación de UI, cookies, acceso y configuración; el viejo bloqueo por ausencia de rutas no describe el código actual |
| Aislamiento de red | Proyectos y datos separados; aislamiento estricto no acreditado | Conciliar redes/proxy y demostrar límites; proyecto distinto no es prueba |
| Instalación testing | Frontend `4891072` y landing `fc3bea3` ya publicados y saludables, iguales a sus HEAD testing consultados | La revisión acredita artefactos; instalación en dispositivos físicos no comprobada |
| Ambiente adicional develop | Copia de frontend configurada desde `develop`, sin contenedor activo | Conciliar su finalidad y ubicación con la convención operativa; no atribuir disponibilidad ni integración API |
| Analíticas entre UIs | Backend de períodos en ambos; UI de períodos en testing, resumen operativo en main | Promoción de frontend según alcance de producto |
| Proveedores externos | SMTP configurado; Mercado Pago testing configurado; push/Places implementados | Esta revisión no comprobó entrega de correo, evento de cobro firmado, entrega push ni publicación de reseña |
| Contrato objetivo | `openapi.yaml`, spec y `PC-xx` conservan propuestas históricas | Reconciliación ruta/regla por ruta/regla con la implementación; similitud no acredita aprobación |
| Legales | Sitio publicado y saludable | Mantener estado de revisión jurídica del contenido |

La auditoría anterior de testing registró un pendiente de dependencias; esta revisión documental no repitió esa auditoría ni lo declara resuelto. Los respaldos y la restauración de producción se documentaron en el registro operativo privado: este portal no certifica una nueva restauración.

## Pendientes específicos de iOS · 01/11/2026

| Área | Evidencia de fuentes locales | Pendiente concreto |
|---|---|---|
| Integración/promoción | Frontend `origin/develop` está en `32f9e82da26f07789b7fd92f3480fd6ea9700260`; el código de producto de export/baja/teclado sigue igual a `f4ceb708`. `4878aea` corrige una expectativa de una prueba existente; `32f9e82` añade guard y tests de caché de Metro. Backend de trabajo `gagonzalez1/app-loyalty` `fork/develop` no cambió; PR #47 quedó en borrador | CI de 487 terminó con browser 161 aprobadas, 418 aprobaciones y un test Swift omitido. CI de 32 sigue en curso. Backend no promovido a `am-p/app-loyalty` y ningún servicio promovido/desplegado; mantener Mis logros PR104 fuera |
| Identidad Apple | Verificación, alta, vínculo, reauth y revocación durable implementados/probados localmente | Cuenta/capabilities/clave Apple, consentimiento real, relay email y revocación con Apple; proveedor deshabilitado con credenciales ausentes |
| Google OAuth iOS | Adaptador y parámetros previstos | **Pospuesto por decisión del usuario**: cliente OAuth iOS y prueba real de audiencia y URL scheme |
| Google Maps iOS | En el Release local `3c5de42` se observaron tiles reales, permisos, selección por toque/centro, PATCH y reapertura del pin; iPad mostró mapa/marcadores. El Release `f4ceb708` conserva el módulo nativo | Completar pinch y regresión de dispositivos; la prueba local no acredita un build distribuido ni Google OAuth. Ver evidencia histórica y actual separadas |
| StoreKit y referidos | 20 SKU de prueba, intents/sync, binding, inbox, capacidad/gracia y promociones implementados | Configurar productos/grupo/ofertas reales y comprobar canje con/sin token, renovación/restauración/reembolso y contabilidad externa |
| Dos ediciones | Releases `free` e `billing-internal` de `32f9e82` auditados: 2473/2493 fuentes, cero IAP en free, 16 coincidencias internas exactas, flags correctos, 20 manifests cada uno y firmas verificadas. La prueba free→internal con `CI=1` sin reset manual pasó. El bundle interno intermedio de `4878aea` pasó con `CI=0`; no se instaló. La evidencia `69ad97f` continúa como histórica | Release interno `32f9e82` aún no instalado ni ejecutado; no hay distribución en tiendas ni despliegue. No activar funciones públicas dormidas remotamente |
| Harness nativo | `SKTestSession` aprobó 9/9 en iOS26.2 con artefacto `69ad97f`; compra/restore por puente JS se comprobaron localmente sobre ese host | Evidencia histórica del host interno, no del nuevo Release gratuito; faltan Sandbox/TestFlight y validación Apple real |
| Release | Releases `free` y `billing-internal` de `32f9e82` auditados; el interno no está instalado. Sin publicación | CI de `32f9e82` en curso. Cuenta Apple y acuerdos, ficha/capturas/rating, privacidad/manifests, cifrado y acceso demo antes de solicitar review |

La primera versión gratuita no necesita habilitar el cobro Apple para funcionar. La validación de productos/ofertas y la publicación permanecen separadas del desarrollo. Ver [evidencia](#/ios-development-evidence) para límites por etapa.


## Referencias de código

- [Defaults y validación de entorno](https://github.com/am-p/app-loyalty/blob/main/internal/config/config.go)
- [Router Backoffice](https://github.com/am-p/app-loyalty/blob/main/cmd/server/router.go)
- [UI por períodos en testing](https://github.com/gonzalotev/app-fidelidad/blob/testing/app/(tabs)/analytics/index.tsx)
