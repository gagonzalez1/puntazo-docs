---
id: backend-api-contract
title: Backend · Contrato API propuesto
group: 03 · Backend objetivo
order: 20
parent: backend-review-index
level: api
status: target
authority: proposal_codex
summary: Mapa de dominios, convenciones HTTP y operaciones formalizadas en OpenAPI.
diagram: true
codeRefs: optional
---

# Backend · Contrato API propuesto

> **Alcance del 02/10/2026:** este diseño conserva sus acuerdos y propuestas originales. La implementación evolucionó: consultar [datos actuales](#/data-current), [integración real](#/integration-matrix) y [estado observado](#/runtime-snapshot). La coincidencia con código no aprueba automáticamente una decisión `PC-xx` ni convierte todo el spec/OpenAPI en contrato desplegado.


> **PROPUESTA CODEX `PC-02` a `PC-08`, `PC-12` a `PC-14`.** El archivo
> [`openapi.yaml`](/openapi.yaml) es el contrato formal de transporte y debe revisarse
> antes de generar handlers o SDK.

```mermaid
flowchart TB
  API["Puntazo API /v1"] --> AU["Auth y cuenta"]
  API --> MA["Marcas, sucursales y personal"]
  API --> LO["Programas, beneficios y tarjetas"]
  API --> MO["Preview, scan, canje y ajustes"]
  API --> SU["Suscripciones"]
  API --> AN["Analíticas"]
  API --> BO["Backoffice y auditoría"]
  MO --> DB["Transacción + idempotencia"]
  SU --> DB
  BO --> DB
  click DB href "#/backend-database-physical" "Abrir diseño físico"
```

## Convenciones propuestas

- Base URL: `/v1`.
- Recurso individual: `{ "data": {...}, "request_id": "..." }`.
- Colección: agrega `pagination` con `page`, `page_size`, `total_items` y `total_pages`.
- Error: `code`, `message`, `details` y `request_id`.
- Mutaciones concurrentes: `If-Match` y respuesta `412 PRECONDITION_FAILED`.
- Scan, canje, ajustes y suscripciones: header `Idempotency-Key` UUID obligatorio.
- Paginación MVP: página 1, tamaño 20 por defecto y máximo 100.
- Un recurso de otra marca responde `404` para no revelar su existencia.

## Contratos de mayor riesgo

| Operación | Request determinante | Resultado |
|---|---|---|
| `POST /movimientos/preview` | QR, sucursal, operación, importe o beneficio | Cálculo temporal sin mutar saldo |
| `POST /movimientos/scan` | `preview_id`, QR, sucursal, centavos y moneda | Movimiento `CREDITO` y saldo posterior |
| `POST /movimientos/canje` | `preview_id`, QR, sucursal y beneficio | Movimiento `DEBITO` y remanente |
| `POST /backoffice/.../suscripciones` | plan, sucursales, inicio y motivo | Suscripción y snapshots de precio |
| `PATCH /backoffice/suscripciones/{id}` | acción discriminada y motivo | Cambio inmediato o programado |
| `POST /marcas/{id}/invitaciones` | email, rol y sucursales | Invitación de un solo uso |

## Contrato de identidad Google observado en la remediación

El siguiente contrato fue acordado e implementado en el candidato backend de testing; su presencia en fuente/integración no certifica aún el runtime, cuyo job está en cola. El login Google no vincula automáticamente por email. Una colisión requiere vinculación explícita y devuelve `409 GOOGLE_LINK_REQUIRED` o `409 GOOGLE_IDENTITY_CONFLICT`; no se reasigna un `sub` ya vinculado.

- `POST /v1/auth/google/link`, autenticado: `{ "id_token": "…", "password": "…" }` → `AuthData`.
- `POST /v1/auth/reauthenticate`, autenticado: `{ "password": "…" }` o `{ "id_token": "…" }`; en el segundo caso el `sub` debe ser el mismo ya vinculado → `AuthData`.

Este trabajo no añade recuperación, reclamación ni reparación de cuentas históricas. Consultar [plan de remediación](#/stress-remediation-plan) para estados y límites de aceptación.

## Autorización propuesta

- `PROPIETARIO`: configuración total de su marca y personal.
- `ADMINISTRADOR`: configuración, sucursales y personal, salvo convertir propietarios.
- `OPERADOR`: scan/canje sólo en sucursales asignadas.
- `SOPORTE`: lectura y ajustes con motivo; no factura.
- `FINANZAS`: suscripciones; no ajusta saldos.
- `ADMIN_SISTEMA`: planes y operación interna completa, siempre auditada.

El cliente final sólo accede a `/clientes/me` y a sus propias tarjetas y movimientos.
