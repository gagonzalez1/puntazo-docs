---
id: markdown-index
title: Guía de lectura para LLM
group: 00 · Inicio
order: -10
parent: overview
level: guide
status: current
summary: Punto de entrada, precedencia y orden recomendado de todos los Markdown del proyecto.
diagram: false
codeRefs: optional
---

# Guía de lectura para LLM

Este archivo es el **punto de entrada recomendado para cualquier LLM o persona** que necesite trabajar sobre Puntazo. Los Markdown son la fuente de verdad documental; la aplicación visual sólo los presenta de manera navegable.

## Antes de responder o modificar el proyecto

1. Leer esta guía y seleccionar únicamente los documentos relacionados con la tarea.
2. Consultar el HEAD remoto de la rama activa y, si se habla de testing, `/api/v1/version`.
3. Distinguir siempre los estados `current`, `mixed`, `mock`, `gap` y `target`.
4. Verificar en el código actual cualquier afirmación que vaya a convertirse en implementación.
5. No presentar el modelo objetivo ni el backend spec como funcionalidad ya implementada.

## Lectura mínima recomendada

Para obtener contexto suficiente sin cargar toda la documentación:

1. [`docs/references/01-commits.md`](#/documented-commits) — ramas fuente y comprobación de la versión actual.
2. [`docs/references/03-documentation-rules.md`](#/documentation-rules) — reglas de precedencia y significado de los estados.
3. [`docs/00-overview.md`](#/overview) — mapa general y accesos a cada dominio.
4. [`docs/architecture/02-containers.md`](#/c4-containers) — límites entre app, API, base de datos y proveedores.
5. [`docs/data/03-integration-matrix.md`](#/integration-matrix) — qué está conectado y qué continúa simulado.
6. [`docs/references/02-gaps.md`](#/implementation-gaps) — brechas que no deben confundirse con comportamiento actual.
7. [`docs/backend/00-review-index.md`](#/backend-review-index) — decisiones de backend propuestas por Codex que requieren aprobación.

Después se debe abrir el flujo, la secuencia o el modelo de datos específico de la tarea.

## Inventario completo en orden de lectura

### 0. Entrada y reglas de verdad

1. [`docs/00-llm-guide.md`](#/markdown-index) — esta guía y el índice completo.
2. [`docs/references/01-commits.md`](#/documented-commits) — fuentes y versiones actuales.
3. [`docs/references/03-documentation-rules.md`](#/documentation-rules) — cómo leer, verificar y actualizar los documentos.
4. [`docs/references/04-documentation-sync-plan.md`](#/documentation-sync-plan) — revisión documental al avanzar las ramas.
5. [`docs/references/05-change-history.md`](#/documentation-change-history) — historial funcional de cada sincronización documental aceptada.
6. [`docs/00-overview.md`](#/overview) — puerta de entrada al mapa completo.

### 1. Arquitectura del sistema

5. [`docs/architecture/01-context.md`](#/c4-context) — actores, Puntazo y sistemas externos.
6. [`docs/architecture/02-containers.md`](#/c4-containers) — frontend, backend, PostgreSQL y proveedores.
7. [`docs/architecture/03-frontend-components.md`](#/frontend-components) — router, estado, servicios y pantallas Expo.
8. [`docs/architecture/04-backend-components.md`](#/backend-components) — capas y componentes implementados en Go.

### 2. Estado real de datos e integración

9. [`docs/data/01-current.md`](#/data-current) — tabla real y estructuras mock actuales.
10. [`docs/data/03-integration-matrix.md`](#/integration-matrix) — relación pantalla–API y contratos faltantes.
11. [`docs/references/02-gaps.md`](#/implementation-gaps) — diferencias entre código, documentación y propuesta.

### 3. Backend objetivo pendiente de aprobación

12. [`docs/backend/00-review-index.md`](#/backend-review-index) — checklist de decisiones `PC-01` a `PC-14`.
13. [`docs/backend/01-api-contract.md`](#/backend-api-contract) — dominios, permisos y contrato HTTP formalizado en `openapi.yaml`.
14. [`docs/backend/02-database-physical.md`](#/backend-database-physical) — tipos PostgreSQL, integridad, índices y concurrencia.
15. [`docs/backend/03-operations.md`](#/backend-operations) — sesiones, storage, migraciones y observabilidad.
16. [`docs/backend/04-backend-spec.md`](#/backend-full-spec) — spec normativo completo `v1.5-review`, con acuerdos y propuestas diferenciados.

### 4. Flujos del frontend

12. [`docs/flows/00-frontend-flows.md`](#/frontend-flows) — índice de recorridos del frontend.
13. [`docs/flows/01-auth.md`](#/flow-auth) — acceso, onboarding y restauración.
14. [`docs/flows/02-plan-selection.md`](#/flow-plan-selection) — selección de plan todavía local.
15. [`docs/flows/10-merchant-index.md`](#/merchant-flows) — índice del personal del comercio.
16. [`docs/flows/11-merchant-navigation.md`](#/flow-merchant-navigation) — navegación comercial.
17. [`docs/flows/12-merchant-customers.md`](#/flow-merchant-customers) — clientes del comercio.
18. [`docs/flows/13-merchant-scanner.md`](#/flow-merchant-scanner) — escaneo QR.
19. [`docs/flows/14-merchant-profile.md`](#/flow-merchant-profile) — marca, recompensa y plantilla.
20. [`docs/flows/15-merchant-analytics.md`](#/flow-merchant-analytics) — métricas actuales.
21. [`docs/flows/20-customer-index.md`](#/customer-flows) — índice del cliente final.
22. [`docs/flows/21-customer-navigation.md`](#/flow-customer-navigation) — navegación del cliente.
23. [`docs/flows/22-customer-passport.md`](#/flow-customer-passport) — identidad y pasaporte QR.
24. [`docs/flows/23-customer-cards.md`](#/flow-customer-cards) — tarjetas de fidelidad.
25. [`docs/flows/24-customer-profile.md`](#/flow-customer-profile) — perfil real y campos derivados.

### 5. Secuencias de ejecución

26. [`docs/sequences/00-index.md`](#/sequences) — índice de interacciones temporales.
27. [`docs/sequences/01-register.md`](#/sequence-register) — registro por email.
28. [`docs/sequences/02-login.md`](#/sequence-login) — login por email.
29. [`docs/sequences/03-google.md`](#/sequence-google) — acceso con Google.
30. [`docs/sequences/04-restore.md`](#/sequence-restore) — restauración de sesión.
31. [`docs/sequences/05-scan.md`](#/sequence-scan) — escaneo actual y corte hacia la futura API.

### 6. Diseño objetivo

32. [`docs/data/02-target.md`](#/data-target) — DER propuesto `v1.5-review`; no representa todavía la base implementada.

## Estrategia de carga para un LLM

- **Cambio de frontend:** reglas + contenedores + componente frontend + flujo afectado + secuencia relacionada.
- **Cambio de backend:** reglas + índice de revisión + contrato API + PostgreSQL + componente backend + secuencia.
- **Contrato frontend/backend:** matriz de integración + contrato API + secuencia + datos actuales + brechas.
- **Decisión de negocio o modelo:** reglas + índice de revisión + brechas + modelo objetivo, conservando explícita la diferencia entre propuesta e implementación.
- **Actualización documental:** ramas actuales + runtime + reglas + documentos afectados.

Evitar cargar todos los archivos por defecto. La lectura selectiva reduce contexto irrelevante, pero esta lista completa permite comprobar que no falta ningún documento.
