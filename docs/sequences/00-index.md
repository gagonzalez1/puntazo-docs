---
id: sequences
title: Secuencias principales
group: 03 · Secuencias
order: 0
parent: overview
level: hub
status: mixed
summary: Secuencias actuales de identidad, sesión y movimientos persistidos.
diagram: true
authority: mixed
---

# Secuencias de ejecución

```mermaid
flowchart LR
 A[Secuencias actuales] --> R[Registro]
 A --> L[Login]
 A --> G[Google]
 A -. candidato iOS local .-> AP[Apple]
 A --> S[Restauración]
 A --> M[Acumulación y canje]
 click R href "#/sequence-register" "Abrir registro"
 click L href "#/sequence-login" "Abrir login"
 click G href "#/sequence-google" "Abrir Google"
 click AP href "#/sequence-apple" "Abrir Apple"
 click S href "#/sequence-restore" "Abrir restauración"
 click M href "#/sequence-scan" "Abrir movimientos"
```

Estas vistas describen las rutas reales de las fuentes revisadas. Para saber qué configuración está publicada, leer [Estado observado](#/runtime-snapshot).

La [secuencia Apple](#/sequence-apple) corresponde al desarrollo local del 01/11/2026; no acredita credenciales configuradas ni un login real en iPhone. [Evidencia y pendientes](#/ios-development-evidence)
