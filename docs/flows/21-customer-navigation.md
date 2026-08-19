---
id: flow-customer-navigation
title: Cliente · Navegación
group: 02 · Flujos frontend
order: 210
parent: customer-flows
level: flow
status: mixed
summary: El plan GRATIS habilita Mi Tarjeta, Tarjetas y Mi Perfil.
diagram: true
codeRefs: required
---

# Cliente · Navegación

```mermaid
flowchart LR
    SESSION["Usuario con suscripción local GRATIS"] --> QR["Mi Tarjeta"]
    SESSION --> CARDS["Tarjetas"]
    SESSION --> PROFILE["Mi Perfil"]

    click QR href "#/flow-customer-passport" "Abrir pasaporte QR"
    click CARDS href "#/flow-customer-cards" "Abrir tarjetas"
    click PROFILE href "#/flow-customer-profile" "Abrir perfil"
```

La navegación funciona, aunque el guard depende de una suscripción `GRATIS` creada localmente. En el modelo objetivo el cliente final es gratuito y no tiene suscripción.

## Referencias de código

- [Tabs y criterio de plan](https://github.com/gonzalotev/app-fidelidad/blob/99a350bd6e204a1f866d78dcfb20bd9bc108ffda/app/(tabs)/_layout.tsx#L17-L141)
