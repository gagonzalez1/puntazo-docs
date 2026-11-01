---
id: documented-commits
title: Fuentes y versiones actuales
group: 05 · Referencias
order: 10
parent: overview
level: reference
status: mixed
authority: mixed
summary: Repositorios dueños, ramas por ambiente y evidencia separada del runtime.
diagram: false
---

# Fuentes y versiones actuales

Las ramas seleccionan fuentes; los SHA registran lo inspeccionado o desplegado. Un checkout histórico, una rama de trabajo o el tag `latest` no prueba integración ni publicación.

| Plano | Repositorio y ramas | Responsabilidad |
|---|---|---|
| Frontend | [gonzalotev/app-fidelidad](https://github.com/gonzalotev/app-fidelidad), `main` / `testing`; `origin/develop` seleccionada para la entrega iOS | Producto Expo y web de cada ambiente; iOS local todavía sin publicación |
| Backend dueño | [am-p/app-loyalty](https://github.com/am-p/app-loyalty), `main` | API, Backoffice API y migraciones; destino de promoción funcional |
| Backend fork | [gagonzalez1/app-loyalty](https://github.com/gagonzalez1/app-loyalty), `testing` para publicación histórica y `fork/develop` para trabajo iOS | Fork de trabajo/publicación; requiere promoción funcional al dueño |
| Landing | [gagonzalez1/puntazo-landing](https://github.com/gagonzalez1/puntazo-landing), `main` / `testing` | Marketing y entrada/proxy a Expo |
| Backoffice UI | `gagonzalez1/puntazo-backoffice` (privado), `testing` / `main` | UI interna; main preparada sin publicación activa |
| Docs | [gagonzalez1/puntazo-docs](https://github.com/gagonzalez1/puntazo-docs), `main` | Portal público separado; Markdown y catálogo generado |
| Legales | [gagonzalez1/puntazo-legal](https://github.com/gagonzalez1/puntazo-legal), `main` | Publicación legal con estado de revisión propio |
| Preview histórico | [gagonzalez1/puntazo-preview](https://github.com/gagonzalez1/puntazo-preview/tree/testing), `testing` | Integración anterior retenida; su Compose ya no atiende el tráfico actual |

La revisión del [estado observado](#/runtime-snapshot) registra HEAD, imágenes y configuración del 02/10/2026. Los enlaces de código siguen ramas móviles: hay que fetched/leer el HEAD vigente antes de afirmar una implementación nueva.

La [entrega iOS del 01/11/2026](#/ios-development) seleccionó `origin/develop` del frontend oficial, `fork/develop` del backend y la rama documental `docs/ios-development-20261101`. Frontend y backend están guardados y publicados: frontend HEAD `3c5de4262a2f101309d9418734d67a025069b4fa`, PR [#110](https://github.com/gonzalotev/app-fidelidad/pull/110); backend fork `90cde5d29f86c8f16dfb91ab4273c48dd4f45dc4`, con promoción al dueño [#47](https://github.com/am-p/app-loyalty/pull/47) y CI verde [run 41279693752](https://github.com/gagonzalez1/app-loyalty/actions/runs/41279693752). El commit frontend `69ad97f` conserva los CI verdes [41279001660](https://github.com/gonzalotev/app-fidelidad/actions/runs/41279001660) y [41278998988](https://github.com/gonzalotev/app-fidelidad/actions/runs/41278998988). `52eb49c` corrigió opciones StoreKit/safe areas; `84829bc` agregó recuperación del JWS verificado (TypeScript + 31 pruebas dirigidas); HEAD `3c5de42` añade selección explícita del centro del mapa, aún sin validación UI/persistencia. La compra Xcode local y restore repetido tras reload se probaron; OSLog confirmó finish y lista pendiente vacía para la restauración repetida. Servicios Apple reales siguen pendientes. El backend CI citado corresponde a `90cde5d`. El baseline backend `9c802f7` incorpora upstream `676e052` y el PR publicado de Backoffice #46, todavía no integrado en el dueño. Freshness online verificó docs `976cf21`, frontend `origin/develop` `3c5de42` y backend `fork/develop` `90cde5d`; el índice cubre 45/45 sin referencias rotas. Un commit publicado o PR abierto no actualiza otras ramas ni runtime. Mis logros PR104 no forma parte de esta integración.

1. Seleccionar repositorio dueño y rama de integración explícitamente.
2. Fetch y comparar checkout; preservar trabajo local si está sucio o desactualizado.
3. Comparar fuente con runtime y con decisiones aprobadas. Un PR cerrado o un conteo ahead no prueba promoción funcional.
4. Antes del build/deploy, verificar checkout limpio en el HEAD remoto actual.
5. Después, comprobar imagen, salud y versión pública. Registrar SHA como evidencia, nunca como selector de la próxima entrega.
