# Puntazo Architecture Docs

Proyecto independiente de documentación C4 y flujos de Puntazo. El lock actual
describe fuentes aisladas de staging sin modificar su código:

- frontend: `gonzalotev/app-fidelidad` rama `testing` @ `1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01`
- backend: `gagonzalez1/app-loyalty` rama `staging` @ `50e95e9407ee5ffaccfc3cebcbef464d24f26427`
- preview: `gagonzalez1/puntazo-preview` rama `testing` @ `e6efbd7da4d3a22be9f818b000ef44d4ac2ed40b`

Estos SHA no declaran integración en `main`, upstream ni producción.

La web está pensada para lectura humana y los archivos de `docs/` para lectura humana o por LLM. Markdown y los bloques Mermaid son la fuente de verdad; `public/generated/catalog.json` es un artefacto generado.

El punto de entrada para agentes es [`docs/00-llm-guide.md`](docs/00-llm-guide.md). Define precedencia, lectura mínima, estrategia de carga contextual e inventario completo de documentos.

## Qué incluye

- C4 de contexto, contenedores y componentes.
- Flujos frontend separados para autenticación, personal del comercio y cliente final.
- Una vista específica por pantalla funcional.
- Secuencias de registro, login, Google, restauración y escaneo.
- DER del estado implementado y DER objetivo `v1.4-draft`, claramente diferenciados.
- Matriz pantalla–API y brechas entre código y spec.
- Referencias a líneas de código fijadas a los commits documentados.
- Drill-down por clic, breadcrumbs, regreso, búsqueda, zoom, pan, descarga SVG e índice Markdown orientado a LLM.

## Requisitos

- Node.js `>=22.13.0`
- Los repositorios fuente como hermanos de esta carpeta sólo son necesarios para verificar localmente el lock de commits.

## Uso local

```bash
npm install
npm run dev
```

El servidor informa su URL local, normalmente `http://localhost:3000`.

## Fuente de verdad

Cada vista es un `.md` con frontmatter y, cuando corresponde, un único bloque Mermaid:

```yaml
---
id: identificador-estable
title: Título visible
group: 02 · Flujos frontend
order: 100
parent: vista-padre
level: flow
status: current
summary: Resumen corto.
diagram: true
codeRefs: required
---
```

Estados permitidos:

- `current`: conectado o persistido como se describe.
- `mixed`: combina integración real y comportamiento local.
- `mock`: simulado en memoria.
- `target`: propuesta del spec, todavía no implementada.
- `gap`: comparación o contrato pendiente.

Las referencias al código deben usar permalinks GitHub con el hash completo. Los nodos de Mermaid profundizan mediante `click NODE href "#/id-destino"`.

## Actualizar la fotografía

1. Revisar el nuevo commit de cada rama declarada en el lock.
2. Actualizar `docs/meta/source-lock.json`.
3. Revisar todas las afirmaciones y permalinks afectados.
4. Ejecutar `npm run content:build`.
5. Ejecutar `npm test`.

No se debe cambiar el lock sólo para silenciar la validación: el contenido describe una fotografía exacta.

## Validaciones

```bash
npm run source:check    # hashes y worktrees fuente
npm run content:check   # frontmatter, Mermaid, padres, drill-down y catálogo
npm run lint            # aplicación visual
npm test                # todo lo anterior + build + smoke tests
```

`content:build` comprueba que todos los IDs y padres existen, valida la sintaxis Mermaid, rechaza destinos de clic inexistentes y exige permalinks cuando `codeRefs: required`.

## Despliegue separado

El proyecto no importa código en tiempo de ejecución desde los repositorios analizados. Puede desplegarse como sitio independiente después de ejecutar:

```bash
npm ci
npm test
npm run build
```

`.openai/hosting.json` declara que no requiere D1 ni R2. La integración continua incluida ejecuta las mismas comprobaciones; cuando los repositorios fuente no estén disponibles en CI, se conserva el lock registrado y se validan contenido y enlaces fijados.

Para una VPS, el proyecto incluye `Dockerfile`, `docker-compose.yml` y la guía [`DEPLOYMENT.md`](DEPLOYMENT.md). El contenedor escucha por defecto en `127.0.0.1:3000` para colocarlo detrás de un proxy HTTPS.

## Estructura

```text
app/                         explorador interactivo
docs/architecture/           niveles C4
docs/00-llm-guide.md         entrada y orden de lectura para LLM
docs/flows/                  recorridos separados del frontend
docs/sequences/              interacciones temporales
docs/data/                   estado actual, DER objetivo e integración
docs/references/             commits, brechas y reglas documentales
docs/meta/source-lock.json   fotografía exacta de los repositorios
scripts/                     compilación y validación
public/generated/            catálogo derivado; no editar a mano
```
