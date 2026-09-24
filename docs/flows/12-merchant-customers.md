---
id: flow-merchant-customers
title: Comercio · Clientes
group: 02 · Flujos frontend
order: 120
parent: merchant-flows
level: flow
status: mock
summary: Listado, búsqueda y acciones visuales sobre tarjetas cargadas desde arrays locales.
diagram: true
codeRefs: required
---

# Comercio · Clientes

```mermaid
flowchart LR
    SCREEN["Pantalla Clientes"] --> QUERY["useStoreCustomers(1)"]
    QUERY --> SERVICE["loyaltyService"]
    SERVICE --> CARDS["mockCards"]
    SERVICE --> PEOPLE["mockCustomers"]
    CARDS --> JOIN["Une tarjeta + cliente"]
    PEOPLE --> JOIN
    JOIN --> LIST["Lista buscable"]
    LIST --> ACTIONS["Ver / agregar / canjear\nUI sin contrato persistido"]

    click SERVICE href "#/data-current" "Ver datos actuales"
    click ACTIONS href "#/integration-matrix" "Ver matriz de integración"
```

La tienda está fijada a `id_tienda = 1`; los filtros y los cambios sólo afectan la experiencia local.

## Referencias de código

- [Pantalla de clientes](https://github.com/gonzalotev/app-fidelidad/blob/main/app/(tabs)/customers/index.tsx#L78-L155)
- [Join sobre mocks](https://github.com/gonzalotev/app-fidelidad/blob/main/src/features/loyalty/services/loyaltyService.ts#L87-L99)

## API objetivo

`GET /marcas/{id_marca}/clientes` deberá devolver tarjetas y saldos consolidados de la marca, con autorización por membresía.
