---
id: customer-flows
title: Flujos · Cliente final
group: 02 · Flujos frontend
order: 200
parent: frontend-flows
level: hub
status: mixed
summary: Pasaporte QR, tarjetas de fidelidad y perfil del cliente final.
diagram: true
---

# Flujos · Cliente final

```mermaid
flowchart LR
    QR["Mi Tarjeta / QR"]
    CARDS["Tarjetas"]
    PROFILE["Mi Perfil"]

    click QR href "#/flow-customer-passport" "Abrir QR"
    click CARDS href "#/flow-customer-cards" "Abrir tarjetas"
    click PROFILE href "#/flow-customer-profile" "Abrir perfil"
```
