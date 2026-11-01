---
id: overview
title: Mapa de arquitectura Puntazo
group: 00 · Inicio
order: 0
level: hub
status: mixed
authority: mixed
summary: Puerta de entrada al mapa C4, los flujos del frontend, las secuencias y los datos.
diagram: true
---

# Mapa de arquitectura Puntazo

Documentación independiente y navegable del estado real de Puntazo. Los archivos Markdown y sus bloques Mermaid son la fuente de verdad; la aplicación web sólo los transforma en una experiencia visual.

El mapa distingue **implementado**, **desplegado**, **pendiente** y **propuesto** para no confundir el código actual con el spec de destino.

```mermaid
flowchart LR
    CTX["C4 · Contexto"]
    CNT["C4 · Contenedores"]
    DEP["Topología en Coolify"]
    FEF["Flujos del frontend"]
    SEQ["Secuencias"]
    DATA["Datos"]
    REF["Código y commits"]
    BE["Backend · revisión"]
    IOS["iOS · fuentes locales"]

    CTX --> CNT
    CNT --> DEP
    CNT --> BE
    CNT --> FEF
    CNT --> SEQ
    SEQ --> DATA
    DATA --> REF
    CNT -. entrega en desarrollo .-> IOS

    click CTX href "#/c4-context" "Abrir contexto"
    click CNT href "#/c4-containers" "Abrir contenedores"
    click DEP href "#/coolify-deployment-topology" "Abrir despliegues en Coolify"
    click FEF href "#/frontend-flows" "Abrir flujos"
    click SEQ href "#/sequences" "Abrir secuencias"
    click DATA href "#/data-current" "Abrir datos"
    click REF href "#/documented-commits" "Abrir referencias"
    click BE href "#/backend-review-index" "Abrir revisión del backend"
    click IOS href "#/ios-development" "Abrir desarrollo iOS"
```

## Convenciones

- **Verde:** integración real con el backend.
- **Ámbar:** implementación mock o en memoria.
- **Azul:** interfaz y navegación.
- **Rojo:** brecha o contrato pendiente.

Use los nodos del diagrama para profundizar. La barra lateral permite saltar directamente a cualquier vista.

La [topología desplegada en Coolify](#/coolify-deployment-topology) resume los
recursos de producción y testing, incluidos los servicios separados de
Backoffice.

## Corte de runtime conservado · 02/10/2026

API y bases en esquema `0033`, servicios funcionales de comercio/fidelidad y UI Backoffice testing activa. Hay diferencias de configuración y publicación entre ambientes. Empezar por [estado observado](#/runtime-snapshot), [matriz de integración](#/integration-matrix) y [brechas](#/implementation-gaps). Para editar y compartir este recurso, ver [actualización documental](#/documentation-sync-plan).

## Desarrollo iOS · 01/11/2026

La primera edición pública será gratuita; la interna prepara StoreKit, catálogo y referidos. El [alcance aprobado y la configuración](#/ios-development), la [secuencia Apple](#/sequence-apple) y la [evidencia](#/ios-development-evidence) corresponden a fuentes locales sin despliegue. No se acredita ejecución nativa de la app ni App Store/TestFlight. Google Maps se prepara para mapa/dirección; Google OAuth iOS está pospuesto.
