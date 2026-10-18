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


## Referencias de código

- [Defaults y validación de entorno](https://github.com/am-p/app-loyalty/blob/main/internal/config/config.go)
- [Router Backoffice](https://github.com/am-p/app-loyalty/blob/main/cmd/server/router.go)
- [UI por períodos en testing](https://github.com/gonzalotev/app-fidelidad/blob/testing/app/(tabs)/analytics/index.tsx)


## Mapa y menús · 17/10/2026

La corrección del mapa tiene su entrega independiente en PR38 backend y PR66 frontend. El inventario de testing de esa revisión registró 37 sucursales elegibles, de las cuales 34 no tenían coordenadas completas: deben permanecer en la lista con ubicación pendiente. Es un corte histórico, no un recuento vigente. El catálogo no acredita ubicaciones que no fueron cargadas. Ver [alcance y contrato](#/flow-customer-map-menu) y [verificación runtime](#/runtime-snapshot).

## Menú PDF V1 · entrega de testing del 18/10/2026

Backend `c12c94da5c62fcaf062a0094109ed47fc2dedc90`, frontend `72cf2229f8f732d705a63641692aff26481d5047` y landing `f22bc86ac41e07a28c203f0dc3cb0e4d4b49f32c` están desplegados y saludables. La QA real cubrió tienda, cliente desde mapa y visitante sin sesión, además del proxy con PDF de 3 MB, validaciones negativas y conservación de publicación. [Estado observado](#/runtime-snapshot) conserva fuentes y alcance.

| Área | Resultado | Pendiente |
|---|---|---|
| V1 PDF | Carga, borrador privado, revisión, publicación, retiro, reemplazo y consulta pública verificados | Sin bloqueo conocido en el recorrido probado |
| Promoción | Frontend PR67/68 y landing PR10 integradas en testing; backend PR39 abierta | Integrar backend en propietario y preparar promoción productiva; main oficial observado continúa en 0035 |
| Plataformas | Navegador Chromium 390×844 y 1440×1000, export JS Android aprobada | QA física Android/iOS y PWA instalada |
| V2 | Idea futura documentada | Sin editor, IA, buscador de productos, proveedor ni tablas implementadas |

`puntazo-preview` está retirado. El OpenAPI objetivo y las propuestas históricas PC-xx conservan su autoridad; esta entrega no las aprueba. Las filas iniciales de esta página mantienen el corte histórico de octubre indicado allí.

- [Persistencia PDF](https://github.com/gagonzalez1/app-loyalty/blob/closed-test-readiness/internal/repository/menu.go)
- [Editor y estados](https://github.com/gonzalotev/app-fidelidad/blob/testing/src/features/merchant/components/CommercialBranchMenuEditor.tsx)
