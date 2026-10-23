---
id: backend-components
title: C4 · Componentes del backend
group: 01 · Arquitectura C4
order: 40
parent: c4-containers
level: component
status: mixed
summary: Componentes backend y ampliación PDF de 30 MiB con esquema 0042, conservando parser y workers.
diagram: true
codeRefs: required
authority: source_code
---

# C4 · Componentes backend

Revisión de fuentes y runtime del **02/10/2026, 22:30–22:33 UTC**. Los SHA y las diferencias por ambiente están en [Estado observado](#/runtime-snapshot). Esta revisión describe arquitectura e integración; no certifica todos los invariantes de negocio ni ejecuta operaciones sobre cuentas reales.

```mermaid
flowchart LR
 BOOT[cmd/server · configuración y pgx] --> ROUTER[Router Gin]
 ROUTER --> MW[Auth, CORS, rate limit y límites]
 MW --> H[Handlers por dominio]
 H --> S[Servicios y validación]
 H --> REPO[Repositorios]
 S --> REPO
 REPO --> PG[(PostgreSQL)]
 S --> EXT[Google, Places, storage y Mercado Pago]
 BOOT --> WORK[Outbox SMTP, push, mantenimiento y precios]
 WORK --> REPO
 WORK --> EXT
 PG --> SSE[Broker LISTEN/NOTIFY · eventos de tarjetas]
 SSE --> H
 click PG href "#/data-current" "Ver persistencia"
```

| Dominio | Entrada implementada |
|---|---|
| Identidad | Registro, login, Google, refresh/logout, verificación y recuperación, cambio de email |
| Cuenta | `/v1/me`, foto, exportación y baja |
| Comercio | Marcas, sucursales, programas SELLOS/PUNTOS, beneficios, imágenes, personal e invitaciones |
| Cliente | QR/código, tarjetas, historial, push y solicitudes de reseña |
| Operación | Preview, acumulación, canje y consulta de resultado por clave idempotente |
| Analíticas | Resumen e historial por día/semana/mes a partir del ledger y zona horaria de la marca |
| Suscripción y referidos | Checkout, resultado, cancelación, webhook, códigos, atribuciones y recompensas |
| Backoffice | Login/cookie, clientes, campañas, influenciadores, precios, historial y liquidación |

REST tiene plazo de 12 segundos; el stream SSE se registra por separado y revalida sesión. Backoffice tiene sesiones propias, respuestas sin caché, límite de cuerpo y cabecera de escritura. Los repositorios usan PostgreSQL para permisos, transacciones y versiones. Los providers de media, rate limit, correo y cobro dependen del entorno.

Las migraciones se ejecutan con `cmd/migrate`; `0033` es el esquema del corte histórico del 02/10. La versión observada por ambiente se registra en [Estado observado](#/runtime-snapshot). No se crea una única tabla `users` al iniciar el servidor.


## Referencias de código

- [Router](https://github.com/am-p/app-loyalty/blob/main/cmd/server/router.go)
- [Rutas comerciales](https://github.com/am-p/app-loyalty/blob/main/cmd/server/routes_merchant.go)
- [Rutas cliente](https://github.com/am-p/app-loyalty/blob/main/cmd/server/routes_customer.go)
- [Movimientos](https://github.com/am-p/app-loyalty/blob/main/internal/repository/movement.go)
- [Workers y proveedores](https://github.com/am-p/app-loyalty/blob/main/cmd/server/main.go)
- [Migrador](https://github.com/am-p/app-loyalty/blob/main/cmd/migrate/main.go)


## Descubrimiento de sucursales · 17/10/2026

La corrección conserva handler → service → repository: validación y permisos de cliente, búsqueda literal, consulta de marcas/sucursales elegibles y persistencia transaccional de favoritos. El orden de locks coincide con las operaciones comerciales: usuario, marca y sucursal. Los medios reutilizan la firma del storage existente; no se introduce otro servicio. [Contrato y promoción](#/flow-customer-map-menu).

## Menú PDF V1 · candidato del 18/10/2026

Backend `c12c94da5c62fcaf062a0094109ed47fc2dedc90`, [PR39 al propietario](https://github.com/am-p/app-loyalty/pull/39) abierta. Implementado en el candidato; desplegado y verificado en testing. La migración 0041 añade documentos y estado de menú por sucursal, sobre la dependencia 0036–0040 de la entrega del mapa. No acredita integración en main ni entrega productiva.

`handler/menu.go` distingue administración autenticada y consulta pública. Autoriza propietario/administrador activo de la marca y sucursal exactas antes de leer el archivo; exige mayoría de edad en las rutas privadas y `If-Match` para mutar. El servicio valida PDF real mediante pdfcpu, con límite de 10 MiB, 1–30 páginas, sin cifrado, timeout de tres segundos y límites de recursos. Reutiliza semáforo y rate limit de cargas, con límite multipart propio sin ampliar imágenes.

El repositorio reserva la carga sin apuntarla como borrador, guarda el objeto inmutable y confirma el borrador después de repetir autorización y versión. Publicar cambia los punteros bajo transacción; orden de locks marca → sucursal → menú/documentos. La firma de URLs se realiza antes del commit con los recursos protegidos. La compensación solo retira cargas `UPLOAD_PENDING`, evitando borrar una activación cuyo commit tuvo respuesta incierta.

La consulta pública nunca selecciona el borrador ni datos personales. Las URLs HTTPS firmadas duran como máximo 300 segundos; retirar impide nuevas firmas. El mantenimiento existente elimina objetos retirados tras seis minutos de gracia, con lease y reintentos. Triggers de baja efectiva de marca/sucursal retiran sus documentos; anonimizar un propietario no retira menús si la marca sigue activa con otro propietario. [Flujo y aceptación V1](#/flow-branch-menu-pdf); V2 digital/IA no está implementada.

- [Handler y errores PDF](https://github.com/gagonzalez1/app-loyalty/blob/closed-test-readiness/internal/handler/menu.go)
- [Parser y coordinación de storage](https://github.com/gagonzalez1/app-loyalty/blob/closed-test-readiness/internal/service/menu.go)
- [Transacciones y limpieza PDF](https://github.com/gagonzalez1/app-loyalty/blob/closed-test-readiness/internal/repository/menu.go)

## Ampliación de componentes PDF · 30 MiB · 18/10/2026

La fuente backend `64bb3fc901293791adcf7738c49d3bbf290c8a20`, rama `closed-test-readiness`, conserva handler → service → repository y amplía sólo el límite PDF a 30 MiB. Configuración/middleware y handler comparten ese máximo y un cuerpo multipart de 30 MiB + 64 KiB para el POST exacto de documentos; los proxies coordinan 31 MiB. Los límites de JSON e imágenes no cambian. El anexo anterior de 10 MiB/0041 conserva su corte histórico.

El servicio mantiene parser real de tres segundos, sin red, 1–30 páginas y rechazo de cifrado. Caps de objeto 2 MiB, decodificación 32 MiB, imagen 64 MiB/25 millones de píxeles, xref y recursión siguen iguales; sólo entrada/stream siguen el nuevo máximo de archivo. Versiones, permisos, firma bajo locks, TTL 300 segundos y worker de limpieza conservan sus invariantes. Testing ejecuta concurrencia efectiva global 2 / actor 2 en la API de 768 MiB.

`cmd/migrate` aplica 0042 sobre 0041 intacta para ampliar el CHECK de tamaño; readiness requiere 0042. Restore y migración live con segundo pase preservaron agregados y fingerprints de menú. El DOWN aborta con documentos mayores de 10 MiB: conservar 0042 en rollback de aplicación, sin DOWN live. No añade proveedores, componentes V2 ni otra API.

**Runtime API confirmado:** `64bb3fc` está desplegado en testing desde 23:47:39 UTC del 18/10/2026, con 0042/42 migraciones, readiness 200, healthy y cero reinicios. Se verificaron 768 MiB/1 CPU y concurrencia efectiva global 2 / actor 2.

**Aceptación live de 30 MiB aprobada:** carga exacta por UI y API, revisión PDF HTTP 200 con tamaño/hash esperado y descarte de los borradores sin cambiar la publicación. El exceso de un byte fue rechazado; los ocho negativos conservaron estado. El perfil con SW anterior actualizó su worker y abrió el PDF real sin HTML del SPA. [Estado observado](#/runtime-snapshot) registra las fuentes y los límites de la evidencia; producción no recibe esta entrega.

- [Configuración y límites](https://github.com/gagonzalez1/app-loyalty/blob/closed-test-readiness/internal/config/config.go)
- [Migración CHECK 0042](https://github.com/gagonzalez1/app-loyalty/blob/closed-test-readiness/migrations/0042_branch_pdf_30mib.up.sql)
