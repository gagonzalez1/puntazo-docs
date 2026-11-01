---
id: ios-development-evidence
title: iOS · Evidencia y pendientes
group: 06 · Entrega
order: 20
parent: ios-development
level: reference
status: mixed
summary: Registro de fuentes locales y comprobaciones; separa pruebas de código, harness, credenciales, artefactos y publicación.
diagram: false
authority: mixed
---

# Evidencia del desarrollo iOS

**Corte 01/11/2026. No es un acta de release ni de despliegue.** El [alcance aprobado](#/ios-development) está implementado en ramas de desarrollo; las PR de promoción siguen abiertas. Los enlaces al [runtime histórico](#/runtime-snapshot) conservan su fecha y no prueban la entrega iOS.

## Punto de partida y reconciliación

| Plano | Rama seleccionada y evidencia inicial | Estado de esta entrega |
|---|---|---|
| Docs | `gagonzalez1/puntazo-docs`, rama `docs/ios-development-20261101`, checkout inicial `ec111db` | Freshness online verificó la rama seleccionada en `ec111db`; índice de 45 Markdown sin omisiones ni referencias rotas |
| Frontend oficial | `gonzalotev/app-fidelidad`, `origin/develop`, `69ad97f445cb7c96d69686b7497ba72a77d41909` | Cambios guardados y publicados; PR borrador [#110](https://github.com/gonzalotev/app-fidelidad/pull/110). No implica merge a `main`/`testing` ni distribución |
| Backend de trabajo/publicación | `gagonzalez1/app-loyalty`, `fork/develop`, commit `90cde5d29f86c8f16dfb91ab4273c48dd4f45dc4` | Cambios guardados y publicados; CI verde [run 41279693752](https://github.com/gagonzalez1/app-loyalty/actions/runs/41279693752). PR de promoción [#47](https://github.com/am-p/app-loyalty/pull/47) al dueño; baseline `9c802f7` conserva upstream `676e052` y PR46 de Backoffice aún no integrado en el dueño |
| Backend dueño | `am-p/app-loyalty`, `main` | PR #47 abierto para revisión; no afirmar que el cambio esté integrado. No hay despliegue automático de `develop` |
| Publicación | App Store Connect/TestFlight/runtime | No hay subida a App Store Connect, TestFlight, Sandbox ni despliegue acreditados |

Estos SHA son evidencia histórica, nunca instrucciones para elegir la fuente del próximo build. Los reportes de contexto y el contrato de trabajo se conservan en el workspace en `reports/ios-implementation-20261101/`; no contienen credenciales y no sustituyen un nuevo fetch.

## Comprobaciones y límites

| Comprobación | Evidencia disponible al redactar | Lo que sigue pendiente |
|---|---|---|
| Documentación | Freshness online verificó docs `origin/main` `9e91ff0` y frontend `origin/develop` `69ad97f`; cobertura: 45 Markdown sin faltantes ni referencias rotas. La comprobación online del backend en `backend-xcode-live-context.json` verificó `fork/develop` en `90cde5d29f86c8f16dfb91ab4273c48dd4f45dc4` | Catálogo generado y referencias validadas; construcción del portal consignada en el informe de reconciliación. No publicado |
| Identidad/backend CI | En `90cde5d29f86c8f16dfb91ab4273c48dd4f45dc4`: `go test -race ./...`, `go vet ./...` y CI aprobados; suites de firmas/JWKS, nonce, perfil incompleto, vínculo, sesiones, concurrencia, export y revocación durable | Credenciales de producción/Sandbox y consentimiento Apple en dispositivo |
| Billing backend | Pruebas locales de JWS/certificados, bindings, capacidad, trial/referidos, expiración, revocación y cola durable; restauración tokenless v1.1. CA Xcode autofirmada con `CA=true` y sólo `DigitalSignature` se admite únicamente para validación directa/pinning Xcode; Production/Sandbox conservan validación estricta. Test opcional `TestXcodePrivateEvidence` aprobó con JWS privado real; fixture sintética no requiere archivo privado | Transacciones/notificaciones de App Store reales, productos, grupo y ofertas configurados en Apple |
| Prueba HTTP backend | API local `127.0.0.1:18080`, backend `90cde5d29f86c8f16dfb91ab4273c48dd4f45dc4`: recibo firmado por SDK Xcode aceptado `200` y persistido en `APPLE/ACTIVE`, capacidad 1; duplicado `200` mantuvo una fila; firma alterada `400`; restauración a otra marca `409`; `newPurchases=false` respondió `503` mientras la sincronización de una compra existente funcionó durante trial activo | Comprueba JWS Xcode→API HTTP local, no el puente JS de Expo IAP con StoreKit ni App Store Server API/Sandbox reales. Evidencia sin recibos privados: `reports/ios-implementation-20261101/backend-real-xcode-http.json` |
| Frontend | En `69ad97f`: CI completo verde, [run 41279001660](https://github.com/gonzalotev/app-fidelidad/actions/runs/41279001660) y [run 41278998988](https://github.com/gonzalotev/app-fidelidad/actions/runs/41278998988): 333 pruebas unitarias, 9 de configuración, Expo Doctor 18/18, 156/156 navegador (11,5 min), audit 0 | Login Apple/Google iOS real y recorrido combinado StoreKit→API siguen sin validación |
| QA nativa local | Sobre la app Release gratuita local y API de desarrollo aislada `127.0.0.1:18080`, con frontend `69ad97f` y backend `90cde5d`; sin writes de producción. Login email sintético, onboarding comercial sin pago, sesiones restauradas al relanzar, acumulación manual UI, canje UI confirmado y persistido; Google Maps con tiles/markers reales en selector y cliente; permisos de ubicación, Settings y recenter con posición simulada; iPad login/QR en retrato y paisaje | Ver el desglose y límites enseguida. No acredita publicación, compra Apple ni identidad Google/Apple real. Reporte seguro: `reports/ios-implementation-20261101/native-visual-qa.json` |
| Harness nativo interno | `expo-iap` 3.4.13 compiló. Nueve pruebas reales `SKTestSession` pasaron en Simulator runtime 26.2 (23C52), UDID `0767CAB0-3F60-4286-9B06-657967B2B2CB`; xcresult y log consignados abajo | Estas pruebas Swift no certifican el puente JS Expo IAP ni el API backend conectado |
| Edición gratis | Export del source `69ad97f`, mapa `9ac7e41857bd4631cf84822e95ff2b04ac1c39001d4fc6850927575d70f4e77e`: cero módulos `expo-iap`, feature y rutas Mercado Pago prohibidas. El build nativo gratuito final de `69ad97f` terminó correctamente: iOS15.1+, familias iPhone/iPad, veinte manifests de privacidad, Google Maps enlazado y ausencia de IAP en pods, proveedor de módulos y binario. Un arranque firmado previo `e65121c` mostró login/onboarding sin alerta de Handoff | La QA visual local usa esta edición gratuita. No equivale a TestFlight/App Store; IAP permanece fuera de esta edición |
| Google Maps | SDK Maps iOS habilitado y clave restringida a bundle `com.puntazo.app`/EAS preview; proyecto billing habilitado. QA nativa local confirmó tiles y markers del selector de dirección y mapa de cliente; la ubicación se probó tras cambiar permiso en Settings y con localización simulada del simulador | Confirma esas rutas en el simulador configurado; no certifica todas las interacciones táctiles ni dispositivos reales |
| Google OAuth iOS | Preparación en código; decisión explícita de posponer configuración externa | Cliente OAuth iOS y prueba real de audiencia/URL scheme |
| Separación de ediciones | Export gratuito de `69ad97f` verificado por source map: módulos y rutas prohibidas ausentes | Build final gratis `69ad97f` correcto y sin módulo nativo IAP; la edición interna no prueba el puente JS ni integración combinada |
| Legales/ficha/review | Requisitos y datos pendientes identificados | Completar cuenta Apple, privacidad, capturas, rating, cifrado, usuarios demo y App Review |

## QA visual y funcional local · iOS 26.5

La verificación operó la aplicación Release gratuita conectada a la API de desarrollo aislada `http://localhost:18080` y su base local `puntazo_ios_impl_20261101`. Se usaron cuentas sintéticas; no se escribieron datos en producción ni se desplegó el código. Fuentes identificadas: frontend `69ad97f445cb7c96d69686b7497ba72a77d41909` y backend `90cde5d29f86c8f16dfb91ab4273c48dd4f45dc4`. El informe seguro es `reports/ios-implementation-20261101/native-visual-qa.json`; preparación de fixture: `reports/ios-implementation-20261101/native-fixture-preparation.json`.

- Email login de comercio y cliente sintéticos; onboarding de comercio, selección de Sellos y primer beneficio sin pago. Las sesiones de cliente/comercio y iPad se restauraron tras cerrar y relanzar la app.
- Permiso de cámara denegado: el ingreso manual de código siguió disponible. La búsqueda del código sintético `CL-1` mostró vista previa y confirmó en UI la acumulación inicial de 0 a 1 sello.
- Para habilitar el premio de diez sellos, se prepararon nueve acumulaciones adicionales mediante llamadas legítimas a la API de preview/acumulación (sin SQL directo). El canje se revisó y confirmó desde la UI; el movimiento `CANJE` persistido fue consultado de forma independiente y dejó el saldo en cero. Un primer intento de fixture con clave de idempotencia inválida fue rechazado `422` antes de escribir.
- El selector de dirección mostró tiles de Google y el marker guardado; al cancelar volvió a la lista de sucursales. El mapa del cliente mostró los tiles y comercio/dirección correctos y seleccionó su tarjeta correspondiente. La ubicación se solicitó por acción del usuario: al denegarla, el mapa y catálogo siguieron utilizables con guía de permiso bloqueado. Se abrió Ajustes, se concedió “Al usar la app”, y al volver se actualizó el estado. Una coordenada simulada del Obelisco permitió recentrar, mostrar posición y distancia, y ordenar comercios cercanos.
- El permiso de biblioteca de fotos denegado devolvió al perfil; al reintentar, la interfaz mostró el aviso explícito para permitir acceso. No se seleccionaron ni subieron fotos.
- En iPad Pro 11-inch M4 con iPadOS 26.5 se inspeccionaron login y QR restaurado en retrato, y QR/navegación inferior en paisaje. Se reutilizó el mismo artefacto Release, sin recompilar específicamente para iPad.

Persisten límites de esta sesión: los gestos de arrastrar/pellizcar y selección de coordenada no se completaron; cámara real y selección/subida de fotos no se probaron (sólo denegación y fallback); el picker nativo de Files abrió, pero no se completó subida, publicación ni render PDF; tampoco se certifica la regresión completa de iPad. El mapa en pantalla se observó, pero estas pruebas no cubren todas sus interacciones. No se probó el puente JavaScript de IAP ni el flujo compra/restauración UI; las nueve pruebas `SKTestSession` y la prueba HTTP con JWS Xcode son evidencia separada y no equivalen a esa integración. Google OAuth iOS fue pospuesto y Apple Developer/identidad Apple real siguen pendientes.

## Harness nativo StoreKit interno

Las nueve pruebas cubrieron veinte productos sin intro, compra con token de marca y finalización diferida, renovación, expiración, reembolso, Ask to Buy aprobado/declinado, restauración, y offer code de 50%/un mes sin `appAccountToken` seguido de renovación normal. Se ejecutaron en runtime 26.2. Un intento anterior de ocho pruebas en runtime 26.5 falló con `SKInternalErrorDomain` 3; DTS confirmó la limitación en [Apple Developer Forums](https://developer.apple.com/forums/thread/826971), por lo que no se cuentan como aprobadas en ese runtime. Evidencia local: `/tmp/puntazo-ios-storekit262-v11.log` y `frontend/test-results/ios-storekit-native/StoreKit.xcresult`.

El primer artefacto gratuito usó `CODE_SIGNING_ALLOWED=NO` y falló al acceder a Keychain (-34018). El firmado ad hoc corrigió ese problema; el build final `69ad97f` terminó correctamente. El manifiesto de artefactos seguro está en `reports/ios-implementation-20261101/free-ios-native-audit.json`; su binario tiene SHA256 `9c50a13e77e6a67d9cc25b942305bb00276878ba4e2845588c26b003f89b2cb4`. Las nueve pruebas StoreKit locales y la prueba HTTP con JWS Xcode no acreditan distribución, acceso Sandbox, puente JS de Expo IAP conectado ni ejecución de App Store Server API. La validación directa/pinning del certificado Xcode está restringida al modo Xcode; Production y Sandbox mantienen validación estricta. No aceptar el certificado de pruebas para conceder derechos en esos entornos.

## Cierre necesario antes de construir o publicar

1. Terminar la integración y registrar commits, PR abiertos/mergeados, pruebas definitivas y worktrees activos. Mantener PR104 Mis logros excluido.
2. Google OAuth iOS fue pospuesto por el usuario. Completar credenciales de Apple/ofertas. La QA local cubrió onboarding, mapas y algunas vistas iPad; permanecen pendientes cámara real, selección/subida de fotos, flujo y render PDF, gestos táctiles y regresión completa iPad. Cuenta Apple Developer no pagada; identidad real de Apple, APNs, AASA, ofertas y Sandbox/TestFlight siguen pendientes. El aviso legal v1.1 está incrustado como borrador sin aprobación legal ni publicación.
3. Fetch de cada rama seleccionada, preparar checkout en su HEAD remoto vigente y ejecutar `verify-context.py --require-clean`. Un fetch no actualiza por sí solo los archivos de otro checkout.
4. Construir la edición elegida, registrar el SHA resuelto como evidencia e inspeccionar módulo nativo, bundle JavaScript, permisos y destino API.
5. Si se autoriza publicación, verificar por separado procesamiento, disponibilidad TestFlight, revisión y release. Subir el binario no acredita aprobación.

El contrato API mantenido en `puntazo-docs/openapi.yaml` contiene propuestas históricas. El contrato implementado del backend es la referencia del delta HTTP; no se reclasifica todo el OpenAPI objetivo por agregar estas páginas.
