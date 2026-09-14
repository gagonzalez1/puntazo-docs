---
id: integration-matrix
title: Datos · Matriz pantalla–API
group: 04 · Datos
order: 30
parent: data-current
level: integration
status: current
authority: source_code
summary: Cobertura real de pantallas y servicios frontend contra el backend versionado en la release gratuita.
diagram: true
codeRefs: required
---
# Datos · Matriz pantalla–API

```mermaid
flowchart LR
    AUTH["Auth y cuenta"] -->|"real"| AUTHAPI["/v1/auth/* + /v1/me"]
    COMMERCIAL["Marca, sucursales,
programa y beneficios"] -->|"real"| BRANDAPI["/v1/marcas/*"]
    STAFF["Personal e invitaciones"] -->|"real"| STAFFAPI["/v1/marcas/{id}/personal + /v1/invitaciones"]
    CUSTOMERS["Clientes y tarjetas"] -->|"real"| CUSTOMERAPI["/v1/clientes/*"]
    SCAN["Scanner y movimientos"] -->|"real"| MOVEAPI["/v1/movimientos/*"]
    ANALYTICS["Resumen operativo"] -->|"real"| METRICAPI["/v1/marcas/{id}/metricas/resumen"]
    MEDIA["Imágenes privadas"] -->|"real"| MEDIAAPI["/v1/marcas/{id}/imagenes"]

    click AUTH href "#/flow-auth" "Ver autenticación"
    click COMMERCIAL href "#/flow-merchant-profile" "Ver configuración comercial"
    click STAFF href "#/merchant-flows" "Ver personal"
    click CUSTOMERS href "#/flow-merchant-customers" "Ver clientes"
    click SCAN href "#/flow-merchant-scanner" "Ver scanner"
    click ANALYTICS href "#/flow-merchant-analytics" "Ver analíticas"
```

| Pantalla/flujo | Frontend en el commit fijado | Backend y transporte | Estado |
|---|---|---|---|
| Registro de cliente | `demoService` llama `POST /v1/auth/register` | Cuenta cliente; puede responder `verification_required: true` sin sesión | Implementado |
| Alta comercial gratuita | `demoService` llama `POST /v1/demo/comercios` con UUID de idempotencia | Código de acceso, `program_type`, marca, sucursal, programa y propietario; onboarding queda incompleto hasta el primer beneficio | Implementado |
| Login, Google y sesión | `authService`, store y cliente HTTP | `/auth/login`, `/auth/google`, refresh rotativo y logout; cookie web o SecureStore native | Implementado |
| Verificación y reset | Pantallas dedicadas y estados anti-enumeración | Requests `202`, confirmaciones one-use; reset revoca sesiones | Implementado |
| Restauración y perfil | `GET/PATCH /v1/me`, exportación y baja | `If-Match`, ETag fuerte, `GET /me/export`, `DELETE /me` con `ANONIMIZAR` y recent auth | Implementado |
| Marca, sucursales y programa | Servicios y editores comerciales | CRUD versionado; `PROPIETARIO`/ `ADMINISTRADOR` con alcance de marca; tipo de programa bloqueado cuando corresponde | Implementado |
| Beneficios | Editor y servicio de beneficios | Crear/listar/consultar/put/patch/delete; baja lógica; requisito 1..10.000.000 | Implementado |
| Personal | Sección de personal y servicios de invitación | Recursos se identifican por `membership_id`; `ADMINISTRADOR` global, `OPERADOR` sólo en `branch_ids`; invitaciones UUID, un uso, 72 h | Implementado |
| Aceptar invitación | Deep link y pantalla de aceptación | Email exacto de sesión; `ACCOUNT_MODE_CONFLICT` si la cuenta cliente tiene datos no vacíos; evita conversión destructiva | Implementado |
| Clientes del comercio | Query de clientes, paginación y búsqueda | `GET /v1/marcas/{brand_id}/clientes`; sólo datos autorizados, nunca QR | Implementado |
| Tarjetas y pasaporte | Pantallas de cliente y queries | `GET /v1/clientes/me`, tarjetas y movimientos propios | Implementado |
| Scanner | Cámara/entrada manual, preview y confirmación | Preview no muta; `cantidad_puntos` sólo preview; confirmación consume snapshot; UUID idempotente | Implementado |
| Analíticas | Query y estados de error/reintento | Resumen histórico real; períodos, comparaciones y drill-down permanecen fuera del contrato | Implementado con alcance acotado |
| Imágenes marca/beneficio | Picker seguro, multipart y URL refresh | S3 privado; WebP se decodifica y re-encodea JPEG/PNG; logo/icono se reducen a 1024/512; respuesta 201 puede omitir URL tras presign fallido | Implementado |
| PWA | Export, proxy same-origin, CSP y service worker | API se consume mediante `/api`; mutaciones no se cachean; harness Playwright disponible | Implementado; prueba en dominio de staging pendiente |
| iOS/Android | Configuración Expo e IDs de aplicación | Identificador nativo `com.puntazo.app` | Configurado; QA físico/publicación pendiente |

## Límites que siguen visibles

- El código fuente y las pruebas fijadas cubren la integración frontend/backend, pero
  no equivalen a una validación de proveedor: SMTP, Redis administrado, S3 real,
  backups/restore, proxy HTTPS y monitoreo deben homologarse en staging.
- No se implementan billing, suscripciones pagas, POS/comprobantes, analíticas por
  período, predicciones, drill-down ni backoffice. No deben agregarse como si fueran
  rutas activas.
- La API conserva nombres de transporte existentes (`operation`, `branch_id`,
  `benefit_id`); el frontend no reenvía `cantidad_puntos` en la confirmación.
- Las URLs de media son efímeras. Si faltan por un presign transitorio, la pantalla
  comunica que el recurso se guardó y ofrece reintentar el listado.
- QA físico de cámara, instalación PWA, iOS y Android sigue siendo un gate pendiente
  del checklist de entrega.

## Referencias fijadas

- [Servicios de onboarding y auth](https://github.com/gonzalotev/app-fidelidad/blob/1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01/src/features/demo/services/demoService.ts)
- [Servicios de comercio y personal](https://github.com/gonzalotev/app-fidelidad/blob/1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01/src/features/merchant/services/personnelService.ts)
- [Servicio de media](https://github.com/gonzalotev/app-fidelidad/blob/1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01/src/features/merchant/services/mediaService.ts)
- [Contrato OpenAPI implementado](https://github.com/am-p/app-loyalty/blob/b87b00ce41d94b4cc719934fc3cc1a8ff18803c1/openapi.yaml)
