---
id: implementation-gaps
title: Brechas entre código y spec
group: 05 · Referencias
order: 20
parent: documented-commits
level: reference
status: gap
authority: mixed
summary: Brechas históricas y ampliación PDF de 30 MiB implementada y verificada en testing.
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

## Cliente a pantalla completa · candidato PR71

[PR71 frontend](https://github.com/gonzalotev/app-fidelidad/pull/71), rama seleccionada `feat/customer-menu-fullscreen-20261018`, fuente revisada `8ac19ee4a85392b22057fbbc7d668f364505dfaa`. Implementado como candidato autorizado por el usuario; el runtime confirmado sigue en PR70/`b7de8ec` hasta registrar el nuevo despliegue en [Estado observado](#/runtime-snapshot).

El candidato elimina las herramientas/metadatos del cliente, usa scroll continuo de páginas con carga visual diferida y presupuesto compartido de seis millones de píxeles, y limita la renovación de enlace a un intento automático. El comercio conserva su vista previa con controles. La prueba independiente del reader confirmó que un error de decodificación seguido de entradas/salidas de visibilidad emite un único callback; los duplicados no consumen la renovación. Falta acreditar publicación y QA real del nuevo recorrido. La exportación JS nativa aprobada no acredita APK/AAB distribuido, dispositivo físico ni PWA instalada. V2 y cambios de API/datos quedan fuera del alcance.

## Búsqueda y visor interno · testing PR70

La búsqueda normalizada del inventario completo y el renderer PDF.js local están implementados y desplegados en el [frontend de testing](#/flow-branch-menu-pdf); su aceptación del recorrido real está verificada en móvil/escritorio según [Estado observado](#/runtime-snapshot). Las pruebas locales cubren un escaneo CCITT Group 4 y otro de 35 MP. La configuración del origen web se exige en todos los perfiles Android, pero el nuevo módulo WebView requiere un binario nuevo y QA física. Un PDF con firma de origen externo conserva «Abrir aparte»; el visor interno sólo admite el mismo origen. No se añade API, migración ni capacidad V2.

## Ampliación PDF de 30 MiB · estado de fuente del 18/10/2026

El corte anterior de las 16 UTC se conserva como histórico: no acredita el nuevo límite ni descarta la incidencia `/media` reportada después. Backend `64bb3fc901293791adcf7738c49d3bbf290c8a20`, rama `closed-test-readiness`, implementa 30 MiB de PDF y 30 MiB + 64 KiB de multipart; proxies coordinados 31 MiB. Conserva páginas, roles, ETags, TTL, parser de tres segundos y caps de decodificación. `0041` permanece intacta; `0042` amplía sólo el CHECK y exige readiness 0042. No usar DOWN live: la reversión nueva aborta si existen documentos mayores de 10 MiB.

| Área | Evidencia disponible | Pendiente de esta ampliación |
|---|---|---|
| Código backend 30 MiB | Fronteras válida/exceso, rutas vecinas, race, vet, vulnerabilidades alcanzables, OpenAPI y Docker aprobados; PR39 continúa abierta | Integración del propietario y promoción productiva separadas |
| Datos 0042 | Restore y migración live 0041→0042, ambos pases aprobados; agregados y fingerprints de menús preservados | Proceso/readiness 0042 ya confirmados; aceptación live del nuevo tamaño aprobada |
| Recursos testing | Concurrencia global 2 / actor 2 y 768 MiB verificadas | Conservar margen al evaluar cargas concurrentes |
| Apertura `/media` | Incidencia de entrega frontend/Service Worker coordinada | Corrección frontend verificada con SW anterior actualizado, PDF real y ausencia de HTML del SPA; no se atribuye al límite Go |
| Plataformas | Se conserva la QA histórica del recorrido web pequeño | Aceptación live web de 30 MiB aprobada; QA física/PWA instalada no acreditada |

**Runtime API confirmado:** `64bb3fc`/0042, 42 migraciones, readiness 200, healthy y cero reinicios, 768 MiB/1 CPU y concurrencia efectiva global 2 / actor 2. Coolify finalizó 23:47:39 UTC del 18/10/2026. Landing `6533196`/PR11 terminó 23:43:33 UTC; frontend `067dc68` integra PR69, con CI aprobada y despliegue terminado a las 23:53:18 UTC.

**Aceptación live de 30 MiB aprobada:** carga exacta por UI y API, revisión PDF HTTP 200 con tamaño/hash esperado y descarte de los borradores sin cambiar la publicación. El exceso de un byte fue rechazado; los ocho negativos conservaron estado. El perfil con SW anterior actualizó su worker y abrió el PDF real sin HTML del SPA. [Estado observado](#/runtime-snapshot) registra las fuentes y los límites de la evidencia; producción no recibe esta entrega.

- [Contrato implementado de fuente](https://github.com/gagonzalez1/app-loyalty/blob/closed-test-readiness/openapi.yaml)
- [Expansión compatible 0042](https://github.com/gagonzalez1/app-loyalty/blob/closed-test-readiness/migrations/0042_branch_pdf_30mib.up.sql)
