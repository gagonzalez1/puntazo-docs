---
id: sequence-account-anonymization
title: Secuencia objetivo · Anonimización de cuenta
group: 03 · Secuencias
order: 70
parent: sequences
level: sequence
status: target
authority: agreed
summary: Revoca acceso y anonimiza identidad sin romper el ledger histórico.
diagram: true
codeRefs: optional
---

# Secuencia objetivo · Anonimización de cuenta

```mermaid
sequenceDiagram
    actor U as Persona autenticada
    participant API as API /v1
    participant DB as PostgreSQL
    participant OBJ as Storage privado
    U->>API: DELETE /me + If-Match + confirmación
    API->>DB: bloquear cuenta y validar dependencias
    API->>DB: revocar sesiones e invitaciones
    API->>DB: sustituir identificadores personales por valores irreversibles
    API->>OBJ: programar eliminación de media personal desvinculada
    API->>DB: conservar movimientos y snapshots sin identificadores directos
    API-->>U: 202 + id_solicitud
```

La implementación debe ser idempotente, auditable y verificable. Los plazos de
retención, excepciones legales y texto público continúan pendientes de revisión
profesional; `PR-07` no autoriza prometer borrado absoluto del ledger.
