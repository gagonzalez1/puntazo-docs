---
id: schema-nginx-runtime
title: Esquemas y seguridad · 12/11/2026
group: 05 · Referencias
order: 70
parent: runtime-snapshot
level: reference
status: mixed
authority: mixed
summary: Esquema 0051 reconciliado, Go 1.26.11 y Nginx 1.30.6 en testing y producción; promoción backend pendiente.
diagram: false
codeRefs: required
---

# Esquemas y seguridad · 12/11/2026

Actualización operativa de API, PostgreSQL y web/PWA. Reemplaza las versiones de esos recursos del [corte de octubre](#/runtime-snapshot); los demás componentes conservan su propia evidencia fechada. Los commits acreditan esta publicación y nunca seleccionan el código de una futura entrega.

## Fuentes y publicación

| Recurso | Rama seleccionada y obtenida del remoto | Commit observado | Resultado |
|---|---|---|---|
| API testing y producción | `gagonzalez1/app-loyalty:release/schema-reconciliation-20261112` | `dd2003875d22c41c764b7df6a9be2db3d428398e` | Go 1.26.11; esquema 0051; readiness 200 |
| Web testing | `gonzalotev/app-fidelidad:testing` | `29ca05fa15a051b72d2b4394d209295bda339ce0` | Nginx 1.30.6; healthy |
| Web producción | `gonzalotev/app-fidelidad:main` | `ae0fb372d278fc7fcc17267f2e2ea077483c9e65` | Nginx 1.30.6; healthy |

El dueño del backend sigue siendo **`am-p/app-loyalty`**. La rama de publicación contiene su main verificado y las correcciones propuestas en [PR54](https://github.com/am-p/app-loyalty/pull/54) y [PR55](https://github.com/am-p/app-loyalty/pull/55), con CI aprobado. Ambos PR siguen pendientes de integración oficial: la cuenta operativa no tiene escritura sobre ese repositorio. Publicación no significa promoción al dueño.

Nginx se actualizó por separado sobre cada rama frontend, preservando sus funciones: [PR143 testing](https://github.com/gonzalotev/app-fidelidad/pull/143) y [PR144 main](https://github.com/gonzalotev/app-fidelidad/pull/144), integrados con CI aprobado. La imagen queda fijada a `nginx:1.30.6-alpine@sha256:583b7f2fce1cdb8da5ad5c39ebd3c33b98b87d493190e548bdee1fa8c619c311`, conforme a los [avisos oficiales](https://nginx.org/en/security_advisories.html). Las APIs conservan fuentes independientes de la configuración de cada ambiente; Coolify vuelve a selector `HEAD` después de la entrega.

## Reconciliación de PostgreSQL

Producción avanzó **0044 → 0051**. Testing avanzó **0049 → 0051**, resolviendo una colisión histórica: su 0045 ya representaba Apple browser, mientras que la 0045 oficial incorpora StoreKit. No se renumeraron migraciones aplicadas ni se reemplazaron fechas del historial.

El comando restringido `reconcile-testing-apple-0045` valida la forma exacta de la rama divergente, aplica el DDL oficial faltante y adopta las tablas browser existentes como 0050. La nueva 0051 conserva la procedencia en `schema_reconciliation_log`. Testing tiene una entrada de reconciliación; producción no requiere esa adopción y tiene cero. Esa diferencia de auditoría es intencional.

Las bases contienen las **51 versiones 0001–0051 y 70 tablas públicas**. Coinciden nombres, columnas, tipos, nulabilidad, defaults, claves, restricciones, índices y RLS. Ocho predicados antiguos difieren en cómo PostgreSQL serializa paréntesis y casts: `EXPLAIN` de solo lectura sobre la misma tabla confirmó planes optimizados idénticos. No se cambiaron restricciones válidas sólo para uniformar texto. También coinciden **56 funciones/procedimientos, 12 triggers, 22 secuencias, 2 vistas y 2 extensiones**; los datos y contadores propios de cada ambiente permanecen independientes.

Antes de cada migración real se detuvo la API, se respaldó la base cifrada y se comprobó checksum, descifrado y restauración aislada en PostgreSQL 16. Se ensayaron migración repetida, conservación de las columnas/datos anteriores y arranque del candidato y de la recuperación compatible. Los fingerprints anteriores y posteriores coinciden en las **61 tablas existentes de testing y 58 de producción** incluidas en la comparación. Las copias y secretos permanecen únicamente en la VPS.

## Operación verificada y límites

Las dos APIs y webs están healthy. Se conservaron variables de proveedores, secretos, dominios, volúmenes y límites efectivos: API 768 MiB/1 CPU; web 384 MiB/0,5 CPU. El cambio de metadatos de versión y esquema esperado no modifica credenciales ni activa facturación.

Se comprobaron versión/readiness por API directa y proxy web, login público, PWA y lector PDF. Una cuenta dedicada de testing aprobó login, lectura de perfil/tarjetas, refresh, logout y revocación de sesión. Esto no acredita una nueva compra, cobro, canje, envío de correo, consentimiento OAuth ni validación de un binario nativo. La reconciliación técnica no convierte decisiones `PC-xx`, el DER objetivo ni rutas OpenAPI propuestas en aprobaciones de producto.

Existe recuperación de aplicación compatible con 0051 para cada ambiente, probada sobre la restauración. Mantener la base expandida, el historial y la auditoría; no hacer DOWN ni restaurar automáticamente un backup sobre actividad posterior. Los pasos, ubicaciones privadas y checksums completos se conservan en el runbook operativo de infraestructura y en el informe de la entrega.

## Referencias de código y comprobación pública

- [Migrador y reconciliación propuestos al dueño](https://github.com/am-p/app-loyalty/blob/fix/testing-schema-reconciliation-20261111/cmd/migrate/reconcile_testing.go).
- [Migraciones de la rama publicada](https://github.com/gagonzalez1/app-loyalty/tree/release/schema-reconciliation-20261112/migrations).
- [Imagen web main](https://github.com/gonzalotev/app-fidelidad/blob/main/Dockerfile) y [testing](https://github.com/gonzalotev/app-fidelidad/blob/testing/Dockerfile).
- [Versión producción](https://api.puntazo.pro/v1/version) y [testing](https://api-testing.puntazo.pro/v1/version).
