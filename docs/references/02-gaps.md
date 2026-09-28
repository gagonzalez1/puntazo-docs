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

| Área | Código actual | Spec propuesto |
|---|---|---|
| Cuenta | `rol: CLIENTE_FINAL \| TIENDA` | `tipo_cuenta` y membresías por marca |
| Suscripción | Sólo Zustand, en memoria | Suscripción de marca por sucursal |
| Comercio | `Tienda` única | Marca con múltiples sucursales |
| Fidelidad | Servicios mock | API y persistencia transaccional |
| Datos | Sólo `users` | Modelo completo con marcas, programas y tarjetas |
| Contrato HTTP | Cuatro rutas de autenticación/cuenta | `openapi.yaml` formaliza 57 rutas objetivo pendientes de implementación |
| PostgreSQL | Creación directa de `users` | Tipos, índices, migraciones y locks en `PC-09` a `PC-11` |
| Reseñas de Google | Desplegada en testing (`0.7.0-testing`, schema `0022`); aceptación web pública FULL PASS; fuentes aún no están en `main` | Falta terminar apertura/retorno de cliente nuevo en Android; iOS y dispositivo físico no verificados. Ver [estado y commits](#/google-reviews-contract) |

Estas diferencias no son errores de la documentación: son la frontera entre **estado actual** y **dirección propuesta**.

El resto de la dirección de backend continúa como `PROPUESTA CODEX` hasta que el equipo apruebe cada punto del [índice de backend](#/backend-review-index). El contrato de reseñas tiene acuerdo y evidencia de testing propios, enlazados arriba.
