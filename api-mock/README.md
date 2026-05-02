# LatinAd CMS Mock API

API local y pequena para soportar la actividad tecnica de frontend.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalacion y ejecucion local

```bash
npm install
npm run dev
```

Si preferis sin `nodemon`:

```bash
npm start
```

Servidor por defecto: `http://localhost:3001`

## Autenticacion rapida

Esta API usa JWT con un usuario de prueba hardcodeado para acelerar el setup:

- `username`: `admin`
- `password`: `admin123`

### Login

`POST /auth/login`

Body:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Respuesta:

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "username": "admin",
    "name": "LatinAd Recruiter"
  }
}
```

Luego enviar header en endpoints protegidos:

`Authorization: Bearer JWT_TOKEN`

## Endpoints

### Healthcheck

- `GET /health`

### Datos mock completos (protegido)

- `GET /api/mock-data`

Devuelve:

- `contents`
- `categories`
- `folders`

### Listar contenidos (protegido)

- `GET /api/contents`

Query params opcionales:

- `type`: `image` | `video` | `archived`
- `folder_id`: numero
- `category_id`: numero
- `search`: texto libre por nombre

### Crear contenido (protegido)

- `POST /api/contents`

Body:

```json
{
  "name": "Nuevo contenido",
  "type": "video",
  "url": "https://mi-archivo.mp4",
  "category_id": 2,
  "folder_id": 5,
  "has_audio": true
}
```

Campos requeridos:

- `name`
- `type` (`image` o `video`)
- `url`

### Archivado masivo (protegido)

- `PATCH /api/contents/archive`

Body:

```json
{
  "ids": [1, 2, 3]
}
```

Respuesta:

```json
{
  "archived_count": 3,
  "archived_ids": [1, 2, 3]
}
```

### Eliminar contenido (protegido)

- `DELETE /api/contents/:id`

Retorna `204` si elimina correctamente.

## Notas para evaluacion tecnica

- Los datos se guardan en `src/data/db.json` (persistencia local simple).
- Si `db.json` no existe, se crea automaticamente desde `mockData`.

## Postman

Se incluye una coleccion lista para importar:

- `postman/LatinAd-CMS-Mock-API.postman_collection.json`

Flujo sugerido:

1. Ejecutar `Auth - Login` (guarda `token` automaticamente).
2. Consumir endpoints protegidos.
3. Ejecutar `API - Create Content` y luego `API - Delete Content`.
