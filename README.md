# LatinAd CMS Frontend

Repositorio para el ejercicio tecnico de LatinAd. Incluye la API mock provista para el desafio y una base frontend en AngularJS 1.x.

## Estructura

```txt
api-mock/   API local provista para el ejercicio
frontend/   Aplicacion frontend AngularJS
```

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Ejecutar API mock

```bash
cd api-mock
npm install
npm run dev
```

La API queda disponible en:

```txt
http://localhost:3001
```

Credenciales demo:

```txt
Usuario: admin
Password: admin123
```

## Ejecutar frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

## Stack frontend

- AngularJS 1.8
- Vite

## Estructura frontend

```txt
frontend/
  public/            Archivos estaticos servidos sin procesamiento
  src/
    app/             Modulo raiz y componente raiz de la aplicacion
    core/            Servicios globales, configuracion e integraciones futuras
    features/        Funcionalidades de negocio, separadas por dominio
    shared/          Componentes, helpers y estilos reutilizables
    assets/          Imagenes y recursos importados desde codigo
    main.js          Punto de entrada y bootstrap de AngularJS
    style.css        Estilos globales basicos
  index.html         Documento HTML principal
  vite.config.js     Configuracion de Vite
```

## Alcance actual

- Repositorio autocontenido con API mock y frontend.
- Base AngularJS configurada.
- Estructura inicial lista para construir paso a paso.
- Sin funcionalidades de negocio implementadas todavia.
