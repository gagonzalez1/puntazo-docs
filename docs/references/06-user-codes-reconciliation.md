---
id: user-codes-reconciliation
title: Entrega · Códigos públicos de usuario
group: 05 · Referencias
order: 60
parent: documented-commits
level: reference
status: mixed
authority: agreed
summary: Cambio aprobado e implementado en ramas de revisión; dependencia 0032, evidencia de pruebas y activación pendiente.
diagram: false
codeRefs: required
---

# Códigos públicos de usuario · reconciliación

Decisión aprobada por el usuario el 30/09/2026 y desarrollada en las ramas
`feat/user-codes-20260930`. **No implica integración en main ni despliegue**.
Consultar los HEAD remotos seleccionados antes de continuar; los SHAs siguientes
son evidencia histórica de esta entrega y no selectores para futuros builds.

## Comportamiento

Gabriel / Gonzalez → `GG-1`, Gabriel / Gutierrez → `GG-2`, Gonzalo / Tevez →
`GT-1`. Cada prefijo empieza en 1 y su contador es global entre clientes,
propietarios y empleados. Se toma la primera letra de cada campo, mayúscula y sin
tildes: María José / Pérez López → `MP-1`. Ambos campos deben contener letras.
El código queda fijo tras el alta. Las cuentas anteriores conservan su código
`#USER-0001` efectivo, sin backfill. Las PK/FK numéricas, marcas y sucursales no
cambian. El código público identifica; no autoriza.

## Fuentes y checkouts

| Fuente | Rama seleccionada y remote | Checkout activo | Evidencia del candidato |
|---|---|---|---|
| Backend dueño `am-p/app-loyalty` | `fork/feat/user-codes-20260930` (fork de publicación `gagonzalez1/app-loyalty`) | `.worktrees/user-codes/backend` | `d9761a477e2a995470cf0f208e374b39d85c1b3c` |
| Frontend dueño `gonzalotev/app-fidelidad` | `origin/feat/user-codes-20260930` | `.worktrees/user-codes/frontend` | `709742813454425f7123acb75bfb2b3569f324c7` |
| Documentación `gagonzalez1/puntazo-docs` | `origin/docs/user-codes-20260930` | `.worktrees/user-codes/docs` | Base main fresca `9a6eff0`; borradores originales preservados en `puntazo-docs` |

Backend parte de `origin/main` fresco `f938647` e incorpora localmente la rama
prerrequisito [PR #24](https://github.com/am-p/app-loyalty/pull/24), todavía abierta
al revisar. Frontend se actualizó al nuevo `origin/main` `ca0cd0e` durante la
entrega, conservando sus cambios de personal, dependencias y plazo gratuito.
Los checkouts principales no se movieron ni se borraron sus trabajos.

## PRs de revisión

- [Backend #25](https://github.com/am-p/app-loyalty/pull/25), draft a main del dueño. Depende del PR24; no integrar antes de reconciliar 0032/0033.
- [Frontend #32](https://github.com/gonzalotev/app-fidelidad/pull/32), draft a main del dueño. Publicar después de API/migración.
- CI Backend #25 y Frontend #32: aprobado. Backend CI aplicó migraciones dos veces, race, vet, vulnerabilidades alcanzables, OpenAPI y build de imagen.
- [Backend #23](https://github.com/am-p/app-loyalty/pull/23), cookie de Backoffice ajena a este cambio, preservada en su checkout.

## Persistencia y rutas de alta

`0033_user_codes` se aplica después de `0032_first_login_trial` del PR24.
`usuarios.codigo_usuario TEXT UNIQUE` admite NULL para cuentas anteriores;
`contadores_codigo_usuario(prefijo, ultimo_numero)` guarda la reserva permanente.
`allocateUserCode` usa `INSERT ... ON CONFLICT ... DO UPDATE ... RETURNING` dentro
de la misma transacción del alta. El rollback revierte usuario y contador. No
reiniciar contadores tras bajas; el trigger preserva el código al editar y la
anonimización lo conserva. `down0033` aborta: usar una corrección hacia adelante.

Altas: email (`apellido`), comercio (`owner_last_name`), invitación (`apellido`)
y Google (`given_name`, `family_name` verificados; el cliente sólo completa lo
que falte). Las aplicaciones antiguas sin apellido reciben 422
`REGISTRATION_PROFILE_REQUIRED` con un mensaje de actualización. Para Google
nuevo, `ACCOUNT_TYPE_REQUIRED` incluye `details.profile` y `missing_fields`.
Una cuenta existente inicia sesión sin completar campos nuevos.

`user_code` se publica en autenticación, perfil, exportación, pasaporte, personal,
clientes del comercio y preview de movimientos. El frontend lo muestra sin
construir códigos nuevos desde el ID. `customer_code` acepta código nuevo y
anterior, minúsculas y `#` opcional; consulta sólo CLIENTE_FINAL activo y mantiene
los controles de rol, sucursal, preview e idempotencia. Búsqueda comercial:
coincidencia exacta de código, ID numérico y búsqueda parcial por nombre/email.

## Pruebas y límites

- `go test ./...` con PostgreSQL 16.14 local en esquemas aislados: aprobado.
- `go vet ./...`: aprobado.
- `go test -race -count=1 ./...` con PostgreSQL: aprobado.
- OpenAPI Redocly 2.20.3: válido (warning previo de servidor localhost).
- Ejemplos, compuestos, tildes, Unicode descompuesto, espacios, falta de letras,
  rollback por email y fallo posterior al INSERT, edición, anonimización y no
  reutilización: aprobados.
- 16 altas simultáneas por email y 16 por Google; la prueba de códigos repetida
  cinco veces: aprobada. Google detectó contención serializable y ahora usa un
  presupuesto de reintentos con jitter limitado a las altas.
- Propietarios email/Google, empleados, invitaciones repetidas, replay comercial,
  login Google anterior sin perfil, completar apellido y respetar claims
  verificados: aprobados.
- Acumulación/canje, permisos y búsqueda exacta/numérica con código nuevo y
  anterior: aprobados contra PostgreSQL.
- `npm run typecheck` y 112 pruebas unitarias: aprobados en frontend SDK54.
- Build web con Expo 54.0.37: aprobado; configuración de API sólo local.
- 20 pruebas Chromium de primer acceso, Google, rutas y códigos: aprobadas.
- Registro web contra Go/PostgreSQL creó GG-1; propietario creado GT-1. Perfil
  muestra código servidor, acumulación real y búsqueda exacta #gg-1 aprobadas.
  El arnés web sólo añade transporte CORS local; respuestas y transacciones
  provienen de la API real, sin fixtures de dominio.
- Android: APK debug local con Expo SDK54 / RN 0.81.5 compilado e instalado
  en un emulador API36 con paquete de pruebas separado. Registro real de
  Gabriel / Gutierrez creó `GG-2`; pasaporte, perfil y configuración lo muestran.
  Login del propietario y búsqueda nativa `gg-1` encontraron a Gabriel / Gonzalez
  con `GG-1` contra la API/PostgreSQL locales.
- Google real requiere credencial del proveedor; las pruebas automatizadas usan
  verificación/servicio GIS controlados. No se ejercitó un consentimiento OAuth
  real en el dispositivo.

Builds locales: backend binario `65c4ebe` y web `420a880`; los commits posteriores
hasta los candidatos citados sólo ajustan formato o fixtures de pruebas.
El APK Android se construyó desde `709742813454425f7123acb75bfb2b3569f324c7`.
No confundir el candidato fuente con el binario local ni con el runtime público.

Los logs y gates de fuente limpia están en `/tmp/puntazo-user-codes-*.log` y
`/tmp/puntazo-user-codes-*-build-context.json` en el host de esta tarea. Nunca
usarlos como fuente para un build nuevo; repetir fetch y gate en el checkout real.

## Activación pendiente

1. Reconciliar e integrar PR24 con 0032 en `am-p/app-loyalty`; comprobar que no
   existe otra 0033 ni una migración omitida. No renumerar historia aplicada.
2. Integrar migración/API de códigos; aplicar hasta 0033 y comprobar readiness.
3. Publicar frontend compatible. El frontend antiguo debe actualizar para altas.
4. Verificar runtime del ambiente elegido y nuevas cuentas antes de anunciar
   activación. Esta entrega no modifica testing ni producción.

## Referencias de código

- [Asignación atómica](https://github.com/gagonzalez1/app-loyalty/blob/feat/user-codes-20260930/internal/repository/user_code.go)
- [Migración](https://github.com/gagonzalez1/app-loyalty/blob/feat/user-codes-20260930/migrations/0033_user_codes.up.sql)
- [OpenAPI implementado en la rama](https://github.com/gagonzalez1/app-loyalty/blob/feat/user-codes-20260930/openapi.yaml)
- [Google](https://github.com/gagonzalez1/app-loyalty/blob/feat/user-codes-20260930/internal/service/auth.go)
- [Pruebas PostgreSQL](https://github.com/gagonzalez1/app-loyalty/blob/feat/user-codes-20260930/internal/repository/user_code_integration_test.go)
- [Formularios y selector](https://github.com/gonzalotev/app-fidelidad/blob/feat/user-codes-20260930/app/(auth)/account-type.tsx)
- [Identificación manual](https://github.com/gonzalotev/app-fidelidad/blob/feat/user-codes-20260930/src/features/demo/lib/customer-code.mjs)
- [Pruebas web](https://github.com/gonzalotev/app-fidelidad/blob/feat/user-codes-20260930/tests/browser/user-codes.spec.ts)
