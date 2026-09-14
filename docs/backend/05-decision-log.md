---
id: backend-decision-log
title: Backend · Decisiones de preparación productiva
group: 03 · Backend objetivo
order: 60
parent: backend-review-index
level: decision
status: target
authority: agreed
summary: Contrato aprobado para la primera release gratuita y sus gates, todavía pendiente de implementación.
diagram: false
codeRefs: optional
---

# Decisiones de preparación productiva

> **APROBADAS POR EL USUARIO EL 13 DE SEPTIEMBRE DE 2026.** Estas decisiones
> fijan producto y contrato objetivo. No cambian el estado de implementación de
> frontend, backend o infraestructura y no autorizan billing ni publicación.

| ID | Decisión aprobada | Fuera del alcance actual |
|---|---|---|
| `PR-01` | La primera release es gratuita, el alta comercial requiere un código de acceso y el backend fija precio/cobro en cero. | Suscripción paga, pasarela, tarjeta, renovación, deuda, factura o webhook de pago. |
| `PR-02` | En programas `PUNTOS`, el operador ingresa manualmente entre 1 y 100.000 puntos por acumulación. Desde 10.001 la UI exige una segunda confirmación inequívoca. Un beneficio requiere entre 1 y 10.000.000 unidades. | Fórmula por importe de compra de `PC-01`; automatización por POS o comprobante. |
| `PR-03` | Marca, sucursal, programa, beneficio y membresía admiten edición completa con control optimista `If-Match`. La eliminación normal es lógica. Movimientos conservan snapshots de los datos históricos relevantes. | Borrado físico ordinario de entidades referenciadas o reescritura retroactiva del ledger. |
| `PR-04` | Logos, iconos y media de beneficios viven en storage S3-compatible privado; el backend valida contenido y limita cada archivo a 5 MiB. | URLs de dispositivo, bucket público o confianza en extensión/MIME declarado por cliente. |
| `PR-05` | Roles de marca: `PROPIETARIO`, `ADMINISTRADOR`, `OPERADOR`. Roles internos: `ADMIN_SISTEMA`, `FINANZAS`, `SOPORTE`. Las invitaciones son de un uso, ligadas al email, revocables y vencen a las 72 horas. | Invitación de propietarios y privilegios fuera de la matriz autorizada. |
| `PR-06` | El cliente se entrega como PWA y aplicaciones iOS/Android. Ambas aplicaciones nativas usan `com.puntazo.app`. | Publicación sin QA físico, URLs legales estables o formularios de privacidad de tiendas. |
| `PR-07` | `PATCH /me` conserva nombre/apellido/alias/foto con `If-Match`; `GET /me/export` exporta datos; `DELETE /me` exige `ANONIMIZAR`, `auth_time <=10 min`, transfiere último propietario y anonimiza preservando ledger. | Prometer borrado absoluto del ledger o plazos legales todavía no revisados profesionalmente. |
| `PR-08` | Producción exige evidencia de CI, SLO, backup/restore, respuesta a incidentes y QA físico de PWA/iOS/Android. | Considerar aprobada una release sólo porque compila o funciona en staging. |
| `PR-09` | Producción exige email verificado y proveedor de correo operativo. Verificación (24 h) y reset de contraseña (1 h) usan tokens hasheados, de un uso; reset revoca sesiones. Google sólo verifica localmente cuando el proveedor afirma `email_verified=true`. | Activar cuentas por email sin verificar, revelar existencia de cuentas o conservar tokens recuperables. |

## Reglas de precedencia

- `PR-02` sustituye la fórmula monetaria propuesta en `PC-01` para esta release.
- La decisión de integración conserva el transporte v1 de movimientos
  (`operation`, `branch_id`, `benefit_id`; respuesta `id/balance_before/amount`).
  `cantidad_puntos` se agrega sólo a preview y scan consume su snapshot inmutable.
- `PR-01` difiere `PC-03` y todas las rutas de billing. Esas rutas pueden
  conservarse en OpenAPI como objetivo futuro, marcadas fuera del release.
- `PR-03`, `PR-04` y `PR-05` aprueban el alcance correspondiente de `PC-04` a
  `PC-07`; los detalles no mencionados siguen sujetos a revisión.
- `PR-07` define el resultado técnico. Retención, excepciones y texto público
  requieren revisión legal profesional y una política implementable.
- `PR-09` permite que registro responda `verification_required: true` sin sesión.
  Solicitudes de verificación y reset responden `202` genérico para evitar enumeración.

## Gate de implementación

Una operación marcada `APROBADA_USUARIO` en OpenAPI sigue llevando
`x-puntazo-implementation: NOT_IMPLEMENTED` hasta que exista código, migración y
prueba en los commits documentados. `source-lock.json` no se actualiza durante
esta etapa de contrato.
