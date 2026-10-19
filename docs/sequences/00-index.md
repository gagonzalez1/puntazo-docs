---
id: sequences
title: Secuencias principales
group: 03 · Secuencias
order: 0
parent: overview
level: hub
status: current
summary: Secuencias actuales de identidad, sesión y movimientos persistidos.
diagram: true
authority: source_code
---

# Secuencias de ejecución

```mermaid
flowchart LR
 A[Secuencias actuales] --> R[Registro]
 A --> L[Login]
 A --> G[Google]
 A --> S[Restauración]
 A --> M[Acumulación y canje]
 click R href "#/sequence-register" "Abrir registro"
 click L href "#/sequence-login" "Abrir login"
 click G href "#/sequence-google" "Abrir Google"
 click S href "#/sequence-restore" "Abrir restauración"
 click M href "#/sequence-scan" "Abrir movimientos"
```

Estas vistas describen las rutas reales de las fuentes revisadas. Para saber qué configuración está publicada, leer [Estado observado](#/runtime-snapshot).

El [código de verificación del registro](#/sequence-registration-email-code) documenta el acuerdo posterior del 19/10/2026, ya implementado y probado en las fuentes enlazadas. Está publicado y habilitado en testing; la recepción en bandeja real y la QA física siguen pendientes. Producción conserva su versión anterior.
