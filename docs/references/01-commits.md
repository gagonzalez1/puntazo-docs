---
id: documented-commits
title: Commits documentados
group: 05 · Referencias
order: 10
parent: overview
level: reference
status: current
summary: Revisión exacta de frontend y backend usada como base de todo el mapa.
---

# Commits documentados

El contenido representa una fotografía del código. Toda afirmación sobre implementación debe poder rastrearse a estas revisiones.

| Repositorio | Commit completo | Fecha del commit | Estado al analizar |
|---|---|---|---|
| `gonzalotev/app-fidelidad` | `afec4792729b48de4646168846ab221c96352f51` | 2026-08-20 | revisado; cambio visual aprobado |
| `am-p/app-loyalty` | `f03b9aa202587510508a6f2a094b808f5ed6353d` | 2026-08-03 | limpio |

## Regla de actualización

1. Actualizar los hashes después de revisar ambos repositorios.
2. Corregir enlaces GitHub fijados al commit.
3. Ejecutar `npm run content:build` y `npm run validate`.
4. Revisar el documento de brechas antes de publicar.

La documentación propuesta del backend se consulta como contexto, pero no se etiqueta como implementada hasta que exista código equivalente.
