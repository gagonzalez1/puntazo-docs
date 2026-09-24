# Puntazo Architecture Docs

Proyecto independiente de documentación C4 y flujos de Puntazo. Las referencias al código siguen ramas móviles. Antes de afirmar qué versión está desplegada, consultar el HEAD remoto de la rama elegida y el runtime de testing.

La web está pensada para lectura humana y los archivos de `docs/` para lectura humana o por LLM. Markdown y los bloques Mermaid son la fuente de verdad; `public/generated/catalog.json` es un artefacto generado.

El punto de entrada para agentes es [`docs/00-llm-guide.md`](docs/00-llm-guide.md). Define precedencia, lectura mínima, estrategia de carga contextual e inventario completo de documentos.

## Qué incluye

- C4 de contexto, contenedores y componentes.
- Flujos frontend separados para autenticación, personal del comercio y cliente final.
- Una vista específica por pantalla funcional.
- Secuencias de registro, login, Google, restauración y escaneo.
- DER del estado implementado y DER objetivo `v1.4-draft`, claramente diferenciados.
- Matriz pantalla–API y brechas entre código y spec.
- Referencias al código de las ramas vigentes.
- Drill-down por clic, breadcrumbs, regreso, búsqueda, zoom, pan, descarga SVG e índice Markdown orientado a LLM.

## Requisitos

- Node.js `>=22.13.0`
- Los repositorios fuente como hermanos de esta carpeta permiten contrastar código y documentación.

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

Las referencias al código deben enlazar a ramas móviles, sin SHA fijo. Los nodos de Mermaid profundizan mediante `click NODE href "#/id-destino"`.

## Actualizar la documentación

1. Consultar los HEAD remotos de las ramas activas y el runtime de testing.
2. Revisar afirmaciones y enlaces a código afectados.
3. Ejecutar `npm run content:build`.
4. Ejecutar las validaciones pertinentes antes de publicar.

## Validaciones

```bash
npm run content:check   # frontmatter, Mermaid, padres, drill-down y catálogo
npm run lint            # aplicación visual
npm test                # todo lo anterior + build + smoke tests
```

`content:build` comprueba que todos los IDs y padres existen, valida la sintaxis Mermaid, rechaza destinos de clic inexistentes y exige enlaces al código cuando `codeRefs: required`.

## Despliegue separado

El proyecto no importa código en tiempo de ejecución desde los repositorios analizados. Puede desplegarse como sitio independiente después de ejecutar:

```bash
npm ci
npm test
npm run build
```

`.openai/hosting.json` declara que no requiere D1 ni R2. La integración continua incluida ejecuta las mismas comprobaciones; el catálogo y sus enlaces se validan sin exigir un checkout fuente fijo.

Para una VPS, el proyecto incluye `Dockerfile`, `docker-compose.yml` y la guía [`DEPLOYMENT.md`](DEPLOYMENT.md). El contenedor escucha por defecto en `127.0.0.1:3000` para colocarlo detrás de un proxy HTTPS.

## Estructura

```text
app/                         explorador interactivo
docs/architecture/           niveles C4
docs/00-llm-guide.md         entrada y orden de lectura para LLM
docs/flows/                  recorridos separados del frontend
docs/sequences/              interacciones temporales
docs/data/                   estado actual, DER objetivo e integración
docs/references/             fuentes, brechas y reglas documentales
scripts/                     compilación y validación
public/generated/            catálogo derivado; no editar a mano
```
