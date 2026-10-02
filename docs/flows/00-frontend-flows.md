---
id: frontend-flows
title: Flujos del frontend
group: 02 · Flujos frontend
order: 0
parent: overview
level: hub
status: current
summary: Recorridos implementados con servicios reales y límites por ambiente.
diagram: true
authority: source_code
---

# Flujos del frontend

```mermaid
flowchart LR
 HUB[Flujos del frontend] --> N0[Autenticación]
 HUB[Flujos del frontend] --> N1[Programa y suscripción]
 HUB[Flujos del frontend] --> N2[Comercio]
 HUB[Flujos del frontend] --> N3[Cliente]
 click N0 href "#/flow-auth" "Abrir Autenticación"
 click N1 href "#/flow-plan-selection" "Abrir Programa y suscripción"
 click N2 href "#/merchant-flows" "Abrir Comercio"
 click N3 href "#/customer-flows" "Abrir Cliente"
```

Revisión de fuentes y runtime del **02/10/2026, 22:30–22:33 UTC**. Los SHA y las diferencias por ambiente están en [Estado observado](#/runtime-snapshot). Esta revisión describe arquitectura e integración; no certifica todos los invariantes de negocio ni ejecuta operaciones sobre cuentas reales.

- [Autenticación](#/flow-auth)
- [Programa y suscripción](#/flow-plan-selection)
- [Comercio](#/merchant-flows)
- [Cliente](#/customer-flows)

## Referencias de código

- [Router y navegación](https://github.com/gonzalotev/app-fidelidad/blob/main/app/(tabs)/_layout.tsx)
