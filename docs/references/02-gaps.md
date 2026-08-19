---
id: implementation-gaps
title: Brechas entre código y spec
group: 05 · Referencias
order: 20
parent: documented-commits
level: reference
status: gap
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

Estas diferencias no son errores de la documentación: son la frontera entre **estado actual** y **dirección propuesta**.
