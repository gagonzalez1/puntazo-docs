---
id: flow-merchant-navigation
title: Comercio · Navegación
group: 02 · Flujos frontend
order: 110
parent: merchant-flows
level: flow
status: mock
summary: El plan comercial habilita Clientes, Estadísticas, Scanner y Mi Tienda.
diagram: true
codeRefs: required
---

# Comercio · Navegación

```mermaid
flowchart LR
    SESSION["Usuario con suscripción activa"] --> CHECK{"plan = GRATIS?"}
    CHECK -->|"No"| CUSTOMER["Clientes"]
    CHECK -->|"No"| ANALYTICS["Estadísticas"]
    CHECK -->|"No"| SCAN["Scanner"]
    CHECK -->|"No"| PROFILE["Mi Tienda"]
    CHECK -->|"Sí"| CLIENT["Tabs cliente final"]

    click CUSTOMER href "#/flow-merchant-customers" "Abrir Clientes"
    click ANALYTICS href "#/flow-merchant-analytics" "Abrir Estadísticas"
    click SCAN href "#/flow-merchant-scanner" "Abrir Scanner"
    click PROFILE href "#/flow-merchant-profile" "Abrir Mi Tienda"
    click CLIENT href "#/flow-customer-navigation" "Abrir navegación cliente"
```

El guard se basa en `suscripcion.plan`, no en el rol ni en una membresía a marca. Esto funciona para el prototipo, pero no representa varias marcas, sucursales o permisos internos.

## Referencias de código

- [Guard y visibilidad de tabs](https://github.com/gonzalotev/app-fidelidad/blob/99a350bd6e204a1f866d78dcfb20bd9bc108ffda/app/(tabs)/_layout.tsx#L17-L141)
