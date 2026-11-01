---
id: sequence-apple
title: Secuencia · Identidad Apple
group: 03 · Secuencias
order: 35
parent: sequences
level: sequence
status: mixed
summary: Challenge con nonce, identidad Apple y sesión Puntazo en fuentes locales; proveedor externo pendiente de configuración y prueba.
diagram: true
codeRefs: required
authority: mixed
---

# Acceso y vinculación con Apple

**Delta de fuentes locales del 01/11/2026.** El comportamiento está implementado en el candidato de desarrollo, con pruebas controladas; no se declara publicado ni autenticado contra una cuenta Apple real. Ver [evidencia iOS](#/ios-development-evidence).

```mermaid
sequenceDiagram
 participant F as Expo iOS
 participant A as API Puntazo
 participant IDP as Apple Identity
 participant P as PostgreSQL
 F->>A: POST /v1/auth/apple/challenge, purpose login
 A->>P: Guardar hash del nonce, propósito y expiración de cinco minutos
 A-->>F: challenge_id, nonce, expires_at
 F->>IDP: Solicitud nativa con nonce sin transformar
 IDP-->>F: identityToken, authorizationCode y nombre inicial cuando disponible
 F->>A: POST /v1/auth/apple con prueba y datos de alta
 A->>IDP: Verificar JWKS, firma, issuer, audience, expiry y nonce
 A->>P: Resolver subject sin unir por email
 alt Alta incompleta
 A-->>F: ACCOUNT_TYPE_REQUIRED o REGISTRATION_PROFILE_REQUIRED
 Note over A,IDP: El código y el challenge siguen sin consumirse
 else Cuenta existente o alta completa
 A->>IDP: Intercambiar código y validar la identidad devuelta
 A->>P: Transacción: cuenta, identidad cifrada, nonce consumido y sesión
 A-->>F: AuthData de Puntazo
 F->>A: GET /v1/me
 A-->>F: Usuario y auth_methods.apple
 end
```

## Contrato

`POST /v1/auth/apple/challenge` admite `login`, `link` y `reauthenticate`. Los dos últimos requieren sesión y el challenge queda ligado a esa cuenta/sesión. El servidor guarda sólo el hash del nonce; su consumo se confirma en la transacción de autenticación. Un propósito distinto, expiración o replay no concede sesión.

La prueba contiene `challenge_id`, `id_token` y `authorization_code`. Para alta, `name`, `apellido`, tipo de cuenta y datos comerciales siguen la validación de Google. La implementación acepta `account_type` y su alias `tipo_cuenta`, rechazando valores contradictorios. El frontend conserva temporalmente el nombre inicial y la prueba en memoria mientras completa el perfil; no persiste credenciales Apple en el storage del onboarding.

El subject de Apple identifica la cuenta vinculada. Coincidir en email no autoriza unir ni crear una sesión sobre una cuenta existente: responde `APPLE_LINK_REQUIRED`. El usuario debe ingresar por su método actual y vincular expresamente.

## Vinculación y reautenticación

- `POST /v1/auth/apple/link`: sesión vigente, autenticación reciente de hasta diez minutos, nueva prueba de propósito `link` y versión de cuenta. Un email relay diferente es válido; no cambia la cuenta ni su correo principal.
- `POST /v1/auth/reauthenticate`: `{version,apple:{challenge_id,id_token,authorization_code}}`, excluyente con password o Google. El subject debe ser el ya vinculado.
- Link/reauth rotan sesión y `auth_version`, revocando las sesiones anteriores. Las versiones se revalidan bajo bloqueo de cuenta; el cliente conserva el transporte HTTP y control de versiones vigentes.
- `APPLE_AUTH_UNAVAILABLE` indica configuración ausente/fallo del proveedor; no activa una identidad de pruebas. `APPLE_IDENTITY_CONFLICT` evita asociar un subject a otra cuenta.

## Baja y datos

`auth_methods.apple` permite seleccionar el método de reautenticación disponible. El export incluye subject, email relay y fecha de vínculo, excluyendo tokens/códigos/nonces. La baja retira la identidad y persiste una revocación cifrada en la misma transacción; un worker reintenta aunque Apple esté caído. El proveedor de billing y su binding permanente son independientes de esa identidad.

## Referencias de código

- [Servicio de identidad existente](https://github.com/gagonzalez1/app-loyalty/blob/develop/internal/service/auth.go) y [sesión frontend](https://github.com/gonzalotev/app-fidelidad/blob/develop/src/features/auth/store/useAuthStore.ts), como entradas de las ramas móviles.
- Delta local backend: `internal/appleidentity`, `internal/{handler,service,repository}/apple_auth*`, `internal/model/apple_auth.go`, `migrations/0044_apple_identity.*.sql`.
- Delta local frontend: `src/features/auth/services/appleIdentityService.ts`, `nativeAppleIdentity.ios.ts`, `src/components/AppleSignInButton` y `AuthMethodsManager.tsx`. Los commits finales aún deben registrarse en la evidencia de integración.
