---
id: flow-plan-selection
title: Frontend · Selección de plan
group: 02 · Flujos frontend
order: 20
parent: flow-auth
level: flow
status: mock
summary: La selección de Gratis, Sellos o Puntos modifica Zustand y el perfil mock, sin persistencia backend.
diagram: true
codeRefs: required
---

# Frontend · Selección de plan

```mermaid
flowchart LR
    USER["Usuario elige plan"] --> SCREEN["subscription.tsx"]
    SCREEN --> STORE["subscribe(plan)"]
    STORE --> ROLE["Asigna rol local\nCLIENTE_FINAL o TIENDA"]
    STORE --> SUB["Crea suscripción local"]
    STORE --> PROFILE["Cambia beneficio mock"]
    ROLE --> TABS["Tabs según GRATIS / comercio"]
    SUB --> TABS

    click TABS href "#/flow-merchant-navigation" "Ver navegación comercio"
    click TABS href "#/flow-customer-navigation" "Ver navegación cliente"
```

No existe hoy un `POST` de suscripción. Tampoco se envía al backend si el registro corresponde a cliente final o personal de marca. Ésta es una diferencia deliberadamente visible con el contrato objetivo.

## Referencias de código

- [Pantalla y opciones de plan](https://github.com/gonzalotev/app-fidelidad/blob/99a350bd6e204a1f866d78dcfb20bd9bc108ffda/app/(auth)/subscription.tsx#L10-L114)
- [Suscripción local y cambio de rol](https://github.com/gonzalotev/app-fidelidad/blob/99a350bd6e204a1f866d78dcfb20bd9bc108ffda/src/features/auth/store/useAuthStore.ts#L66-L98)

## Contrato objetivo

En el spec `v1.4-draft`, el tipo de cuenta se declara al registrar; un cliente final no contrata una suscripción. La marca se crea en un paso posterior y Backoffice administra su suscripción por sucursales.
