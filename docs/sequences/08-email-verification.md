---
id: sequence-email-verification
title: Secuencia · Verificación de email
group: 03 · Secuencias
order: 80
parent: sequences
level: sequence
status: target
authority: agreed
summary: Contrato objetivo anti-enumeración con token hasheado, de un uso y vigencia de 24 horas.
diagram: true
codeRefs: optional
---

# Secuencia · Verificación de email

> **APROBADA `PR-09`; `NOT_IMPLEMENTED`.** Requiere proveedor de correo operativo
> antes de producción y evidencia de entrega, expiración y consumo único.

```mermaid
sequenceDiagram
    actor U as Usuario
    participant APP as App Puntazo
    participant API as API Go
    participant DB as PostgreSQL
    participant MAIL as Proveedor de email
    U->>APP: solicitar verificación
    APP->>API: POST /auth/email-verification/request {email}
    API-->>APP: 202 genérico
    alt cuenta existente no verificada
      API->>DB: guardar hash + vencimiento 24 h
      API->>MAIL: enviar enlace con secreto
    end
    U->>APP: abrir enlace
    APP->>API: POST /auth/email-verification/confirm {token}
    API->>DB: consumir token y marcar email verificado
    API-->>APP: 200 {verified:true, request_id}
```

La respuesta de solicitud y su latencia observable no deben revelar si el email
existe o ya estaba verificado. El secreto sólo aparece en el mensaje; base y logs
conservan su hash. Reuso, vencimiento o token inválido devuelven un error genérico.
