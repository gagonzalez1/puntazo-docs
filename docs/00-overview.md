---
id: overview
title: Mapa de arquitectura Puntazo
group: 00 · Inicio
order: 0
level: hub
status: current
authority: mixed
summary: Puerta de entrada al mapa C4, los flujos del frontend, las secuencias y los datos.
diagram: true
---

# Mapa de arquitectura Puntazo

Documentación independiente y navegable del estado real de Puntazo. Los archivos Markdown y sus bloques Mermaid son la fuente de verdad; la aplicación web sólo los transforma en una experiencia visual.

El mapa distingue **implementado**, **mock** y **propuesto** para no confundir el código actual con el spec de destino.

```mermaid
flowchart LR
    CTX["C4 · Contexto"]
    CNT["C4 · Contenedores"]
    FEF["Flujos del frontend"]
    SEQ["Secuencias"]
    DATA["Datos"]
    REF["Código y commits"]
    BE["Backend · revisión"]
    REL["Entrega · release"]

    CTX --> CNT
    CNT --> BE
    CNT --> FEF
    CNT --> SEQ
    SEQ --> DATA
    DATA --> REF
    BE --> REL

    click CTX href "#/c4-context" "Abrir contexto"
    click CNT href "#/c4-containers" "Abrir contenedores"
    click FEF href "#/frontend-flows" "Abrir flujos"
    click SEQ href "#/sequences" "Abrir secuencias"
    click DATA href "#/data-current" "Abrir datos"
    click REF href "#/documented-commits" "Abrir referencias"
    click BE href "#/backend-review-index" "Abrir revisión del backend"
    click REL href "#/production-release-checklist" "Abrir checklist de release"
```

## Convenciones

- **Verde:** integración real con el backend.
- **Ámbar:** implementación mock o en memoria.
- **Azul:** interfaz y navegación.
- **Rojo:** brecha o contrato pendiente.

Use los nodos del diagrama para profundizar. La barra lateral permite saltar directamente a cualquier vista.
