---
id: sequence-password-reset
title: Secuencia · Recuperación de contraseña
group: 03 · Secuencias
order: 90
parent: sequences
level: sequence
status: target
authority: agreed
summary: Contrato objetivo anti-enumeración con token hasheado de una hora y revocación de sesiones.
diagram: true
codeRefs: optional
---

# Secuencia · Recuperación de contraseña

> **APROBADA `PR-09`; `NOT_IMPLEMENTED`.** Requiere proveedor de correo operativo
> antes de producción y pruebas de expiración, reuso y revocación completa.

```mermaid
sequenceDiagram
    actor U as Usuario
    participant APP as App Puntazo
    participant API as API Go
    participant DB as PostgreSQL
    participant MAIL as Proveedor de email
    U->>APP: olvidé mi contraseña
    APP->>API: POST /auth/password-reset/request {email}
    API-->>APP: 202 genérico
    alt cuenta elegible existente
      API->>DB: guardar hash + vencimiento 1 h
      API->>MAIL: enviar enlace con secreto
    end
    U->>APP: definir nueva contraseña
    APP->>API: POST /auth/password-reset/confirm {token,new_password}
    API->>DB: consumir token + cambiar hash de contraseña
    API->>DB: revocar todas las sesiones
    API-->>APP: 200 {password_reset:true,sessions_revoked:true,request_id}
```

La solicitud no revela existencia, método de acceso ni estado de la cuenta. El
secreto no se persiste ni se registra en claro. Confirmar no entrega una sesión:
la persona vuelve a autenticarse con la nueva contraseña.
