---
id: flow-customer-passport
title: Cliente · Pasaporte QR
group: 02 · Flujos frontend
order: 220
parent: customer-flows
level: flow
status: mixed
summary: La identidad llega desde GET /me, pero el QR se deriva de un patrón predecible.
diagram: true
codeRefs: required
---

# Cliente · Pasaporte QR

```mermaid
flowchart LR
    SCREEN["Mi Tarjeta"] --> QUERY["getMyProfile"]
    QUERY --> ME["GET /me real"]
    ME --> USER["Usuario autenticado"]
    USER --> MAP["clienteFromUsuario"]
    MAP --> TOKEN["QR_USER_id"]
    TOKEN --> QR["QR visible"]

    click ME href "#/sequence-restore" "Ver sesión y GET /me"
    click TOKEN href "#/implementation-gaps" "Ver brecha de QR"
```

El QR no es todavía un token opaco emitido por backend. Por ser derivable desde el ID del usuario, sólo sirve para el prototipo y no debe utilizarse como credencial de autorización.

## Referencias de código

- [Pantalla Mi Tarjeta](https://github.com/gonzalotev/app-fidelidad/blob/afec4792729b48de4646168846ab221c96352f51/app/(tabs)/my-card/index.tsx#L10-L50)
- [Derivación del perfil y QR](https://github.com/gonzalotev/app-fidelidad/blob/afec4792729b48de4646168846ab221c96352f51/src/features/auth/services/authService.ts#L46-L62)
- [Lectura real de usuario](https://github.com/gonzalotev/app-fidelidad/blob/afec4792729b48de4646168846ab221c96352f51/src/features/auth/services/authService.ts#L107-L121)
