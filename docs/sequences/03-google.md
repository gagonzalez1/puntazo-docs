---
id: sequence-google
title: Secuencia · Acceso con Google
group: 03 · Secuencias
order: 30
parent: sequences
level: sequence
status: current
summary: Google ID token, validación backend y sesión propia con tipo de cuenta.
diagram: true
codeRefs: required
authority: source_code
---

# Acceso con Google

```mermaid
sequenceDiagram
 participant F as Frontend
 participant G as Google
 participant A as API
 participant P as PostgreSQL
 F->>G: Obtener ID token
 G-->>F: ID token
 F->>A: POST /v1/auth/google y opciones de alta
 A->>G: Validar identidad y audiencia
 A->>P: Resolver cuenta o alta según reglas
 A->>P: Persistir sesión
 A-->>F: Sesión propia y resultado de cuenta
 F->>A: GET /v1/me y marcas si corresponden
```

La API distingue cuenta existente y alta, incluidos datos comerciales cuando el flujo los requiere. Los fallbacks legacy no aceptan degradar una selección de tipo/alta comercial a un contrato que no la soporta. No se probó una autenticación Google real durante este corte.

Revisión de fuentes y runtime del **02/10/2026, 22:30–22:33 UTC**. Los SHA y las diferencias por ambiente están en [Estado observado](#/runtime-snapshot). Esta revisión describe arquitectura e integración; no certifica todos los invariantes de negocio ni ejecuta operaciones sobre cuentas reales.

## Referencias de código

- [Implementación backend](https://github.com/am-p/app-loyalty/blob/main/internal/service/auth.go)
- [Servicio frontend](https://github.com/gonzalotev/app-fidelidad/blob/main/src/features/demo/services/demoService.ts)
- [Cliente y refresh](https://github.com/gonzalotev/app-fidelidad/blob/main/src/core/api/client.ts)
