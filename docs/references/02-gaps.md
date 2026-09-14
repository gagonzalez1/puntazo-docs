---
id: implementation-gaps
title: Brechas entre código y release
group: 05 · Referencias
order: 20
parent: documented-commits
level: reference
status: gap
authority: mixed
summary: Diferencias restantes entre la implementación verificada y los gates necesarios para publicar Puntazo.
---

# Brechas entre código y release

La integración funcional de la release gratuita está implementada en los commits
fijados. Esta tabla conserva las brechas reales que todavía impiden afirmar
“lista para producción” sin evidencia adicional.

| Área | Implementado y verificado | Brecha restante / criterio de cierre |
|---|---|---|
| Contrato HTTP | OpenAPI backend con operaciones `IMPLEMENTED`, envelopes, ETag, UUID de idempotencia y errores | Mantener contrato y frontend sincronizados en cada merge; ejecutar lint/contract checks |
| Identidad y sesiones | Verificación de email, reset one-use, refresh rotativo web/native, revocación y rate limits | Homologar SMTP, dominio autenticado, rebotes/supresiones y enlaces HTTPS; no habilitar producción sin proveedor probado |
| PostgreSQL | 17 migraciones versionadas, locks, snapshots, exportación/anonimización y readiness de esquema | Ejecutar migrador separado en staging, verificar backup cifrado/restore y capacidad del pool con datos representativos |
| Redis | Rate limiter distribuido y readiness; fallback local sólo fuera de producción | Probar Redis administrado con TLS, límites, fail-closed y comportamiento ante caída durante un smoke controlado |
| Media | Bucket privado, auth antes de decode, límite 5 MiB, WebP reencodeado a JPEG/PNG, variantes logo/icono 1024/512, leases de reconciliación | Homologar credenciales S3, SSE AES256, upload/list/delete real, expiración de URLs y recuperación post-falla; el picker UI ofrece JPEG/PNG y deja HEIC fuera |
| Autorización comercial | `PROPIETARIO`, `ADMINISTRADOR` global por marca y `OPERADOR` restringido a `branch_ids`; personal por `membership_id` | Ejecutar matriz de permisos con múltiples memberships/sucursales en staging y revisar auditoría de operaciones sensibles |
| Movimientos | Preview/confirmación transaccional, Puntos 1..100.000, snapshot inmutable, locks, reintentos e idempotencia | Ejecutar pruebas E2E con concurrencia, timeout y resolución de clave; verificar métricas de rechazo y conciliación |
| PWA | Export, proxy same-origin, CSP parametrizada, service worker, no cache de mutaciones y harness Playwright | Probar instalación/actualización/offline shell en dominio HTTPS real; confirmar cámara y cookies en Safari/Chrome |
| Aplicaciones nativas | Expo SDK 54, configuración `com.puntazo.app` y servicios API reales | QA físico en iOS/Android, permisos de cámara, SecureStore, deep links y builds firmados; publicación de tiendas sigue pendiente |
| Operación | `/health/live`, `/health/ready`, `/version`, logs/request IDs, retención y worker de reconciliación | Configurar dashboards, alertas, guardia, runbook de incidentes, rollback y restore cronometrado; la evidencia es gate `PR-08` |
| Alcance comercial | Alta gratuita controlada por código; billing no se expone | Suscripciones, cobro, POS, comprobantes y webhooks siguen fuera de `FREE_ACCESS_V1`; no simularlos como disponibles |
| Analíticas | Resumen operativo histórico real | Períodos, comparaciones, predicciones y drill-down continúan fuera del alcance |
| Legal y publicación | Flujos técnicos de cuenta y media implementados | Revisar legalmente privacidad/retención/textos públicos y completar formularios de stores antes de publicación |
## Diferencia entre implementación y objetivo

El [modelo objetivo](#/data-target) y cualquier operación no presente en el
[OpenAPI canónico](/openapi.yaml) siguen siendo diseño o alcance futuro. Las
decisiones `PR-01` a `PR-09` están aprobadas para la release, pero no sustituyen
la evidencia de staging ni autorizan billing o publicación.

## Referencias fijadas

- [OpenAPI implementado](https://github.com/am-p/app-loyalty/blob/b87b00ce41d94b4cc719934fc3cc1a8ff18803c1/openapi.yaml)
- [README operativo del backend](https://github.com/am-p/app-loyalty/blob/b87b00ce41d94b4cc719934fc3cc1a8ff18803c1/README.md)
- [Servicios de integración frontend](https://github.com/gonzalotev/app-fidelidad/blob/1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01/src/features/demo/services/demoService.ts)
