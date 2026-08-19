---
id: backend-components
title: C4 · Componentes del backend
group: 01 · Arquitectura C4
order: 40
parent: c4-containers
level: component
status: current
summary: Router Gin, handlers, servicios, repositorio, autenticación y configuración implementados.
diagram: true
codeRefs: required
---

# C4 · Componentes del backend

```mermaid
flowchart LR
    ROUTER["Gin Router"]
    MIDDLE["Middleware\nCORS + RequireAuth"]
    HANDLER["UserHandler"]
    SERVICE["User service"]
    AUTH["JWT + Google verifier"]
    REPO["User repository"]
    DB[("PostgreSQL")]

    ROUTER --> MIDDLE
    ROUTER --> HANDLER
    HANDLER --> SERVICE
    HANDLER --> AUTH
    SERVICE --> AUTH
    SERVICE --> REPO
    REPO --> DB

    click HANDLER href "#/sequence-register" "Ver secuencia de registro"
    click AUTH href "#/sequence-google" "Ver Google Auth"
    click DB href "#/data-current" "Ver tabla users"
```

## Referencias de código

- [Composición y rutas](https://github.com/am-p/app-loyalty/blob/f03b9aa202587510508a6f2a094b808f5ed6353d/cmd/server/main.go#L18-L51)
- [Handlers HTTP](https://github.com/am-p/app-loyalty/blob/f03b9aa202587510508a6f2a094b808f5ed6353d/internal/handler/user.go#L19-L170)
- [Repositorio SQL](https://github.com/am-p/app-loyalty/blob/f03b9aa202587510508a6f2a094b808f5ed6353d/internal/repository/user.go#L10-L58)

El diseño todavía no implementado de dominios, permisos y persistencia se mantiene
separado en el [índice de revisión del backend](#/backend-review-index).
