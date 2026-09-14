---
id: backend-components
title: C4 · Componentes del backend
group: 01 · Arquitectura C4
order: 40
parent: c4-containers
level: component
status: current
summary: Router Gin, handlers, servicios, repositorios, storage, mailer y mantenimiento implementados.
diagram: true
codeRefs: required
---
# C4 · Componentes del backend

```mermaid
flowchart LR
    ROUTER["Gin Router"]
    MIDDLE["Request context
CORS + timeout + recovery + auth"]
    HANDLER["Handlers por dominio"]
    SERVICE["Servicios
identidad, comercial, staff, media, movimientos"]
    REPO["Repositorios SQL
cuenta, catálogo, ledger, staff"]
    MAINT["Maintenance worker
retención + reconciliación media"]
    AUTH["JWT + Google + email tokens"]
    MAIL["Outbox cifrado + SMTP worker"]
    LIMIT["Redis rate limiter"]
    STORAGE["S3 private adapter"]
    DB[("PostgreSQL 16
schema 0017")]

    ROUTER --> MIDDLE
    MIDDLE --> HANDLER
    HANDLER --> SERVICE
    SERVICE --> AUTH
    SERVICE --> REPO
    SERVICE --> STORAGE
    REPO --> DB
    MAINT --> REPO
    MAIL --> REPO
    MAIL --> SMTP["Proveedor SMTP"]
    MIDDLE --> LIMIT
    STORAGE --> S3
```

## Responsabilidades verificadas

| Capa | Responsabilidad |
|---|---|
| Router/middleware | Agrupa rutas públicas y autenticadas; request ID, timeout, recovery, CORS, IP confiable y rate limit |
| Handlers | JSON, multipart, ETag/If-Match, errores HTTP y envelopes |
| Servicios | Reglas de identidad, cuenta, autorización por marca/sucursal, invitaciones, media y ledger |
| Repositorios | SQL parametrizado, migraciones versionadas, locks y snapshots |
| Maintenance | Retención operacional y reconciliación de uploads/borrados con leases |
| Operación | readiness de PostgreSQL/esquema/Redis/S3 y versionado de binario |

## Referencias fijadas

- [Router y rutas por dominio](https://github.com/am-p/app-loyalty/blob/6a2a8f0525df9e640d895e50e59b0e9a39960aab/cmd/server/routes_merchant.go)
- [Handler de movimientos](https://github.com/am-p/app-loyalty/blob/6a2a8f0525df9e640d895e50e59b0e9a39960aab/internal/handler/movement.go)
- [Servicio de media](https://github.com/am-p/app-loyalty/blob/6a2a8f0525df9e640d895e50e59b0e9a39960aab/internal/service/media.go)
- [Worker de mantenimiento](https://github.com/am-p/app-loyalty/blob/6a2a8f0525df9e640d895e50e59b0e9a39960aab/internal/maintenance/worker.go)
