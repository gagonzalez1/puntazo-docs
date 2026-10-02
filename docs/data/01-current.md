---
id: data-current
title: Datos · Estado implementado
group: 04 · Datos
order: 10
parent: overview
level: data
status: mixed
summary: Modelo documental histórico y lecturas del ledger real para la entrega analítica.
diagram: true
codeRefs: required
---

# Datos · Estado implementado

## Lectura analítica por período · entrega 01/10/2026

Esta entrega agrega lecturas reales de `historial_movimientos`, `tarjetas`, `marcas` y membresías vigentes. No crea tablas ni cambia saldos. Clientes atendidos es un conteo distinto de la identidad de cliente referida por la tarjeta; no equivale a tarjetas actualmente activas. Desactivar un cliente no borra las operaciones históricas del período. Las series cuentan acumulaciones y canjes confirmados, con ceros en intervalos sin actividad.

El esquema y párrafos anteriores corresponden al estado histórico del portal; no describen la base actual de testing. Ver [el flujo implementado en la rama de trabajo](#/flow-merchant-analytics), pendiente de integración y despliegue.

```mermaid
erDiagram
    USERS {
      int id PK
      string email UK
      string password_hash
      string google_id
      string name
      string role
      int id_shop
      int id_client
      datetime created_at
    }
```

PostgreSQL contiene una sola tabla creada al iniciar el servidor. Tiendas, clientes, tarjetas, sucursales y movimientos permanecen como arrays/objetos en memoria en el frontend.

## Dos capas de datos

- [Modelo objetivo consolidado](#/data-target): propuesta marca–sucursal del spec `v1.5-review`.
- [Matriz pantalla–API](#/integration-matrix): qué datos ya viajan y cuáles siguen locales.

## Referencias de código

- [DDL de users](https://github.com/am-p/app-loyalty/blob/main/internal/repository/user.go#L10-L15)
- [Tipos de dominio del frontend](https://github.com/gonzalotev/app-fidelidad/blob/main/src/types/db.ts#L1-L89)
