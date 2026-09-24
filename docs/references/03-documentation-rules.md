---
id: documentation-rules
title: Reglas de lectura y actualización
group: 05 · Referencias
order: 30
parent: documented-commits
level: reference
status: current
summary: Cómo interpretar estados, trazabilidad y precedencia sin confundir código con propuesta.
---

# Reglas de lectura y actualización

## Precedencia de evidencia

1. El código actual de la rama relevante define lo implementado; el runtime define lo desplegado.
2. Las decisiones etiquetadas `ACORDADO` en `BACKEND_SPEC_CORREGIDO.md` `v1.5-review` definen negocio confirmado.
3. Las decisiones `PROPUESTA CODEX PC-xx` y `openapi.yaml` completan el diseño, pero no son acuerdos hasta que el equipo las apruebe.
4. Este mapa resume esas capas y debe indicar tanto estado de implementación como autoridad.

## Significado de estados

| Estado | Interpretación |
|---|---|
| Implementado | Existe en el código y, cuando corresponde, cruza la API o persiste |
| Mixto | Parte real y parte mock/derivada |
| Mock | Funciona sólo con estado o datos locales |
| Propuesto | Contrato o modelo objetivo sin implementación equivalente |
| Brecha | Comparación que requiere una decisión o desarrollo |

## Significado de autoridad

| Etiqueta | Interpretación |
|---|---|
| Fuente: código | Comprobado en la rama y revisión vigentes al realizar el análisis |
| Acordado | Decisión de negocio confirmada por el equipo |
| Aprobada por el usuario | Decisión explícita para el release identificado; no implica implementación |
| Propuesta Codex | Diseño sugerido para revisión; todavía no aprobado |
| Autoridad mixta | La vista combina más de una de las capas anteriores |

## Reglas para humanos y LLM

- No inferir que un endpoint del spec existe: confirmarlo en C4 Backend o la matriz pantalla–API.
- No usar `rol`, `plan` y `tipo_cuenta` como sinónimos.
- No traducir automáticamente `tienda` mock a `marca`: el modelo objetivo agrega sucursales, membresías y permisos.
- Cada afirmación técnica debería enlazar al código de la rama vigente o declararse expresamente como propuesta.
- Al actualizar un flujo, revisar sus vistas hijas, la matriz de integración y el documento de brechas.
- No presentar una `PROPUESTA CODEX PC-xx` como decisión del equipo aunque figure en OpenAPI.
- Una aprobación debe actualizar el índice, quitar el estado pendiente y registrar la decisión asociada.
- `APROBADA_USUARIO` fija contrato objetivo, pero conserva estado `target` y
  `NOT_IMPLEMENTED` hasta verificar código, migraciones y pruebas en la revisión actual.
