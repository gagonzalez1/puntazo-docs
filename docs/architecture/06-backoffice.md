---
id: backoffice-architecture
title: Backoffice · Arquitectura e integración
group: 01 · Arquitectura C4
order: 60
parent: c4-containers
level: reference
status: mixed
authority: mixed
summary: UI separada con cookie propia y API del ambiente; testing activo y producción preparada.
diagram: true
---

# Backoffice · Arquitectura e integración

Revisión de fuentes y runtime del **02/10/2026, 22:30–22:33 UTC**. Los SHA y las diferencias por ambiente están en [Estado observado](#/runtime-snapshot). Esta revisión describe arquitectura e integración; no certifica todos los invariantes de negocio ni ejecuta operaciones sobre cuentas reales.

```mermaid
flowchart LR
 S[Staff interno] --> TLS[HTTPS]
 TLS --> UI[React · Nginx independiente]
 UI -->|mismo origen /v1/backoffice| API[API Go del ambiente]
 API --> U[(backoffice_users y sessions)]
 API --> R[(Campañas, referidos y precios)]
 API --> A[(Auditoría)]
 UI -. bloquea otras /v1 .-> X[404]
```

Testing está activo y su `/healthz` responde 200. Producción está preparada y no tiene contenedor; su estado `exited` no se interpreta como una caída de un servicio previamente publicado.

- El repositorio privado `gagonzalez1/puntazo-backoffice` posee la UI y su empaquetado. `am-p/app-loyalty` posee API y migraciones.
- Login usa email/contraseña del staff. La API guarda sesión separada del JWT de producto y emite cookie HttpOnly, Secure bajo HTTPS y SameSite Strict, limitada a `/v1/backoffice`.
- Las escrituras autenticadas exigen `X-Backoffice-Request: 1`. Las funciones distinguen roles de administración y finanzas.
- Nginx sólo proxifica `/v1/backoffice/*`; las demás `/v1/*` responden 404. Mantiene resolución renovable del upstream y respuestas sin caché.
- UI muestra clientes comerciales, campañas, influenciadores/códigos, atribuciones/recompensas y precios/historial según contrato y rol. La API mantiene las operaciones financieras.
- La imagen testing usa `latest` y no lleva etiqueta de revisión: su SHA fuente **no quedó acreditado por metadatos runtime**. El HEAD testing consultado no se atribuye automáticamente a ese contenedor.

No se publican usuarios, contraseñas ni datos de cuentas en Docs. El aislamiento de red sigue pendiente de demostración en la topología operativa.


## Referencias de código

- [Sesiones y cookie internas](https://github.com/am-p/app-loyalty/blob/main/internal/handler/backoffice.go)
- [Rutas actuales](https://github.com/am-p/app-loyalty/blob/main/cmd/server/router.go)
- [Persistencia interna](https://github.com/am-p/app-loyalty/blob/main/migrations/0023_referrals.up.sql)

## Publicación verificada · 29/10/2026

Producción publica Tiendas (antes Clientes; `#clientes` sigue funcionando) y
Usuarios. El nuevo `GET /v1/backoffice/users` requiere sesión propia y
`ADMIN_SISTEMA`; consulta cuentas de producto no dadas de baja, con búsqueda
literal por nombre/apellido/email, filtro de tipo de cuenta y paginación por ID
(50 por defecto, máximo 100). Devuelve identidad básica, estado, verificación del
email y fecha de alta. No selecciona secretos ni QR y no permite editar cuentas.

Fuente UI: `gagonzalez1/puntazo-backoffice:main`, revisión verificada `6c17760`
(PR3). Fuente API publicada con autorización del usuario:
`gagonzalez1/app-loyalty:release/backoffice-users-production-20261029`, `9c802f7`.
La base es el `main` oficial vigente `676e052`, más siete archivos de esta
funcionalidad. `am-p/app-loyalty:main` permanece intacto: la promoción funcional
PR46 espera aprobación del propietario y la publicación propia PR17 contiene
además la corrección OpenAPI3.1. La rama de publicación no cambia fork/main ni
testing. Los SHA acreditan esta entrega; futuros builds deben resolver la rama.

CI completo, build, permisos, búsqueda y filtros reales, salud y navegador
productivo: PASS. Se observaron21 cuentas (17clientes y4personal de tiendas),
sin datos personales en estos documentos. Esquema0043, sin nuevas migraciones;
precios públicos y definiciones de entorno preservados; pagos deshabilitados.
API y UI healthy, sin reinicios ni puertos host; recuperación conservada en VPS.
