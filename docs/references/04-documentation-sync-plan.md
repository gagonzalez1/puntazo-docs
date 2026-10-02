---
id: documentation-sync-plan
title: Actualización documental con ramas vigentes
group: 05 · Referencias
order: 40
parent: documented-commits
level: reference
status: current
summary: Edición compartida de Markdown en GitHub y publicación del portal desde main.
authority: source_code
diagram: false
---

# Actualizar el recurso compartido Puntazo Docs

La fuente compartida es el [repositorio puntazo-docs](https://github.com/gagonzalez1/puntazo-docs) y la publicación es [docs.puntazo.pro](https://docs.puntazo.pro). El contenido se puede leer como Markdown o navegar en el portal. La VPS ejecuta una copia construida desde GitHub.

## Actualización simple

1. Editar el Markdown en `docs/` desde un checkout actual o el editor de GitHub en una rama. Conservar el `id` para mantener enlaces compartidos.
2. Verificar las fuentes dueñas y el runtime del ambiente afectado. Actualizar vistas C4, flujos, secuencias, datos e integraciones cuya verdad cambió.
3. Mantener el índice `docs/00-llm-guide.md` completo, con cada ruta documental. Registrar fuentes y evidencia fechada; omitir secretos y datos personales.
4. En un checkout limpio de la rama publicada, instalar dependencias con `npm ci`. Regenerar `npm run content:build` y revisar el diff. El catálogo no se edita a mano.
5. Versionar Markdown/catálogo; ejecutar `npm test` desde el HEAD remoto limpio y comprobar navegación escritorio/móvil. Proponer e integrar la rama en `main` según el flujo de revisión vigente.
6. El webhook de `main` solicita el build en Coolify. Confirmar finalización e imagen del commit, salud y catálogo público; un webhook 200 sólo acredita recepción.
7. Registrar la entrega y el rollback en el runbook privado de infraestructura. El acceso operativo de Coolify queda fuera del portal público.

## Recuperación y lectura por agentes

- Rollback: revertir el cambio documental en una rama, integrar a `main`, resolver su nuevo HEAD y redesplegar. No reutilizar un SHA histórico como fuente de una entrega nueva.
- Para contexto: empezar por [guía LLM](#/markdown-index), [fuentes](#/documented-commits), [estado observado](#/runtime-snapshot) y el Markdown específico. GitHub conserva versiones y permite edición compartida.
- El portal genera [catálogo navegable](https://docs.puntazo.pro/generated/catalog.json) con el Markdown fuente, los metadatos y diagramas. Leerlo no reemplaza la comprobación del código y runtime.
- `openapi.yaml` y el spec objetivo mantienen su autoridad propuesta hasta una reconciliación explícita. No se aprueban decisiones por copiar una implementación.

No hay sincronización automática de arquitectura con Coolify: las publicaciones son automáticas desde main, pero el contenido requiere esta revisión de evidencia.
