---
id: data-current
title: Datos · Estado implementado
group: 04 · Datos
order: 10
parent: overview
level: data
status: current
summary: Tabla users real y estructuras mock que viven dentro del frontend.
diagram: true
codeRefs: required
---

# Datos · Estado implementado

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

- [DDL de users](https://github.com/am-p/app-loyalty/blob/f03b9aa202587510508a6f2a094b808f5ed6353d/internal/repository/user.go#L10-L15)
- [Tipos de dominio del frontend](https://github.com/gonzalotev/app-fidelidad/blob/99a350bd6e204a1f866d78dcfb20bd9bc108ffda/src/types/db.ts#L1-L89)
