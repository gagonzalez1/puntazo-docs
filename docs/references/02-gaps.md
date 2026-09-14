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
| Acceso comercial | Suscripción Zustand local | Alta gratuita protegida por código, sin billing (`PR-01`) |
| Comercio | `Tienda` única | Marca con múltiples sucursales |
| Fidelidad | Servicios mock | API transaccional; Puntos manuales `1..100000` y confirmación reforzada desde `10001` |
| Datos | Sólo `users` | Modelo completo con marcas, programas y tarjetas |
| Contrato HTTP | Cuatro rutas de autenticación/cuenta | OpenAPI aprobado parcialmente; sigue pendiente de implementación |
| PostgreSQL | Creación directa de `users` | Tipos, índices, migraciones y locks en `PC-09` a `PC-11` |
| Ciclo de vida | Sin edición persistida ni cierre de cuenta | `If-Match`, baja lógica, snapshots y anonimización preservando ledger aprobados |
| Clientes | Expo sin IDs nativos finales | PWA + iOS/Android con `com.puntazo.app` aprobados; publicación pendiente |
| Operación | Sin evidencia productiva | CI, SLO, DR, incidentes y QA físico exigidos por `PR-08` |

Estas diferencias no son errores de la documentación: son la frontera entre **estado actual** y **dirección propuesta**.

Las decisiones `PR-01` a `PR-08` están aprobadas como contrato objetivo, no como
implementación. Las `PC-xx` no cubiertas continúan como `PROPUESTA CODEX`; consulte
el [índice de backend](#/backend-review-index).
