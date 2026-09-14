---
id: sequence-invitation
title: Secuencia objetivo · Invitación de personal
group: 03 · Secuencias
order: 60
parent: sequences
level: sequence
status: target
authority: agreed
summary: Invitación de un uso, ligada al email, revocable y vigente durante 72 horas.
diagram: true
codeRefs: optional
---

# Secuencia objetivo · Invitación de personal

```mermaid
sequenceDiagram
    actor A as Propietario/Administrador
    participant API as API /v1
    participant DB as PostgreSQL
    actor I as Persona invitada
    A->>API: crear(email, rol, sucursales)
    API->>DB: invalidar pendiente previa + guardar token_hash y expires_at +72h
    API-->>A: invitación sin token plano
    I->>API: consultar token
    API-->>I: marca, email enmascarado, rol y vencimiento
    I->>API: aceptar con sesión del mismo email
    API->>DB: crear membresía/asignaciones y consumir token atómicamente
    API-->>I: membresía activa
```

`PR-05` aprueba los roles y el vencimiento. Reenvío revoca el token anterior;
vencida, revocada, reutilizada o con email distinto responde conflicto sin crear
permisos. Esta secuencia sigue `target` hasta contar con implementación y pruebas.
