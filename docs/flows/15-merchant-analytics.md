---
id: flow-merchant-analytics
title: Comercio · Analíticas
group: 02 · Flujos frontend
order: 150
parent: merchant-flows
level: flow
status: mock
summary: Métricas diarias, semanales y mensuales provenientes de constantes locales.
diagram: true
codeRefs: required
---

# Comercio · Analíticas

```mermaid
flowchart LR
    SCREEN["Estadísticas"] --> RANGE{"Período"}
    RANGE --> DAILY["Diarias mock"]
    RANGE --> WEEKLY["Semanales mock"]
    RANGE --> MONTHLY["Mensuales mock"]
    DAILY --> KPIS["KPIs y variación"]
    WEEKLY --> KPIS
    MONTHLY --> KPIS
    KPIS --> DRILL["Detalle visual"]

    click KPIS href "#/integration-matrix" "Ver estado de integración"
```

No hay consultas al backend, persistencia ni filtros reales por marca o sucursal.

## Referencias de código

- [Pantalla de analíticas](https://github.com/gonzalotev/app-fidelidad/blob/main/app/(tabs)/analytics/index.tsx#L33-L90)
- [Servicio de métricas mock](https://github.com/gonzalotev/app-fidelidad/blob/main/src/features/analytics/services/analyticsService.ts#L1-L140)

## API objetivo

La propuesta incluye métricas de marca diarias, semanales, mensuales y drill-down, con filtro opcional por sucursal.
