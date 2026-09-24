---
id: flow-customer-profile
title: Cliente · Perfil
group: 02 · Flujos frontend
order: 240
parent: customer-flows
level: flow
status: mixed
summary: Lee identidad real desde GET /me y completa alias, foto y fechas con valores derivados.
diagram: true
codeRefs: required
---

# Cliente · Perfil

```mermaid
flowchart LR
    SCREEN["Mi Perfil"] --> SERVICE["getMyProfile"]
    SERVICE --> ME["GET /me real"]
    ME --> MAP["clienteFromUsuario"]
    MAP --> REAL["id, email, nombre"]
    MAP --> DERIVED["apellido, alias, QR"]
    MAP --> EMPTY["foto y fecha vacías"]
    REAL --> VIEW["Perfil visible"]
    DERIVED --> VIEW
    EMPTY --> VIEW

    click ME href "#/backend-components" "Ver backend"
    click MAP href "#/implementation-gaps" "Ver campos pendientes"
```

La lectura básica está conectada. La edición completa y los campos específicos de cliente aún no tienen contrato persistente.

## Referencias de código

- [Pantalla Mi Perfil](https://github.com/gonzalotev/app-fidelidad/blob/main/app/(tabs)/my-profile/index.tsx#L1-L140)
- [Mapeo híbrido desde usuario](https://github.com/gonzalotev/app-fidelidad/blob/main/src/features/auth/services/authService.ts#L46-L62)
