---
id: flow-auth
title: Frontend · Acceso y onboarding
group: 02 · Flujos frontend
order: 10
parent: frontend-flows
level: flow
status: mixed
summary: Registro, login, Google, selección de plan y restauración de sesión.
diagram: true
codeRefs: required
---

# Frontend · Acceso y onboarding

```mermaid
flowchart LR
    FORM["Pantalla auth"] --> STORE["useAuthStore"]
    STORE --> SERVICE["authService"]
    SERVICE --> API["API Go real"]
    API --> PLAN["Pantalla subscription"]
    PLAN --> LOCAL["subscribe() local\nrol + plan en memoria"]
    LOCAL --> TABS["Tabs según plan"]

    click API href "#/sequence-register" "Ver registro backend"
    click PLAN href "#/flow-plan-selection" "Ver selección de plan"
```

La autenticación es real. La selección de plan posterior al login es local y todavía no llama al backend.

## Referencias de código

- [La pantalla navega siempre a suscripción](https://github.com/gonzalotev/app-fidelidad/blob/afec4792729b48de4646168846ab221c96352f51/app/(auth)/index.tsx#L31-L76)
- [Auth service conectado](https://github.com/gonzalotev/app-fidelidad/blob/afec4792729b48de4646168846ab221c96352f51/src/features/auth/services/authService.ts#L82-L121)
- [Mutación local de plan y rol](https://github.com/gonzalotev/app-fidelidad/blob/afec4792729b48de4646168846ab221c96352f51/src/features/auth/store/useAuthStore.ts#L66-L98)
