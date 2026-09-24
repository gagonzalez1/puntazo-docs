---
id: frontend-components
title: C4 · Componentes del frontend
group: 01 · Arquitectura C4
order: 30
parent: c4-containers
level: component
status: current
summary: Router, pantallas, estado, hooks, servicios y cliente HTTP de la aplicación Expo.
diagram: true
codeRefs: required
---

# C4 · Componentes del frontend

```mermaid
flowchart LR
    ROUTER["Expo Router\napp/"]
    SCREENS["Pantallas\nauth + tabs"]
    THEME["Tema y utilidades visuales\ncolors + shadow"]
    STORE["Zustand\nuseAuthStore"]
    QUERY["TanStack Query\nhooks por feature"]
    REAL["authService\nAPI real"]
    MOCK["profile / loyalty / analytics\nservicios mock"]
    HTTP["api client + endpoints"]

    ROUTER --> SCREENS
    SCREENS --> THEME
    SCREENS --> STORE
    SCREENS --> QUERY
    STORE --> REAL
    QUERY --> MOCK
    REAL --> HTTP

    click SCREENS href "#/frontend-flows" "Ver flujos por pantalla"
    click STORE href "#/flow-auth" "Ver autenticación"
    click MOCK href "#/implementation-gaps" "Ver brechas"
```

## Referencias de código

- [Layout raíz](https://github.com/gonzalotev/app-fidelidad/blob/main/app/_layout.tsx#L27-L77)
- [Store de autenticación](https://github.com/gonzalotev/app-fidelidad/blob/main/src/features/auth/store/useAuthStore.ts#L14-L107)
- [QueryClient](https://github.com/gonzalotev/app-fidelidad/blob/main/src/core/queryClient.ts#L1-L10)
- [Layout de tabs con paleta fija](https://github.com/gonzalotev/app-fidelidad/blob/main/app/(tabs)/_layout.tsx#L13-L139)
- [Utilidades compartidas de sombras](https://github.com/gonzalotev/app-fidelidad/blob/main/src/core/utils/shadow.ts#L1-L52)
