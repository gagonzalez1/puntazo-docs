---
id: merchant-flows
title: Flujos · Personal del comercio
group: 02 · Flujos frontend
order: 100
parent: frontend-flows
level: hub
status: current
summary: Recorridos implementados con servicios reales y límites por ambiente.
diagram: true
authority: source_code
---

# Flujos del comercio

```mermaid
flowchart LR
 HUB[Flujos del comercio] --> N0[Navegación]
 HUB[Flujos del comercio] --> N1[Clientes]
 HUB[Flujos del comercio] --> N2[Scanner]
 HUB[Flujos del comercio] --> N3[Mi Tienda]
 HUB[Flujos del comercio] --> N4[Analíticas]
 click N0 href "#/flow-merchant-navigation" "Abrir Navegación"
 click N1 href "#/flow-merchant-customers" "Abrir Clientes"
 click N2 href "#/flow-merchant-scanner" "Abrir Scanner"
 click N3 href "#/flow-merchant-profile" "Abrir Mi Tienda"
 click N4 href "#/flow-merchant-analytics" "Abrir Analíticas"
```

Revisión de fuentes y runtime del **02/10/2026, 22:30–22:33 UTC**. Los SHA y las diferencias por ambiente están en [Estado observado](#/runtime-snapshot). Esta revisión describe arquitectura e integración; no certifica todos los invariantes de negocio ni ejecuta operaciones sobre cuentas reales.

- [Navegación](#/flow-merchant-navigation)
- [Clientes](#/flow-merchant-customers)
- [Scanner](#/flow-merchant-scanner)
- [Mi Tienda](#/flow-merchant-profile)
- [Analíticas](#/flow-merchant-analytics)

## Referencias de código

- [Router y navegación](https://github.com/gonzalotev/app-fidelidad/blob/main/app/(tabs)/_layout.tsx)
