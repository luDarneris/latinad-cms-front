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
- UI Router
- Tailwind CSS

## Decisiones de stack

Decidí trabajar con AngularJS 1.x tomando el ejercicio tambien como una introducción al framework. No tenía experiencia previa con AngularJS, así que fue un desafio extra, pero me pareció una buena oportunidad para ubicarme en sus características generales.

Estructuré en principio el proyecto en capas, que por lo que investigué es lo más común pero no me resultó cómodo, terminé eligiendo una estructura organizada por funcionalidad, porque en general es mucho más facil ubicarse entre carpetas y además sea el tipo de proyecto que sea, lo hace más escalable y fácil de mantener.

Tambien usé Tailwind CSS porque es una herramienta con la que ya tengo algo de fluidez y me permite definir una paleta común, resolver responsive de forma simple con clases y evitar estilos sueltos o repetidos en distintas pantallas.

## Decisiones de autenticacion

A completar al final... 
