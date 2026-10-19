---
id: flow-branch-menu-pdf
title: Comercio y cliente · Menú PDF V1
group: 02 · Flujos frontend
order: 260
parent: customer-flows
level: flow
status: mixed
summary: Publicación PDF por sucursal y lectura de cliente a pantalla completa, con controles separados para comercio.
diagram: true
codeRefs: required
authority: mixed
---

# Menú PDF V1 por sucursal

Implementación autorizada el **18/10/2026**. La V1 está implementada, publicada y comprobada en testing; las fuentes y los límites de la aceptación se registran en [Estado observado](#/runtime-snapshot). No acredita una entrega productiva. V2 digital/IA permanece únicamente como idea futura.

## Recorrido inicial de V1

```mermaid
sequenceDiagram
  actor T as Propietario o administrador
  participant UI as Mi Tienda - Menú
  participant API as API Go
  participant S as Storage privado
  participant DB as PostgreSQL
  actor C as Cliente o visitante
  T->>UI: Elegir sucursal y PDF
  UI->>API: Subir archivo con If-Match
  API->>API: Validar PDF y límites
  API->>S: Guardar objeto inmutable
  API->>DB: Confirmar borrador
  API-->>UI: Estado y URL de vista previa
  T->>UI: Revisar y publicar
  UI->>API: Publicar document_id con If-Match
  API->>DB: Cambiar publicación atómicamente
  C->>UI: Ver menú desde mapa, tarjeta o enlace
  UI->>API: Consultar publicación pública
  API-->>C: URL firmada de corta duración
  C->>S: Abrir PDF en visor del navegador o dispositivo
```

Mi Tienda incorpora Menú, con sucursal explícita y estados de borrador/publicación separados. Elegir un archivo no publica su contenido. La tienda puede previsualizar, publicar, reemplazar, descartar el borrador o retirar la publicación. Los límites y los errores se muestran en la misma sección. Los operadores no administran documentos ni leen borradores privados.

El cliente abre el menú desde el mapa o las tarjetas. Cuando la tarjeta corresponde a una marca con varias sucursales, debe elegirla en una lista alfabética. El mapa calcula cercanía cuando dispone de ubicación real; el selector de tarjetas no usa ubicación. El enlace público estable `/menu/:branchId` y su QR permiten consultar sin cuenta ni instalación. Un local sin publicación muestra «Menú todavía no disponible».

El corte inicial de V1 usaba el visor del navegador/dispositivo con alternativa explícita; la lectura interna de testing se describe a continuación. No se incorpora un renderer PDF nativo pesado. La ficha modal del mapa se cierra antes de navegar, para mantener accionable el botón de apertura. Los archivos menores de 1 MiB muestran su tamaño en KiB. Cada apertura/vista previa resuelve una URL vigente; una URL vencida no equivale a un menú retirado. El QR del menú no reemplaza el QR de identidad del cliente.

## Lectura de cliente a pantalla completa · testing PR71/72

[PR71 frontend](https://github.com/gonzalotev/app-fidelidad/pull/71) y [PR72](https://github.com/gonzalotev/app-fidelidad/pull/72), integradas y desplegadas en la rama seleccionada `testing` como `9074aa57fe84d8f0ec03d50898d532d4857ce4c3`. Implementación autorizada y lectura pública comprobada contra testing real; fuentes y límites de aceptación en [Estado observado](#/runtime-snapshot).

La consulta de cliente y visitante `/menu/:branchId` ocupa todo el ancho y alto útil, respeta las áreas seguras y presenta un único botón superpuesto «Volver». PR72 reserva **56 px iniciales dentro del scroll** para que ese botón no tape el título, manteniendo el iframe a todo el ancho y alto. Quita marca/sucursal, nombre del archivo, cantidad de páginas, cabeceras y barras de herramientas. No muestra «Abrir aparte», recarga, zoom ni selector de página en el recorrido de lectura. Los estados de carga/error siguen informando el resultado sin añadir herramientas al documento. Sin historial, Volver regresa a la entrada de la app. El asistente de primer ingreso se oculta sólo mientras la ruta comienza con `/menu/` y vuelve al salir; no se marca como completado por leer el PDF.

`/pdf-viewer/read.html` conserva el renderer local pero usa `reader.js` para recorrer todas las páginas con scroll continuo. Se preparan sus dimensiones y se dibujan de forma diferida las páginas cercanas al área visible. El presupuesto compartido de todos los canvas es de **seis millones de píxeles**; al alejarse una página se cancela su trabajo y se libera la superficie. El redimensionado vuelve a ajustar el ancho. El texto extraído queda disponible para accesibilidad sin añadir una barra visible.

Un fallo del visor solicita una sola renovación automática del enlace firmado. Los errores repetidos del mismo visor y los eventos durante esa consulta no consumen otro intento; un fallo del visor renovado muestra el mensaje de error. Salir o cambiar de sucursal cancela/ignora trabajo anterior. No hay reintentos indefinidos ni PDF persistido.

La vista previa del comercio conserva `/pdf-viewer/index.html`, controles de página/zoom/texto, «Recargar PDF» y «Abrir aparte». La lectura de cliente sigue exigiendo firma y renderer del mismo origen. No cambia API, base de datos, 30 MiB/1–30 páginas, permisos ni TTL. La exportación JS nativa pasó; no se generó ni distribuyó APK/AAB nuevo y no acredita QA física ni actualización del cliente instalado.

- [Reader continuo](https://github.com/gonzalotev/app-fidelidad/blob/testing/public/pdf-viewer/reader.js)
- [Ruta de cliente](https://github.com/gonzalotev/app-fidelidad/blob/testing/app/menu/%5BbranchId%5D.tsx)

## Corte PR70 · lectura interna del 18/10/2026

Implementación autorizada el **18/10/2026**, [PR70 frontend](https://github.com/gonzalotev/app-fidelidad/pull/70), integrada y desplegada en `testing` como `b7de8ec5414c3e7144fa87bb700e9c2e6e4c00a6`. La aceptación del recorrido real se registra por separado en [Estado observado](#/runtime-snapshot).

`MenuPdfViewer` integra PDF.js **6.4.299**, servido desde `/pdf-viewer/` con sus worker, fuentes, CMaps y decodificadores locales. Web usa un iframe del mismo origen; Android usa `react-native-webview` **13.15.0**, compatible con Expo SDK 54, para cargar el mismo renderer. Se dibuja una página por vez en canvas, con anterior/siguiente, zoom, ajuste al ancho y texto extraído cuando el PDF lo contiene. No hay servicio externo de visualización ni extracción de productos.

«Recargar PDF» vuelve a consultar el enlace firmado; «Abrir aparte» conserva la apertura existente y permite las URLs HTTPS de storage externo. El visor interno exige que la URL firmada y el origen web coincidan: no reescribe firmas ni incorpora un proxy nuevo. Los límites del contrato siguen en **30 MiB y 1–30 páginas**. La descarga valida MIME, `%PDF-` y tamaño real, se cancela al cerrar o tras 90 segundos; el canvas se limita a seis millones de píxeles y el renderer admite imágenes de hasta 64 millones de píxeles. Estos límites de presentación no modifican la validación del backend.

La navegación del visor lleva la URL firmada en el fragmento, sin incluirla en la query del HTML ni en el referrer; la descarga del PDF sigue usando su query de firma. Documento y renderer no se precachean; no se persiste el PDF. El cierre cancela render/descarga y libera el worker. La CSP admite el iframe sólo en `/pdf-viewer/`, con scripts/recursos del propio origen; el resto de las páginas conserva la prohibición de ser enmarcado.

Todos los perfiles Android requieren `EXPO_PUBLIC_APP_URL` como origen HTTPS; con API testing debe ser `https://testing.puntazo.pro`. La validación de build rechaza ausencia u origen incompatible antes de omitir los controles OAuth de perfiles no productivos. Incorporar WebView requiere un nuevo build nativo; esta entrega web no actualiza un binario instalado. Las pruebas de navegador y exportación no acreditan QA física Android/iOS ni PWA instalada. No cambia API, esquema, permisos, TTL ni V2 futura.

## Apertura con PWA activa y límite ampliado

El reporte del 18/10 permitió reproducir un fallo que no aparecía en un contexto de navegador recién creado: un service worker activo respondía a la navegación del PDF firmado con `/login.html`, y Expo mostraba «Esta pantalla no existe». La descarga HTTP de la misma URL seguía siendo un PDF válido. No era un documento faltante.

La corrección excluye medios y API del fallback de navegación. Además, la apertura web de URLs del mismo origen descarga con `no-store`, comprueba MIME, cabecera `%PDF-` y un máximo real de 30 MiB, y abre un Blob PDF en la pestaña creada durante el gesto. Así también funciona mientras siga activo un SW anterior. Al cerrar el visor se libera el recurso; no se guarda en caché persistente. Las URLs HTTPS externas conservan navegación directa, sin exigir una nueva política CORS, y native conserva su visor/alternativa.

El enlace compartible continúa siendo `/menu/:branchId`. Una URL firmada copiada directamente vence a los cinco minutos: volver al enlace estable genera una nueva. La ampliación de archivo a 30 MiB no cambia páginas, permisos, publicación ni expiración. [Fuentes y aceptación del cambio](#/runtime-snapshot).

## Contrato implementado en testing

Las respuestas JSON usan el envelope habitual. El estado privado contiene `brand_id`, `branch_id`, `version`, `draft` y `published`; ambos documentos pueden ser null. Sin estado previo, la versión lógica es 1 y GET no escribe. Las mutaciones usan ETag/If-Match: falta de condición devuelve 428 y una versión desactualizada 412.

| Ruta | Operación |
|---|---|
| `/v1/marcas/:brand_id/sucursales/:branch_id/menu` | GET del estado privado |
| La anterior + `/documentos` | POST multipart, único campo archivo, crea borrador |
| La anterior + `/publicacion` | PUT con document_id publica; DELETE retira |
| La anterior + `/borrador` | DELETE descarta el borrador |
| `/v1/public/sucursales/:branch_id/menu` | GET público de la publicación vigente o null |
| `/v1/public/marcas/:brand_id/menus` | GET de sucursales elegibles y disponibilidad del menú |

Los documentos públicos exponen nombre saneado, MIME, tamaño, cantidad de páginas, fecha y URL/expiración. No exponen object keys, borradores, datos personales ni membresías. Marca y sucursal deben seguir activas, sin baja. La administración requiere propietario/administrador activo y la pertenencia exacta entre marca y sucursal; no basta ocultar botones en la UI.

## Archivo, persistencia y concurrencia

- PDF de hasta **30 MiB**, **1–30 páginas**, estructuralmente válido y sin cifrado/contraseña. Se aceptan escaneos. Un parser real valida el contenido con tiempo y recursos acotados, sin red; no se extraen productos o precios. Los errores estructurados de cifrado, incluso permisos representados como uint32 por algunos productores, se rechazan con la indicación de quitar la protección.
- Storage privado existente, objetos inmutables con checksum y estado persistido de carga. La migración nueva **0041_branch_pdf_menus** amplía el esquema 0040 sin cambiar versiones aplicadas. La ampliación posterior `0042_branch_pdf_30mib` lleva el CHECK de tamaño a 30 MiB y conserva intacta 0041; documentos, hashes y punteros no se reescriben.
- Borrador y publicación se actualizan bajo transacción; orden de locks marca → sucursal → menú/documentos. Un reemplazo fallido antes del commit conserva la publicación vigente.
- Un error de transporte después del commit deja resultado incierto: la UI debe reconsultar y pedir revisión si hubo conflicto, en lugar de adoptar silenciosamente otra versión o deshacer una publicación posterior.
- Las URLs firmadas duran como máximo cinco minutos. Retirar impide nuevas firmas; las existentes pueden seguir vigentes hasta expirar. La limpieza física se programa con margen, lease y reintentos; no debe borrar un objeto que aún esté referenciado.
- La baja efectiva de marca/sucursal retira sus documentos. Anonimizar un propietario conserva la publicación si la marca sigue activa con otro propietario.

El candidato backend depende del trabajo de mapa 0036–0040 todavía propuesto al propietario: el main oficial observado termina en 0035 y testing requiere 0042 para la ampliación de tamaño de esta entrega. El trabajo separado de turnos con otras migraciones 0036–0038 debe conciliarse antes de su integración. `puntazo-preview` está retirado.

## Criterios de aceptación

Subida válida, vista previa, publicación, cliente y enlace sin sesión; sucursal correcta; roles y aislamiento; archivo falso/protegido/excedido/>30 páginas; fallo de reemplazo, carreras y respuesta incierta; retiro; URL renovada; migración limpia/upgraded e idempotencia. Comprobar móvil/escritorio contra testing real. Una prueba con API simulada o export JS nativo no acredita QA física Android/iOS ni PWA instalada.

## Referencias de código

- [Servicio backend PDF](https://github.com/gagonzalez1/app-loyalty/blob/closed-test-readiness/internal/service/menu.go)
- [Persistencia por sucursal](https://github.com/gagonzalez1/app-loyalty/blob/closed-test-readiness/internal/repository/menu.go)
- [Editor del comercio](https://github.com/gonzalotev/app-fidelidad/blob/testing/src/features/merchant/components/CommercialBranchMenuEditor.tsx)
- [Página pública](https://github.com/gonzalotev/app-fidelidad/blob/testing/app/menu/%5BbranchId%5D.tsx)
