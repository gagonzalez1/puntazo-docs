---
id: source-workflow
title: Repositorios fuente, ramas y promoción
group: 05 · Referencias
order: 50
parent: documented-commits
level: guide
status: current
summary: Cómo elegir el checkout activo, preparar PR en los repos oficiales y ensamblar testing sin perder avances locales.
diagram: false
codeRefs: optional
---

# Repositorios fuente, ramas y promoción

La carpeta `Puntazo` reúne varios repositorios. No es un checkout Git único.
La ruta de una carpeta no demuestra qué rama está activa ni qué versión sirve
un proceso local. Identificar siempre repositorio, remote, rama y ruta antes de
editar, sincronizar o iniciar la app.

## Dueños del código

| Trabajo | Repositorio oficial | Destino habitual del PR |
| --- | --- | --- |
| App Expo / frontend | `gonzalotev/app-fidelidad` | `main` |
| API Go, reglas, migraciones, workers | `am-p/app-loyalty` | `main` |
| UI administrativa independiente | `gagonzalez1/puntazo-backoffice` | Rama del entorno seleccionada |
| Arquitectura, contratos y evidencia | `gagonzalez1/puntazo-docs` | `main` |
| Documentos legales y su publicación | `gagonzalez1/puntazo-legal` | Rama seleccionada para esa publicación |
| Ensamblado y configuración de testing | `gagonzalez1/puntazo-preview` | `testing` |

`gagonzalez1/app-loyalty` es un fork para publicar ramas y abrir PR hacia Ariel.
Un push al fork no integra el cambio en `am-p/app-loyalty/main`.
Los worktrees de frontend pertenecen al mismo repositorio de Gonzalo aunque
estén en carpetas distintas. No son una segunda fuente oficial.

## Elegir el checkout para cada tarea

1. Declarar dueño y rama base explícita. Para trabajo de producto frontend y
   backend, resolver la base desde el `main` remoto oficial vigente. Para
   diagnóstico o ensamblado de testing, seleccionar `puntazo-preview/testing`.
2. Comprobar remote, `git status --short --branch`, `git worktree list` y `HEAD`.
   La carpeta principal puede estar en una rama antigua o tener trabajo local.
3. Ejecutar la verificación online de `puntazo-context` con esas ramas y las
   rutas reales. Un documento con un SHA previo no selecciona la fuente actual.
4. Conservar cambios locales. Reutilizar un worktree libre o preparar uno
   aislado cuando el checkout no pueda actualizarse sin mezclar trabajo.
   No hacer reset, limpieza ni stash masivo para forzar una actualización.
5. Registrar la ruta activa en el handoff y en el inventario de la tarea.

Actualizar una referencia local como `main` no cambia los archivos del
checkout abierto en otra rama. Un fetch actualiza referencias remotas;
una actualización de archivos requiere preparar el checkout elegido.

## Desarrollo y PR

- Una rama por funcionalidad o corrección coherente, con commits que expliquen
  cambios revisables. Evitar snapshots completos de un árbol viejo.
- Implementar primero en el repo dueño. Ante un avance ya existente únicamente
  en preview, extraer sus diferencias y adaptarlas al main oficial actual.
- Preservar cambios nuevos del propietario: una copia de preview puede omitir
  Google nativo, push, pantallas o dependencias presentes en los repos fuente.
- Abrir PR en Gonzalo o Ariel. Si el backend se publica en el fork, comprobar
  explícitamente el repositorio destino del PR.
- Mantener el PR existente cuando siga siendo la misma entrega. Un PR cerrado
  no demuestra integración: comparar código y parches, además del historial.
- Declarar dependencias entre PR, rutas, esquemas y configuración. Si los PR
  se apilan sobre `main`, explicar qué commits pertenecen a la entrega anterior
  y en qué orden deben revisarse e integrarse.
- Ejecutar las comprobaciones correspondientes al cambio y registrar sus
  límites. Push, CI, merge y despliegue son estados distintos.

Una corrección funcional descubierta en preview debe tener una promoción
identificada hacia el repo dueño. Si se corrige primero allí para resolver
testing, registrar esa deuda explícitamente y su PR fuente correspondiente.

## Ensamblar testing

`puntazo-preview` combina frontend y backend seleccionados para testing y
conserva las diferencias de entorno documentadas. Puede validar ramas fuente
pendientes de revisión; eso no implica aprobación ni integración en sus main.

Antes de construir o desplegar, volver a obtener las ramas seleccionadas y
ejecutar `verify-context.py --require-clean` sobre los checkouts reales del
build. Registrar los commits resueltos como evidencia. Al verificar despliegue,
contrastar `/api/v1/version`, esquema, readiness y bundle servido.

No reconstruir testing desde `preview/main` por defecto. No confundir el
commit del API remoto con el commit de un frontend Metro local: el proxy puede
apuntar al API actual mientras Metro sirve archivos de otra carpeta.

## Migraciones y reconciliación

Antes de integrar PR concurrentes, verificar número, nombre y contenido de
cada migración. No aplicar ramas antiguas contra una base más avanzada.
Las migraciones ya aplicadas en testing forman parte de su historial; una
adaptación no debe sustituir silenciosamente ese historial.

En la auditoría del 28/09/2026 se detectó una colisión: PR backend #13 usa
`0022_google_reviews`, mientras #14 propone `0022_email_change` y
`0023_card_templates`. El migrador observado registra el número de versión
sin identificar el contenido; dos archivos con el mismo número pueden hacer
que uno quede omitido. Esta observación es evidencia de esa revisión, no una
reserva permanente de números para futuras entregas.

El contrato de reconciliación conserva el historial de testing `0022`–`0029`
y prepara una copia compatible de cambio de email y plantillas en `0030` y
`0031`. Esa copia debe conservar los tipos de outbox de bienvenida de
influencer y confirmación de suscripción, tanto en subida como en bajada.
Los PR respectivos documentan el estado de aprobación e integración.

## Preservar y retirar trabajo antiguo

Clasificar cada rama o conjunto de cambios como integrado, pendiente con PR,
borrador local o diferencia de entorno. La comparación de commits puede no
detectar squash o cherry-pick: comprobar equivalencia de parches y comportamiento.

Conservar borradores y cambios sin commit antes de retirar un checkout.
No agregar recursivamente worktrees anidados ni archivos privados, entornos,
dependencias o credenciales. Comprobar que ningún proceso o chat necesita el
directorio. Usar el archivo de worktree gestionado cuando esté disponible;
no borrar carpetas para ocultar divergencias.

## Handoff mínimo

| Dato | Qué registrar |
| --- | --- |
| Ubicación | Repo dueño, remote, rama base y ruta activa |
| Código | Commit fuente y cambios locales que no incluye |
| Revisión | PR oficial, dependencias y estado de integración |
| Testing | Commit integrado, versión y esquema observados |
| Comprobaciones | Pruebas ejecutadas y recorridos no verificados |
| Pendientes | Borradores preservados, diferencias de entorno y decisiones |

