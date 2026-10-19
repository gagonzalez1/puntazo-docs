---
id: sequence-registration-email-code
title: Secuencia · Código de verificación del registro
group: 03 · Secuencias
order: 60
parent: sequences
level: sequence
status: mixed
authority: mixed
summary: Código de registro publicado y habilitado en testing con esquema 0043; recepción en bandeja real y QA física pendientes, sin promoción productiva.
diagram: true
codeRefs: optional
---

# Código de verificación del registro

**ACORDADO por el usuario el 19/10/2026, IMPLEMENTADO y PUBLICADO en testing.** API y frontend están saludables y el esquema `0043` está aplicado en testing. La pantalla pública y el bundle se verificaron; la recepción en una bandeja real sigue pendiente de una dirección de prueba libre elegida por el usuario. No se envió un correo a las cuentas existentes para cerrar esa aceptación. La captura local no acredita recepción mediante el proveedor SMTP público. Producción no recibió este cambio.

## Política por ambiente

| Ambiente | `EMAIL_VERIFICATION_REQUIRED` | Alta nueva por email y contraseña |
|---|---|---|
| Testing durante la aceptación | `true` | Cuenta pendiente, correo con código y bloqueo de acceso hasta verificar |
| Testing después de la aceptación | `false` | Sesión inmediata; no se genera código ni correo de verificación |
| Producción | `true` obligatorio | Cuenta pendiente; la configuración productiva rechaza `false` y exige SMTP operativo |

La variable se configura en el backend y su cambio requiere reiniciar o redesplegar ese servicio. El frontend sigue `verification_required` de la respuesta y no deduce la política a partir del dominio o de una variable pública. Desactivarla sólo cambia las altas nuevas: no verifica ni habilita cuentas pendientes anteriores y no traslada verificaciones de testing a producción.

La regla alcanza a clientes y comercios que usan email y contraseña. Google conserva su validación del proveedor. Recuperación de contraseña, cambio de email e invitaciones mantienen sus contratos propios.

## Recorrido acordado

```mermaid
sequenceDiagram
 actor U as Persona
 participant F as App
 participant A as API
 participant P as PostgreSQL
 participant W as Worker SMTP
 U->>F: Registro cliente o comercio
 F->>A: Alta con verification_method=code
 alt Verificación deshabilitada
  A->>P: Crear cuenta verificada y sesión
  A-->>F: verification_required=false y sesión
  F-->>U: Continuar al inicio correspondiente
 else Verificación habilitada
  A->>P: Cuenta pendiente, huella del código y outbox cifrado
  A-->>F: verification_required=true y registration_token
  W->>P: Reclamar y validar correo vigente
  W-->>U: Código de seis dígitos
  U->>F: Ingresar o pegar código
  F->>A: Confirmar email, código y registration_token si existe
  A->>P: Validar y consumir código y verificar cuenta
  alt Contexto de registro válido
   A-->>F: verified=true, sesión y usuario
   F-->>U: Acceso automático
  else Sin contexto válido
   A-->>F: verified=true sin sesión
   F-->>U: Iniciar sesión con contraseña
  end
 end
```

## Contrato implementado en las fuentes revisadas

- `/v1/auth/register` y `/v1/demo/comercios` aceptan `verification_method: "code"`. La omisión conserva el contrato de enlaces para clientes anteriores; los clientes nuevos solicitan código.
- El alta pendiente con código responde `verification_required: true`, `verification_method: "code"` y `registration_token`, sin sesión. Este último secreto permite el acceso automático sólo desde el contexto del mismo registro y vence a los treinta minutos, independientemente de la vigencia de diez minutos de cada código.
- `POST /v1/auth/email-verification/code/request` recibe `{email}` y responde `202` genérico sin revelar si la cuenta existe, está verificada o admite reenvío.
- `POST /v1/auth/email-verification/code/confirm` recibe `{email, code, registration_token?}`; responde un envelope con `data: {verified: true, session?, user?}`. El código es texto, no un número: debe conservar ceros iniciales.
- Una confirmación válida sin contexto de registro verifica el correo y requiere login posterior. Las sesiones emitidas siguen el manejo actual de refresh: cookie HttpOnly en web y almacenamiento seguro en nativo.

El contexto pendiente se conserva fuera de URLs y logs, con almacenamiento de sesión en web y seguro en nativo; se limpia al completar, cerrar sesión o iniciar un nuevo registro. La pantalla admite teclado numérico, pegado completo, estados de confirmación/error y reenvío con espera visible.

## Seguridad y persistencia

- Código aleatorio de seis dígitos, vigencia de diez minutos y máximo de cinco intentos. Los errores consumen intentos persistidos aunque la solicitud falle.
- Reenvío a partir de sesenta segundos, sujeto además a los presupuestos de correo existentes; un código nuevo invalida el anterior.
- Huella con clave secreta, asociada a usuario y propósito. El código sólo se conserva cifrado mientras sea necesario para la entrega; no aparece en respuestas de API ni en logs.
- La confirmación consume el código y marca el correo verificado transaccionalmente. Dos confirmaciones concurrentes no pueden reutilizarlo.
- El worker reutiliza la cola SMTP existente y comprueba vigencia antes de enviar para descartar mensajes sustituidos.
- La migración `0043_email_verification_codes` está implementada y aplicada en testing. Preserva el historial: el main oficial base contiene `0035` y la rama de publicación testing contenía hasta `0042`; el manifest admite la reserva de esos números sin exigir migraciones ajenas a cada fuente. Se ensayó en una restauración aislada y se ejecutó dos veces en live, con el segundo pase sin cambios. Producción conserva `0035`.

## Fuentes y validación · 19/10/2026

| Plano | Evidencia |
|---|---|
| Backend propietario | [PR #40 a `am-p/app-loyalty`](https://github.com/am-p/app-loyalty/pull/40) abierto con CI aprobado; fuente `7c87f3b`, sobre el ajuste de fixture `2645c11`. No se integró ni publicó en producción |
| Frontend | [PR #83](https://github.com/gonzalotev/app-fidelidad/pull/83) integrado en `gonzalotev/app-fidelidad:testing`; commit publicado `c7b13f35bd412b40f09a376d990e19cdc1a554e2`, fuente revisada `7b284b4` |
| Backend testing | Publicado desde `gagonzalez1/app-loyalty:closed-test-readiness`, commit `f976d2999c6001d2c8a78099ee44f7e74c2f6bb2`. Incluye integración `2525d2f` sobre `ea831cf` y ajuste de fixtures de migraciones heredadas; conserva las funcionalidades anteriores de testing |
| Backend local | Suite completa PostgreSQL, race de integración en 67,9 segundos, `go vet`, OpenAPI e imagen Docker API aprobados; OpenAPI conserva tres advertencias preexistentes |
| Frontend local | 173 pruebas Node, TypeScript, seis pruebas de navegador y Expo Doctor 18/18 aprobados; build web y exportación JavaScript Android aprobados |
| Recorrido HTTP local | Registro → captura de correo → confirmación con sesión automática → rechazo de reutilización, aprobado |
| Variable deshabilitada | Comprobación HTTP en ejecución con `false`: altas nuevas con sesión directa y cero correos en outbox; cuentas pendientes anteriores todavía bloqueadas |
| Preparación de migración testing | Respaldo cifrado, restauración aislada y upgrade `0042` → `0043` aplicado dos veces; recuentos y huellas de menús preservados |
| Migración live testing | `0042` → `0043`, dos pases; preservados 103 usuarios, 38 marcas, 39 sucursales, 42 tarjetas y 207 movimientos, con huellas de menús/documentos idénticas |
| API pública testing | [Versión](https://api-testing.puntazo.pro/v1/version) con `f976d29`/`0043` y [readiness](https://api-testing.puntazo.pro/v1/health/ready) HTTP 200; despliegue `sikwlzjfv5gn6mtt9dbssmy5` terminado |
| Configuración efectiva testing | `EMAIL_VERIFICATION_REQUIRED=true`, `MAIL_PROVIDER=smtp`, `EXPECTED_SCHEMA_VERSION=0043`; configuración SMTP y credenciales conservadas |
| Web pública testing | Despliegue `b8atkluanbjatqo7soqoitvr` terminado el 19/10/2026 a las 19:55:12 UTC; campo de código visible tras actualizar el service worker anterior |
| Integridad del bundle público | `/_expo/static/js/web/entry-76190cfb695766e2e7d0d62dc31bfcf5.js`, SHA-256 `c448f82791916093bbd668b5e392a7b12b7f6a7c52d64b6d1990977f94a8307b`, idéntico al contenedor. Service worker y lector comprobados |
| Producción | API conserva `dbeb03c`/`0035`, salud HTTP 200; sin promoción del backend o frontend de este cambio |

La exportación JavaScript Android no acredita una nueva compilación nativa ni aceptación en un dispositivo físico. Los SHA anteriores registran la evidencia revisada y no seleccionan futuras compilaciones o despliegues.

## Aceptación pendiente y operación

Falta completar el recorrido con entrega a una bandeja real usando una dirección de prueba libre elegida por el usuario, para clientes y comercios. No se modifican cuentas existentes ni se da por recibida una comunicación basándose en configuración SMTP, outbox o captura local. La evidencia local ya cubre bloqueo previo, acceso automático, variable deshabilitada, ceros iniciales, errores, vencimiento, intentos, reenvío, reutilización, concurrencia y aislamiento entre cuentas. La QA física/nativa y un nuevo AAB siguen fuera de lo verificado.

Tras la aceptación, testing puede volver a `EMAIL_VERIFICATION_REQUIRED=false` mediante API/UI oficial de Coolify y redespliegue; las cuentas pendientes conservarán el requisito. Producción debe exigir verificación cuando se promueva esta funcionalidad, con las validaciones y pruebas correspondientes. Los controles de Google, enlaces anteriores, recuperación e invitaciones se conservaron.

Registro operativo privado: workspace Contabo, `puntazo/email-code-20261019.md`. Evidencia local: `Puntazo/artifacts/email-verification-20261019/`, incluida `verification-testing.png`. La propuesta documental es [PR #13](https://github.com/gagonzalez1/puntazo-docs/pull/13); publicar la funcionalidad no implica que este portal ya haya publicado la documentación.

El código pertenece a `am-p/app-loyalty` y `gonzalotev/app-fidelidad`; el fork de backend es sólo fuente de publicación para testing. La incorporación a una rama no prueba despliegue ni entrega SMTP. Los SHA observados son evidencia histórica y no seleccionan una próxima compilación.
