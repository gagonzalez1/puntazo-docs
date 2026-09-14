---
id: sequence-login
title: Secuencia · Login por email
group: 03 · Secuencias
order: 20
parent: sequences
level: sequence
status: current
summary: Verificación bcrypt, emisión de JWT y persistencia local de la sesión.
diagram: true
codeRefs: required
---

# Secuencia · Login por email

```mermaid
sequenceDiagram
    actor U as Usuario
    participant UI as Pantalla auth
    participant S as authService
    participant API as API Go
    participant DB as PostgreSQL
    U->>UI: email + password
    UI->>S: login(payload)
    S->>API: POST /auth/login
    API->>DB: SELECT user por email
    DB-->>API: usuario + password_hash
    API->>API: bcrypt Compare
    API->>API: firma JWT
    API-->>S: 200 {token, usuario}
    S->>S: tokenStorage.set(token)
    S-->>UI: usuario mapeado
```

Los fallos de credenciales se normalizan como `401`. Una cuenta creada sólo con Google no puede ingresar con contraseña hasta que exista un flujo explícito para definirla.

## Referencias de código

- [Cliente auth del frontend](https://github.com/gonzalotev/app-fidelidad/blob/1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01/src/features/auth/services/authService.ts#L82-L106)
- [Login handler](https://github.com/gagonzalez1/app-loyalty/blob/50e95e9407ee5ffaccfc3cebcbef464d24f26427/internal/handler/user.go#L72-L111)
- [Verificación bcrypt](https://github.com/gagonzalez1/app-loyalty/blob/50e95e9407ee5ffaccfc3cebcbef464d24f26427/internal/service/user.go#L40-L58)
