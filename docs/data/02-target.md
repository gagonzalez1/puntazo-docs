---
id: data-target
title: Datos · Modelo objetivo v1.5-review
group: 04 · Datos
order: 20
parent: data-current
level: data
status: target
authority: mixed
summary: DER propuesto de identidad unificada, marcas, sucursales, suscripciones y saldos compartidos.
diagram: true
---

# Datos · Modelo objetivo v1.5-review

> Este diagrama **no representa migraciones implementadas**. Es la propuesta consolidada en `BACKEND_SPEC_CORREGIDO.md` para orientar el desarrollo.

```mermaid
erDiagram
    USUARIOS {
        int id_usuario PK
        string email UK
        string password_hash
        string google_id UK
        string nombre
        string qr_token UK
        string tipo_cuenta
        boolean activo
    }
    MEMBRESIAS_MARCA {
        int id_membresia PK
        int id_usuario FK
        int id_marca FK
        string rol
        boolean activo
    }
    MEMBRESIAS_SUCURSALES {
        int id_membresia PK
        int id_sucursal PK
        boolean activo
    }
    MARCAS {
        int id_marca PK
        int id_card_template FK
        string nombre
        string email
        string color_marca
        string color_secundario
        boolean activo
    }
    SUCURSALES {
        int id_sucursal PK
        int id_marca FK
        string nombre
        string direccion
        boolean activo
    }
    PLANES {
        int id_plan PK
        string codigo UK
        int precio_base_centavos
        boolean activo
    }
    SUSCRIPCIONES {
        int id_suscripcion PK
        int id_marca FK
        int id_plan FK
        string estado
        datetime fecha_inicio
    }
    SUSCRIPCION_SUCURSALES {
        int id_suscripcion_sucursal PK
        int id_suscripcion FK
        int id_sucursal FK
        int precio_mensual_centavos
        string estado
    }
    PROGRAMAS_FIDELIDAD {
        int id_programa PK
        int id_marca FK
        string tipo
        int cantidad_fija
        int importe_por_unidad_centavos
        string moneda
        boolean activo
    }
    BENEFICIOS {
        int id_beneficio PK
        int id_programa FK
        string nombre
        int requisito_cantidad
        boolean activo
    }
    TARJETAS {
        int id_tarjeta PK
        int id_usuario FK
        int id_marca FK
        int saldo_sellos
        int saldo_puntos
    }
    HISTORIAL_MOVIMIENTOS {
        int id_movimiento PK
        int id_tarjeta FK
        int id_sucursal FK
        int id_beneficio FK
        int id_usuario_operador FK
        string tipo_saldo
        string operacion
        string sentido
        int cantidad
        int saldo_anterior
        int saldo_posterior
        int importe_compra_centavos
        string idempotency_key UK
    }
    CARD_TEMPLATES {
        int id_card PK
        string codigo UK
        string tipo_programa
        boolean activo
    }

    USUARIOS ||--o{ MEMBRESIAS_MARCA : integra
    MARCAS ||--o{ MEMBRESIAS_MARCA : tiene
    MEMBRESIAS_MARCA ||--o{ MEMBRESIAS_SUCURSALES : habilita
    SUCURSALES ||--o{ MEMBRESIAS_SUCURSALES : asigna
    MARCAS ||--o{ SUCURSALES : posee
    MARCAS ||--o{ SUSCRIPCIONES : contrata
    PLANES ||--o{ SUSCRIPCIONES : define
    SUSCRIPCIONES ||--o{ SUSCRIPCION_SUCURSALES : factura
    SUCURSALES ||--o{ SUSCRIPCION_SUCURSALES : incluye
    CARD_TEMPLATES ||--o{ MARCAS : personaliza
    MARCAS ||--o{ PROGRAMAS_FIDELIDAD : configura
    PROGRAMAS_FIDELIDAD ||--o{ BENEFICIOS : ofrece
    USUARIOS ||--o{ TARJETAS : posee
    MARCAS ||--o{ TARJETAS : emite
    TARJETAS ||--o{ HISTORIAL_MOVIMIENTOS : recibe
    SUCURSALES o|--o{ HISTORIAL_MOVIMIENTOS : origina
    USUARIOS o|--o{ HISTORIAL_MOVIMIENTOS : registra
    BENEFICIOS o|--o{ HISTORIAL_MOVIMIENTOS : aplica
```

## Decisiones que expresa

- `usuarios` unifica identidad, autenticación, perfil y QR; no existe `clientes_finales`.
- `tipo_cuenta` no es un plan. Distingue `CLIENTE_FINAL` de `PERSONAL_MARCA`.
- El rol operativo vive en `membresias_marca`: `PROPIETARIO`, `ADMINISTRADOR` u `OPERADOR`.
- Una marca posee varias sucursales. La suscripción pertenece a la marca y cobra cada sucursal activa.
- Una tarjeta representa cliente–marca; `saldo_sellos` y `saldo_puntos` se comparten entre todas sus sucursales.
- MVP 1 activa Sellos o Puntos. Guardar ambos saldos permite habilitar ambos programas después sin migrar tarjetas.
- Cada cambio de saldo produce un movimiento auditable e idempotente.
- Los puntos, sellos, importes y divisores usan enteros; no se usan valores de punto flotante.
- `sentido` separa crédito y débito sin almacenar cantidades negativas.

> La estructura de negocio combina decisiones acordadas con detalles físicos
> `PROPUESTA CODEX PC-09` y `PC-10`. Consulte el índice antes de implementar.

## Restricciones mínimas

| Entidad | Restricción |
|---|---|
| Membresía de marca | Única por usuario y marca |
| Tarjeta | Única por cliente final y marca; saldos no negativos |
| Programa | Único por marca y tipo; máximo uno activo en MVP 1 |
| Suscripción | Máximo una activa por marca |
| Ítem facturable | Único por suscripción y sucursal |
| Movimiento | Saldo y auditoría dentro de la misma transacción |

La fuente de detalle contractual sigue siendo `docs/BACKEND_SPEC_CORREGIDO.md` del workspace; este mapa la resume sin presentarla como código existente.
