# Despliegue en VPS

El sitio se distribuye como un contenedor independiente. No necesita base de datos, volúmenes persistentes ni acceso en tiempo de ejecución a los repositorios documentados.

## Requisitos

- Git.
- Docker Engine con Docker Compose.
- Un proxy inverso con HTTPS si se publicará mediante dominio.

## Primera instalación

```bash
git clone https://github.com/gagonzalez1/puntazo-docs.git
cd puntazo-docs
docker compose up -d --build
docker compose ps
```

Por defecto el servicio escucha en `127.0.0.1:3000`, listo para conectarlo a Nginx, Caddy o Traefik. Para exponerlo directamente en otro puerto:

```bash
PUNTAZO_DOCS_BIND=0.0.0.0 PUNTAZO_DOCS_PORT=8080 docker compose up -d --build
```

## Actualización

```bash
git pull --ff-only
docker compose up -d --build
docker image prune -f
```

## Verificación

```bash
docker compose ps
curl --fail http://127.0.0.1:3000/
docker compose logs --tail=100 docs
```

## Reversión

1. Identificar el commit anterior con `git log --oneline`.
2. Cambiar temporalmente a ese commit con `git checkout <commit>`.
3. Reconstruir con `docker compose up -d --build`.
4. Volver a `main` después de resolver el problema.

Se debe revertir si el contenedor queda `unhealthy`, la raíz deja de responder con HTTP 200 o falla la navegación entre documentos.
