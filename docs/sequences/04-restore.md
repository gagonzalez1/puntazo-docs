---
id: sequence-restore
title: Secuencia · Restaurar sesión
group: 03 · Secuencias
order: 40
parent: sequences
level: sequence
status: current
summary: Al abrir la app, recupera el JWT local y consulta GET /me protegido.
diagram: true
codeRefs: required
---

# Secuencia · Restaurar sesión

```mermaid
sequenceDiagram
    participant ROOT as Root layout
    participant STORE as useAuthStore
    participant TOKEN as SecureStore/localStorage
    participant API as GET /me
    participant AUTH as RequireAuth
    ROOT->>STORE: restoreSession()
    STORE->>TOKEN: get()
    alt no hay token
      STORE->>STORE: isRestoring = false
    else token presente
      STORE->>API: Authorization Bearer
      API->>AUTH: ParseToken
      AUTH-->>API: userID + rol
      API-->>STORE: usuario
      STORE->>STORE: set usuario
    end
    opt token inválido o vencido
      STORE->>TOKEN: clear()
    end
```

La llamada se dispara en el layout raíz. El layout de tabs decide redirecciones por `usuario` y `suscripcion`; conviene mantener visible este acoplamiento al diagnosticar saltos de navegación al inicio.

## Referencias de código

- [Disparo de restauración](https://github.com/gonzalotev/app-fidelidad/blob/main/app/_layout.tsx#L48-L51)
- [Restauración y descarte de token](https://github.com/gonzalotev/app-fidelidad/blob/main/src/features/auth/store/useAuthStore.ts#L50-L65)
- [Middleware de autenticación](https://github.com/am-p/app-loyalty/blob/main/internal/middleware/auth.go#L12-L34)
