---
id: data-current
title: Datos · Estado implementado
group: 04 · Datos
order: 10
parent: overview
level: data
status: current
summary: Modelo persistido de cuentas, marcas, catálogo, memberships, media y ledger verificado en PostgreSQL 16.
diagram: true
codeRefs: required
---
# Datos · Estado implementado

```mermaid
erDiagram
    ACCOUNTS ||--o{ MEMBERSHIPS : holds
    BRANDS ||--o{ BRANCHES : contains
    BRANDS ||--o{ PROGRAMS : owns
    PROGRAMS ||--o{ BENEFITS : offers
    ACCOUNTS ||--o{ CARDS : owns
    BRANDS ||--o{ CARDS : issues
    CARDS ||--o{ MOVEMENTS : records
    BRANDS ||--o{ MEDIA : stores
    ACCOUNTS ||--o{ EMAIL_TOKENS : receives
    ACCOUNTS ||--o{ SESSIONS : authenticates

    ACCOUNTS { bigint id PK string email UK string account_type }
    MEMBERSHIPS { bigint id PK bigint account_id bigint brand_id string role }
    BRANCHES { bigint id PK bigint brand_id boolean principal }
    PROGRAMS { bigint id PK bigint brand_id string type }
    BENEFITS { bigint id PK bigint program_id bigint requirement boolean active }
    CARDS { bigint id PK bigint customer_id bigint brand_id bigint balance }
    MOVEMENTS { bigint id PK bigint card_id bigint branch_id string operation bigint amount }
    MEDIA { uuid id bigint brand_id string tipo string estado }
```

La base nueva de la release aplica 17 migraciones numeradas. El esquema incluye
cuentas verificables, sesiones rotativas, invitaciones y outbox, marcas/sucursales/
programas/beneficios, tarjetas/movimientos con snapshots, media privada,
idempotencia, retención y reconciliación. La API no crea tablas al arrancar.

La app no debe tomar este modelo como `Tienda` global: un actor puede tener varias
membresías y un operador queda restringido a sus `branch_ids`. El identificador
de recursos de personal es `membership_id`, no `user_id`.

## Referencias de código

- [Esquema y migraciones](https://github.com/gagonzalez1/app-loyalty/blob/50e95e9407ee5ffaccfc3cebcbef464d24f26427/migrations/0017_media_reconciliation.up.sql)
- [Modelo Go y relaciones](https://github.com/gagonzalez1/app-loyalty/blob/50e95e9407ee5ffaccfc3cebcbef464d24f26427/internal/model/model.go)
- [Servicios de dominio frontend](https://github.com/gonzalotev/app-fidelidad/blob/1db7717e1aa28c2c1be7ba3538bfe9e22e0d0a01/src/features/merchant/services/merchantService.ts)
