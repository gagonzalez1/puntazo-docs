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

1. El código fijado a los commits documentados define lo implementado.
2. `BACKEND_SPEC_CORREGIDO.md` `v1.4-draft` define la dirección objetivo acordada.
3. Este mapa resume ambos y debe indicar siempre a cuál de las dos capas se refiere.

## Significado de estados

| Estado | Interpretación |
|---|---|
| Implementado | Existe en el código y, cuando corresponde, cruza la API o persiste |
| Mixto | Parte real y parte mock/derivada |
| Mock | Funciona sólo con estado o datos locales |
| Propuesto | Contrato o modelo objetivo sin implementación equivalente |
| Brecha | Comparación que requiere una decisión o desarrollo |

## Reglas para humanos y LLM

- No inferir que un endpoint del spec existe: confirmarlo en C4 Backend o la matriz pantalla–API.
- No usar `rol`, `plan` y `tipo_cuenta` como sinónimos.
- No traducir automáticamente `tienda` mock a `marca`: el modelo objetivo agrega sucursales, membresías y permisos.
- Cada afirmación técnica debería incluir un permalink al commit o declararse expresamente como propuesta.
- Al actualizar un flujo, revisar sus vistas hijas, la matriz de integración y el documento de brechas.
