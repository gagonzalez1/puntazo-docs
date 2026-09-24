---
id: documented-commits
title: Fuentes y versiones actuales
group: 05 · Referencias
order: 10
parent: overview
level: reference
status: current
authority: source_code
summary: Cómo resolver la última revisión de la rama activa y comprobar qué versión está desplegada.
---
# Fuentes y versiones actuales

La documentación no bloquea ningún repositorio en un SHA. Una entrega toma el
HEAD remoto de la rama de integración elegida en ese momento. Si hay una rama de
trabajo más reciente todavía sin integrar, primero se decide su promoción; la
fecha de un commit en otra rama no la convierte automáticamente en release.

| Plano | Repositorio | Comprobación actual |
|---|---|---|
| Frontend | [app-fidelidad](https://github.com/gonzalotev/app-fidelidad) | HEAD remoto de la rama de integración seleccionada para la entrega |
| Backend | [app-loyalty](https://github.com/gagonzalez1/app-loyalty) | HEAD remoto de la rama de integración seleccionada para la entrega |
| Candidato de testing | [puntazo-preview, rama testing](https://github.com/gagonzalez1/puntazo-preview/tree/testing) | HEAD remoto de `testing` |
| Runtime de testing | [`/api/v1/version`](https://testing.puntazo.pro/api/v1/version) | Commit y esquema informados por el servicio realmente desplegado |

Antes de construir o desplegar:

1. Consultar el HEAD remoto de cada rama elegida y actualizar el checkout a esa revisión.
2. Comparar el código integrado con el contrato y la documentación; resolver cualquier divergencia.
3. Construir desde ese HEAD y comprobar que los metadatos del artefacto coincidan con él.
4. Tras desplegar, comparar `/api/v1/version` y readiness con el despliegue realizado.

Los SHA registrados en builds, releases o incidentes son evidencia histórica de
lo que se publicó. No se reutilizan como selector de una entrega nueva. Los
enlaces de código de este portal siguen ramas móviles y deben verificarse contra
el HEAD vigente antes de afirmar implementación.
