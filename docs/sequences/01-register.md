---
id: sequence-register
title: Secuencia · Registro por email
group: 03 · Secuencias
order: 10
parent: sequences
level: sequence
status: current
summary: Registro conectado de punta a punta, con rol CLIENTE_FINAL fijo en el backend actual.
diagram: true
codeRefs: required
---

# Secuencia · Registro por email

```mermaid
sequenceDiagram
    actor U as Usuario
    participant UI as Pantalla auth
    participant S as useAuthStore
    participant API as API Go
    participant DB as PostgreSQL
    U->>UI: nombre, email, password
    UI->>S: register(...)
    S->>API: POST /auth/register
    API->>API: valida + bcrypt
    API->>DB: INSERT users rol CLIENTE_FINAL
    DB-->>API: id_usuario
    API->>API: firma JWT 24 h
    API-->>S: 201 {token, usuario}
    S->>S: guarda token + usuario
    S-->>UI: usuario
    UI->>UI: navega a subscription
```

El request sólo admite nombre, email y contraseña. El backend asigna `CLIENTE_FINAL`; por eso todavía no implementa el alta separada de `PERSONAL_MARCA` definida en el spec.

## Referencias de código

- [Pantalla de autenticación](https://github.com/gonzalotev/app-fidelidad/blob/99a350bd6e204a1f866d78dcfb20bd9bc108ffda/app/(auth)/index.tsx#L31-L76)
- [Handler RegisterUser](https://github.com/am-p/app-loyalty/blob/f03b9aa202587510508a6f2a094b808f5ed6353d/internal/handler/user.go#L23-L70)
- [Hash y creación de usuario](https://github.com/am-p/app-loyalty/blob/f03b9aa202587510508a6f2a094b808f5ed6353d/internal/service/user.go#L19-L38)
