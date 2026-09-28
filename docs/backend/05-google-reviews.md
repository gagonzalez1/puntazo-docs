---
id: google-reviews-contract
title: Reseñas de Google · Contrato acordado v1
group: 03 · Backend objetivo
order: 50
parent: backend-review-index
level: contract
status: mixed
authority: mixed
summary: Reglas acordadas e implementación en ramas fuente de reseñas de Google; integración y despliegue pendientes.
diagram: true
codeRefs: optional
---

# Reseñas de Google · Contrato acordado v1

> **ACORDADO para esta funcionalidad el 2026-09-28. Implementación pendiente de evidencia en los repositorios fuente.** Esta aprobación tiene alcance específico; no aprueba el resto de las propuestas `PC-xx`, ni convierte rutas objetivo de OpenAPI en rutas implementadas.

Este documento es la referencia del contrato congelado para la funcionalidad. Enlaces relacionados: [flujo del comercio](#/flow-merchant-profile), [flujo de tarjetas del cliente](#/flow-customer-cards), [matriz de integración](#/integration-matrix), [brechas](#/implementation-gaps) y [índice de revisión backend](#/backend-review-index).

```mermaid
flowchart LR
  OWNER["Propietario o administrador"] --> SETTINGS["Configura sucursal y destino"]
  PURCHASE["Acumulación confirmada"] --> COUNT["Cuenta compras históricas"]
  COUNT -->|"umbral exacto, nueva compra y función activa"| INVITE["Invitación única cliente/sucursal"]
  INVITE --> LEASE["Reserva breve al mostrar"]
  LEASE --> CUSTOMER["Cliente ve diálogo"]
  CUSTOMER --> EVENT["Presentada, omitida o clic"]
  SETTINGS --> GOOGLE["Places: solo ID persistido"]
  GOOGLE -. "fuera de transacción; falla aislada" .-> CUSTOMER
```

## Reglas de negocio

- La función empieza desactivada. Valores iniciales: umbral `1`, mensaje `¿Cómo fue tu experiencia? Compartí tu opinión en Google.`, destino `MANUAL_LINK` y URL nula hasta configurarla.
- Una acumulación confirmada cuenta como una compra por cliente y sucursal, también en programas de puntos y sin importar el monto. Canjes y vistas previas no cuentan. Se conserva el conteo histórico aunque la función esté desactivada; no se crean invitaciones retroactivas.
- Sólo la nueva acumulación que hace que el total histórico alcance exactamente el umbral crea una invitación, y sólo si la función y la sucursal están activas. Hay como máximo una invitación de por vida por cliente y sucursal. Repetir una confirmación idempotente no suma otra compra.
- Desactivar la función o la sucursal cancela reservas e invitaciones pendientes. Cambiar la configuración no reinicia el historial ni amplía el límite de una invitación ya mostrada o cancelada.
- La consulta externa a Google ocurre fuera de la transacción de fidelidad. Un error o demora del proveedor nunca impide acreditar la compra.

## Configuración y permisos

Propietarios y administradores de la marca pueden leer, editar, buscar ubicaciones y consultar métricas de sus sucursales. Operadores y usuarios de otra marca no tienen acceso. La edición usa `PUT` con `ETag`/`If-Match`: la configuración inicial, incluso cuando aún no existe fila, tiene versión `1`; cada escritura incrementa versión y debe protegerse de escrituras concurrentes.

El mensaje es texto plano de hasta 500 caracteres Unicode. El umbral es un entero positivo, máximo `1000000`. Con la función activa, debe estar configurado exactamente el destino seleccionado. Se acepta un `place_id` de Google o un enlace manual HTTPS de los hosts oficiales acordados (`g.page`, `maps.app.goo.gl`, `maps.google.com`, `www.google.com`, `search.google.com`, `share.google`); se rechazan credenciales en URL, subdominios no permitidos y otros hosts. El servidor no visita enlaces manuales.

## API acordada e implementada en la versión indicada abajo

Prefijo `/v1`; se conserva el envelope existente `{data, request_id}` y los errores estándar de autenticación. Estas rutas forman parte de los commits de fuente y de la versión de testing citados en el estado de evidencia. La aprobación del contrato sigue separada de la verificación técnica.

| Método y ruta | Uso y resultado |
|---|---|
| `GET /marcas/:brand_id/sucursales/:resource_id/resenas` | Leer configuración editable y estado de Places. Devuelve `branch_id`, `enabled`, `purchase_threshold`, `message`, `destination_type`, `google_place_id`, `manual_review_url`, `version`, `places_available` y `review_url`. El fallo de Google deja `review_url` nula y la configuración disponible para editar. |
| `PUT /marcas/:brand_id/sucursales/:resource_id/resenas` | Actualizar sólo campos editables, con `If-Match`; no acepta campos derivados o de versión. |
| `POST /marcas/:brand_id/sucursales/:resource_id/resenas/busqueda` | Búsqueda autenticada y limitada por tasa, con consulta opcional de 3–300 caracteres; sin consulta usa nombre y dirección de la sucursal. Devuelve `place_id`, nombre, dirección, enlace de reseña y atribuciones transitorias opcionales `[{provider, provider_uri}]`. |
| `GET /marcas/:brand_id/sucursales/:resource_id/resenas/metricas` | Conteos de invitaciones únicas mostradas, omitidas y con clic (`shown`, `skipped`, `clicked`). |
| `GET /clientes/me/resenas/pendientes` | Invitaciones propias, de sucursal activa y con función activa, ordenadas de más antigua a más reciente. Excluye reservas ajenas vigentes y destinos que no se puedan resolver; esos casos quedan pendientes. |
| `POST /clientes/me/resenas/:invitation_id/reserva` | Reserva atómica y exclusiva por 60 segundos. Devuelve invitación, token y expiración. Revalida titular, sucursal y configuración; responde `409` si ya está reservada, mostrada o cerrada. |
| `POST /clientes/me/resenas/:invitation_id/eventos` | Registra `PRESENTADA`, `OMITIDA` o `CLIC` con token. Repetir el mismo evento es idempotente; omitir o registrar clic requiere presentación previa. |

La búsqueda usa Places API (New), campos mínimos `id`, `displayName`, `formattedAddress`, `googleMapsLinks.writeAReviewUri` y `attributions`; la resolución usa Place Details (New). `GOOGLE_PLACES_API_KEY` es opcional en runtime, privada y sólo del backend: sin clave la búsqueda informa dependencia no disponible, `places_available` es falso y el enlace manual sigue funcionando. La llamada externa tiene límite de 5 segundos. No se exponen errores o secretos del proveedor ni se persisten resultados o URLs de modo automático: sólo se guarda el ID de lugar. El enlace de reseña se resuelve al leer. Las atribuciones son transitorias y la interfaz incluye la marca Google Maps.

La invitación contiene `id`, `card_id`, `brand_id`, `branch_id`, `branch_name`, `operation_id`, `message`, `review_url` y `occurred_at`. La reserva devuelve `reservation_token` y `expires_at`. La respuesta de evento contiene `id`, `shown`, `skipped` y `clicked`. Una presentación ya aceptada conserva validez de token para la respuesta del mismo diálogo aunque pasen los 60 segundos; no se permite volver a presentar la invitación.

## Datos, migraciones y privacidad

El historial de operaciones ya existente aporta la cuenta histórica; la nueva entidad de invitación conserva la unicidad de por vida por cliente y sucursal, la operación de origen y los estados de entrega. Las reservas son leases temporales. Los eventos únicos sostienen métricas idempotentes. La exportación de cuenta incluye invitaciones y progreso; la anonimización elimina asociaciones y progreso personales.

La secuencia acordada preserva el orden: código fuente parte de schema/migración `0021` y añade `0022`; el baseline previo del entorno de testing estaba en schema `0020` y se migró en orden `0020 → 0021 → 0022`. Nunca se renumera `0021`. La migración contempla backfill del conteo histórico sin crear invitaciones. La integración incorporó los prerrequisitos de `0021` sin habilitar notificaciones push de reseñas y preservó los overlays propios del preview. La base desplegada reporta ahora schema `0022`.

## Experiencia cliente y comercio

La configuración vive en la pantalla existente de sucursal para propietarios y administradores: habilitar, umbral, mensaje, buscar/seleccionar ubicación o usar enlace manual, vista previa, prueba del enlace y métricas. No se agregan dependencias previstas.

En cliente se revisan pendientes al entrar en primer plano a QR/tarjetas y cuando se actualizan las tarjetas existentes, sin polling. La revisión no bloquea el QR inicial. El diálogo espera a que termine la cola de celebraciones, haya cuenta correcta, app activa y ninguna otra ventana modal. Se presenta como máximo una invitación por entrada/actualización; cerrar o decir “Ahora no” la omite sin apilar otra. Una invitación reconocida localmente durante la sesión se deduplica, aunque el backend sigue siendo la autoridad.

Se difiere el intento sin conexión o si el proveedor no resuelve el destino, y se reintenta en la próxima entrada, reconexión o evento. La reserva se toma cuando la interfaz está lista. En web el enlace se abre sincrónicamente desde el gesto del usuario; en nativo usa `Linking`. Si falla la apertura, el diálogo queda disponible para reintentar. Un cambio de cuenta cancela el estado local. Notificaciones push nativas quedan fuera de alcance.

## Estado de evidencia

**Contrato:** acordado el 2026-09-28. **Fuente:** implementado en ramas feature aún no fusionadas a los `main` fuente: backend [`b16371f`](https://github.com/am-p/app-loyalty/commit/b16371f9be8bc5008262234c51fed18298f93e13) (handlers, servicios, persistencia, migración `0022`, Places y OpenAPI) y frontend [`629a27b`](https://github.com/gonzalotev/app-fidelidad/commit/629a27bc4b1ada9602fb21f78006371818b7f935). Sus PRs están en borrador: [backend #13](https://github.com/am-p/app-loyalty/pull/13) y [frontend #18](https://github.com/gonzalotev/app-fidelidad/pull/18). **Pruebas de fuente:** backend Go/PostgreSQL 16, `go vet`, race, migraciones, proveedor, HTTP, permisos y cuotas; frontend 88 unitarias, TypeScript, Expo Doctor 18/18 y escenarios de navegador. Búsqueda y detalle de Places reales desde el servidor devolvieron HTTP 200. Places API y billing están habilitados en el proyecto de testing; la clave es privada, limitada al servidor por IP (IPv4 e IPv6) y API, y su valor no se registra.

**Integración y despliegue de testing:** [PR de preview #10](https://github.com/gagonzalez1/puntazo-preview/pull/10) se fusionó a `testing` en `a6f4d50f440a07d66197257f2cddd46ea92adbb1`; el ajuste de fixtures/navegación es `d8edd8ea69125d980fec7599e9019a6cb44853e7`, actualmente en la rama remota `testing`. El runtime público de testing reportó API commit `d8edd8e`, versión `0.7.0-testing`, schema `0022` y readiness `ok`. El despliegue de `a6f4d50` terminó el 2026-09-28 16:16:04 UTC; el despliegue posterior asociado al estado actual terminó 16:19:28 UTC (deployment `swvwtefm3udx9nxjcf0zufvl`). La copia cifrada `initialpuntazo-preview-20260928T155941Z.dump.enc` se verificó antes del cambio; también se verificó la ruta de actualización `0020 → 0021 → 0022`, las versiones de migración y la salud de los servicios.

**Verificación de release:** build web desde el checkout remoto limpio `a6f4d50`, Compose, backend Go/PostgreSQL, `go vet`, TypeScript, 82 pruebas frontend de preview y Expo Doctor 18/18 pasaron; los 33 escenarios de navegador y el smoke público pasaron. Un recorrido exploratorio en navegador con el runtime verificó configuración en vivo, primera compra, diálogo disparado por SSE, apertura del enlace oficial de Google y métricas `shown=1`, `clicked=1`. La comprobación de no repetición desde un segundo dispositivo sigue pendiente, así que no se etiqueta la aceptación end-to-end como completa.

**Android/iOS:** el build nativo Android con Expo SDK 54 pasó desde `d8edd8e` y está en verificación en emulador; no se afirma todavía que el flujo de reseñas haya sido aceptado en ese emulador ni en un dispositivo físico. iOS no está verificado: Xcode requiere aceptar la licencia. No hay evidencia de prueba física para ninguna plataforma.
