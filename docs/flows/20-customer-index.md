---
id: customer-flows
title: Flujos · Cliente final
group: 02 · Flujos frontend
order: 200
parent: frontend-flows
level: hub
status: current
summary: Recorridos implementados con servicios reales y límites por ambiente.
diagram: true
authority: source_code
---

# Flujos del cliente

```mermaid
flowchart LR
 HUB[Flujos del cliente] --> N0[Navegación]
 HUB[Flujos del cliente] --> N1[Pasaporte QR]
 HUB[Flujos del cliente] --> N2[Tarjetas]
 HUB[Flujos del cliente] --> N3[Perfil]
 click N0 href "#/flow-customer-navigation" "Abrir Navegación"
 click N1 href "#/flow-customer-passport" "Abrir Pasaporte QR"
 click N2 href "#/flow-customer-cards" "Abrir Tarjetas"
 click N3 href "#/flow-customer-profile" "Abrir Perfil"
```

Revisión de fuentes y runtime del **02/10/2026, 22:10 UTC**. Los SHA y las diferencias por ambiente están en [Estado observado](#/runtime-snapshot). Esta revisión describe arquitectura e integración; no certifica todos los invariantes de negocio ni ejecuta operaciones sobre cuentas reales.

- [Navegación](#/flow-customer-navigation)
- [Pasaporte QR](#/flow-customer-passport)
- [Tarjetas](#/flow-customer-cards)
- [Perfil](#/flow-customer-profile)

## Referencias de código

- [Router y navegación](https://github.com/gonzalotev/app-fidelidad/blob/main/app/(tabs)/_layout.tsx)
