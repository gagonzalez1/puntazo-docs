---
id: c4-containers
title: C4 · Contenedores
group: 01 · Arquitectura C4
order: 20
parent: c4-context
level: container
status: current
summary: App Expo, API Go, PostgreSQL y proveedores externos con su grado real de integración.
diagram: true
codeRefs: required
---

# C4 · Contenedores

La separación por contenedores evidencia el límite actual: sólo autenticación atraviesa la API; el resto vuelve a servicios locales de la aplicación.

```mermaid
flowchart LR
    subgraph DEVICE["Dispositivo del usuario"]
      EXPO["App Expo / React Native\nExpo Router + Zustand + TanStack Query"]
      TOKEN["SecureStore / localStorage\nJWT de sesión"]
      MOCKS["Servicios mock\nperfil, loyalty, analytics"]
    end

    API["API Go\nGin + JWT"]
    DB[("PostgreSQL 16\nusers")]
    GOOGLE["Google Identity"]

    EXPO -->|"4 endpoints reales"| API
    EXPO --> TOKEN
    EXPO -->|"funciones aún sin API"| MOCKS
    API --> DB
    API --> GOOGLE

    click EXPO href "#/frontend-components" "Ver componentes frontend"
    click MOCKS href "#/frontend-flows" "Ver flujos frontend"
    click API href "#/backend-components" "Ver componentes backend"
    click DB href "#/data-current" "Ver datos implementados"
```

## Tecnologías

| Contenedor | Tecnología | Estado |
|---|---|---|
| Aplicación | Expo SDK 54, React Native 0.81, Expo Router | Implementado |
| Estado cliente | Zustand y almacenamiento seguro/local | Implementado |
| Estado servidor | TanStack Query | Implementado; mayormente sobre mocks |
| API | Go 1.25, Gin, JWT | Implementado para autenticación |
| Datos | PostgreSQL 16 con pgx | Sólo tabla `users` |

## Frontera objetivo de producción

> El siguiente bloque describe el destino aprobado, **no contenedores desplegados**.

- PWA, iOS y Android consumen la misma API versionada; los identificadores nativos
  iOS/Android son exactamente `com.puntazo.app` (`PR-06`).
- API y job de migración son artefactos separados. Sólo el job único aplica cambios
  de esquema; la API no crea tablas al arrancar.
- PostgreSQL y el bucket S3-compatible no se publican en Internet. El bucket es
  privado y la API media autorización de lectura/escritura (`PR-04`).
- Sólo el proxy HTTPS expone `443`; `80` redirige a HTTPS. API, base y storage usan
  redes privadas y credenciales distintas por ambiente.
- La release `FREE_ACCESS_V1` no despliega ni expone componentes de billing.
- Logs, métricas, alertas y backups viven fuera del dominio de falla de la API y
  deben verificarse antes del GO (`PR-08`).

## Referencias de código

- [Providers y restauración de sesión](https://github.com/gonzalotev/app-fidelidad/blob/afec4792729b48de4646168846ab221c96352f51/app/_layout.tsx#L42-L76)
- [Persistencia del token](https://github.com/gonzalotev/app-fidelidad/blob/afec4792729b48de4646168846ab221c96352f51/src/core/storage/tokenStorage.ts#L4-L32)
- [Bootstrap de API y PostgreSQL](https://github.com/am-p/app-loyalty/blob/f03b9aa202587510508a6f2a094b808f5ed6353d/cmd/server/main.go#L18-L51)
