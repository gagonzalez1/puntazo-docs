---
id: documentation-sync-plan
title: Actualización documental con ramas vigentes
group: 05 · Referencias
order: 40
parent: documented-commits
level: reference
status: current
summary: Revisar cambios en los repositorios fuente sin bloquear la documentación a un SHA.
---
# Actualización documental con ramas vigentes

El portal documental sigue el código y las decisiones aceptadas; no define la
versión que se compila o despliega. No existe un archivo de bloqueo de fuentes ni
un job que compare las ramas con un SHA guardado en este repositorio.

## Flujo de revisión

1. Consultar los HEAD remotos de las ramas activas de frontend, backend y preview.
2. Consultar `/api/v1/version` y `/api/v1/health/ready` cuando la afirmación
   se refiera al ambiente de testing.
3. Revisar diffs desde la última revisión documental y abrir un PR con las
   vistas C4, flujos, secuencias, datos y brechas realmente afectadas.
4. Mantener `ACORDADO`, `PROPUESTA CODEX`, `target`, `mixed` y `gap` con su
   significado original; un cambio de código no aprueba una decisión de producto.
5. Regenerar el catálogo a partir de Markdown. Los enlaces a código apuntan a
   ramas móviles y se revisan durante el PR.

El historial de un build o despliegue conserva su SHA como evidencia de
trazabilidad. La siguiente entrega vuelve a resolver el HEAD remoto de su rama;
nunca lee ese SHA histórico como entrada.
