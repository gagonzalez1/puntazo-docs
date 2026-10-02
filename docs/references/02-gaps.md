---
id: implementation-gaps
title: Brechas entre código y spec
group: 05 · Referencias
order: 20
parent: documented-commits
level: reference
status: gap
authority: mixed
summary: Diferencias que deben permanecer visibles para evitar documentar propuestas como código existente.
---

# Brechas entre código y spec

## Analíticas · entrega 01/10/2026

La nueva rama de trabajo agrega vistas con datos operativos confirmados por día, semana y mes; su despliegue sigue pendiente. El resumen histórico ya existe en las fuentes actuales. El diseño antiguo de tres hojas usaba mocks: retención, fuga, frecuencia, recordatorios, importes y drill-down no forman parte de esta entrega real. Tampoco hay filtro por sucursal: el alcance es la marca completa y se informa en pantalla. `PC-08` permanece propuesta en su alcance amplio.

Ver [el flujo y evidencia de fuente](#/flow-merchant-analytics). La tabla histórica de abajo no debe volver a usarse como inventario actual.

## Alcance de esta comparación · 01/10/2026

El runtime de testing sirve `gagonzalez1/app-loyalty:testing` (`ecd69be`,
esquema `0033`) y la web de `gonzalotev/app-fidelidad:testing` (`fc737a2`).
El Compose `puntazo-preview:testing` está detenido y retenido. La tabla de
abajo es una comparación histórica, no un inventario actual de diferencias
frente a `am-p/app-loyalty:main`. Para abrir PR a Ariel hay que volver a
obtener los HEAD remotos, comparar código/patch y contratos y preservar las
funciones más recientes de main. El cambio de infraestructura no aprueba
decisiones de producto ni rutas de `openapi.yaml` etiquetadas como propuestas.

## Comparación anterior (histórica)

| Área | Código actual | Spec propuesto |
|---|---|---|
| Cuenta | `rol: CLIENTE_FINAL \| TIENDA` | `tipo_cuenta` y membresías por marca |
| Suscripción | Sólo Zustand, en memoria | Suscripción de marca por sucursal |
| Comercio | `Tienda` única | Marca con múltiples sucursales |
| Fidelidad | Servicios mock | API y persistencia transaccional |
| Datos | Sólo `users` | Modelo completo con marcas, programas y tarjetas |
| Contrato HTTP | Cuatro rutas de autenticación/cuenta | `openapi.yaml` formaliza 57 rutas objetivo pendientes de implementación |
| PostgreSQL | Creación directa de `users` | Tipos, índices, migraciones y locks en `PC-09` a `PC-11` |

Estas diferencias no son errores de la documentación: son la frontera entre **estado actual** y **dirección propuesta**.

La dirección ya tiene suficiente detalle técnico para revisión, pero continúa siendo
`PROPUESTA CODEX` hasta que el equipo apruebe cada punto del [índice de backend](#/backend-review-index).
