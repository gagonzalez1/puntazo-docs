---
id: flow-customer-cards
title: Cliente · Tarjetas de fidelidad
group: 02 · Flujos frontend
order: 230
parent: customer-flows
level: flow
status: mock
summary: Las tarjetas pertenecen siempre al cliente mock 501 y se combinan con marcas locales.
diagram: true
codeRefs: required
---

# Cliente · Tarjetas de fidelidad

```mermaid
flowchart LR
    SCREEN["Tarjetas"] --> SERVICE["getMyLoyaltyCards"]
    SERVICE --> CLIENT["Cliente fijo 501"]
    SERVICE --> OWN["Perfil de tienda local"]
    SERVICE --> ASSOCIATED["Marcas asociadas mock"]
    CLIENT --> JOIN["Une tarjetas + apariencia"]
    OWN --> JOIN
    ASSOCIATED --> JOIN
    JOIN --> CAROUSEL["Tarjetas visibles"]

    click SERVICE href "#/data-current" "Ver estructuras mock"
    click JOIN href "#/data-target" "Ver tarjeta objetivo usuario–marca"
```

El usuario autenticado no determina las tarjetas mostradas. El ID `501` es constante hasta que exista un endpoint de tarjetas del cliente.

## Referencias de código

- [Pantalla de tarjetas](https://github.com/gonzalotev/app-fidelidad/blob/1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01/app/(tabs)/my-loyalty-cards/index.tsx#L1-L120)
- [Cliente fijo y composición local](https://github.com/gonzalotev/app-fidelidad/blob/1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01/src/features/auth/services/authService.ts#L42-L150)

## API objetivo

`GET /clientes/me/tarjetas` debe resolver la identidad desde el JWT y devolver una tarjeta por marca, con saldos compartidos entre sus sucursales.

Los movimientos devueltos conservan snapshots de marca, sucursal, programa y
beneficio relevantes al momento de operar. La edición o baja lógica posterior no
reescribe el historial (`PR-03`). La anonimización de cuenta elimina identificadores
personales operativos, pero preserva este ledger sin volver a identificar a la persona (`PR-07`).
