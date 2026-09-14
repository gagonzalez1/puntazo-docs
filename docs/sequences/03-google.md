---
id: sequence-google
title: Secuencia · Acceso con Google
group: 03 · Secuencias
order: 30
parent: sequences
level: sequence
status: current
summary: Verifica el ID token, enlaza por email o crea un usuario y devuelve un JWT propio.
diagram: true
codeRefs: required
---

# Secuencia · Acceso con Google

```mermaid
sequenceDiagram
    actor U as Usuario
    participant APP as App Expo
    participant API as API Go
    participant G as Google Identity
    participant DB as PostgreSQL
    U->>APP: continuar con Google
    APP->>API: POST /auth/google {id_token}
    API->>G: validar token + audience
    G-->>API: sub, email verificado, nombre
    API->>DB: buscar por google_id
    alt ya vinculado
      DB-->>API: usuario
    else existe el email
      API->>DB: vincular google_id
    else usuario nuevo
      API->>DB: INSERT sin password_hash
    end
    API-->>APP: {token, usuario}
```

La vinculación prioriza `google_id`, luego email. El usuario nuevo recibe también el rol fijo `CLIENTE_FINAL`.

En el objetivo aprobado `PR-09`, el backend rechaza el alta o enlace si el ID token
no confirma `email_verified=true`. Cuando sí lo confirma, registra la identidad local
como verificada. Esta regla permanece `NOT_IMPLEMENTED` hasta contar con código y pruebas.

## Referencias de código

- [Endpoint frontend Google](https://github.com/gonzalotev/app-fidelidad/blob/1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01/src/features/auth/services/authService.ts#L96-L105)
- [Orquestación Google en servicio](https://github.com/am-p/app-loyalty/blob/b87b00ce41d94b4cc719934fc3cc1a8ff18803c1/internal/service/user.go#L60-L95)
- [Validación de ID token](https://github.com/am-p/app-loyalty/blob/b87b00ce41d94b4cc719934fc3cc1a8ff18803c1/internal/auth/google.go#L13-L37)
