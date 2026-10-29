---
id: documented-commits
title: Fuentes y versiones actuales
group: 05 · Referencias
order: 10
parent: overview
level: reference
status: current
authority: source_code
summary: Repositorios dueños, ramas por ambiente y evidencia separada del runtime.
diagram: false
---

# Fuentes y versiones actuales

Las ramas seleccionan fuentes; los SHA registran lo inspeccionado o desplegado. Un checkout histórico, una rama de trabajo o el tag `latest` no prueba integración ni publicación.

| Plano | Repositorio y ramas | Responsabilidad |
|---|---|---|
| Frontend | [gonzalotev/app-fidelidad](https://github.com/gonzalotev/app-fidelidad), `main` / `testing`; `develop` sólo para el clon observado | Producto Expo y web de cada ambiente |
| Backend dueño | [am-p/app-loyalty](https://github.com/am-p/app-loyalty), `main` | API, Backoffice API y migraciones; destino de promoción funcional |
| Backend publicación testing | [gagonzalez1/app-loyalty](https://github.com/gagonzalez1/app-loyalty/tree/testing), `testing` | Fork de build/publicación; diferencias comparadas con el dueño |
| Landing | [gagonzalez1/puntazo-landing](https://github.com/gagonzalez1/puntazo-landing), `main` / `testing` | Marketing y entrada/proxy a Expo |
| Backoffice UI | `gagonzalez1/puntazo-backoffice` (privado), `testing` / `main` | UI interna; main preparada sin publicación activa |
| Docs | [gagonzalez1/puntazo-docs](https://github.com/gagonzalez1/puntazo-docs), `main` | Portal público separado; Markdown y catálogo generado |
| Legales | [gagonzalez1/puntazo-legal](https://github.com/gagonzalez1/puntazo-legal), `main` | Publicación legal con estado de revisión propio |
| Preview histórico | [gagonzalez1/puntazo-preview](https://github.com/gagonzalez1/puntazo-preview/tree/testing), `testing` | Integración anterior retenida; su Compose ya no atiende el tráfico actual |

La revisión del [estado observado](#/runtime-snapshot) registra HEAD, imágenes y configuración del 02/10/2026. Los enlaces de código siguen ramas móviles: hay que fetched/leer el HEAD vigente antes de afirmar una implementación nueva.

1. Seleccionar repositorio dueño y rama de integración explícitamente.
2. Fetch y comparar checkout; preservar trabajo local si está sucio o desactualizado.
3. Comparar fuente con runtime y con decisiones aprobadas. Un PR cerrado o un conteo ahead no prueba promoción funcional.
4. Antes del build/deploy, verificar checkout limpio en el HEAD remoto actual.
5. Después, comprobar imagen, salud y versión pública. Registrar SHA como evidencia, nunca como selector de la próxima entrega.

## Backoffice · publicación del 29/10/2026

| Plano | Rama elegida por fetch | Revisión observada |
| --- | --- | --- |
| UI productiva | gagonzalez1/puntazo-backoffice:main | 6c17760689ff0bc210398b3dcfbea95085da53ce |
| API productiva autorizada | gagonzalez1/app-loyalty:release/backoffice-users-production-20261029 | 9c802f7e5422464a9b3280364bfeba0b8e614389 |
| Base oficial intacta | am-p/app-loyalty:main | 676e0529fde66ca0283e2eb135af9bbe59346e62 |

CI propio40946831631 SUCCESS. API schema0043 sin migraciones nuevas.
Promoción oficial pendiente de aprobación en PR46; PR17 del fork registra la
publicación completa. Estos SHA son evidencia y no selectores de futuros builds.
