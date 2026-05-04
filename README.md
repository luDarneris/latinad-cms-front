# LatinAd CMS Frontend

Repositorio para el ejercicio técnico de LatinAd. Incluye la API mock provista para el desafío y una base frontend en AngularJS 1.x.

## Información general

### Estructura

```txt
api-mock/   API local provista para el ejercicio
frontend/   Aplicación frontend AngularJS
```

### Requisitos

- Node.js 18 o superior
- npm 9 o superior

### Stack frontend

- AngularJS 1.8
- Vite
- UI Router
- Tailwind CSS

## Inicio rápido

Después de clonar el repositorio, el proyecto se levanta en dos partes: primero la API mock y después el frontend.

### 1. Levantar la API mock

En una terminal:

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

### 2. Levantar el frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite va a mostrar la URL local para abrir la app en el navegador, normalmente:

```txt
http://localhost:5173
```

## Justificaciones y decisiones

### Decisiones de stack

Decidí trabajar con AngularJS 1.x tomando el ejercicio también como una introducción al framework. No tenía experiencia previa con AngularJS, así que fue un desafío extra, pero me pareció una buena oportunidad para ubicarme en sus características generales.

También usé Tailwind CSS porque es una herramienta con la que ya tengo algo de fluidez y me permite definir una paleta común, resolver responsive de forma simple con clases y evitar estilos sueltos o repetidos en distintas pantallas.

### Decisiones de autenticación

 ¿Dónde guardás el token y por qué? 

El token se guarda en localStorage, porque a fines de esta demo es una manera simple de mantener la sesión después de recargar la página. Si pudiera elegir una mejor forma de hacerlo lo guardaría en una cookie httpOnly, pero eso requería que haga cambios en el back y salía del alcance requerido. 

¿Cómo evitás repetir la lógica del token en cada llamada (p. ej. interceptor, wrapper de `fetch`/`axios`, configuración de `$http`)?

Como el proyecto está hecho en Angular.js, uso un interceptor de $http, que es la herramienta propia del framework que permite intervenir requests y agregar headers comunes como el token y manejar errores como 401.

### Decisiones sobre listar contenido

¿Dónde vive el estado de los filtros? ¿Por qué? 

El estado de los filtros vive en el DashboardController porque los filtros pertenecen solo a esa pantalla, no son estado global ni se comparten con otras vistas. En el dashboard se muestran, actualizan, se arma la request y se renderizan los resultados. 

¿Cómo manejás estado de carga y errores? 

Manejé el estado de carga con flags de estado que triggerean distintos comportamientos que permiten inferir que se están cargando los datos, por ejemplo para la carga inicial de contenidos en el Dashboard si el flag isLoading está en true, se muestran skeletons y una animación de pulso que provee Tailwind. Si falla la carga de contenidos desde la API, guardo el error en un estado y lo muestro en un toast de error, además de que no se renderiza la lista. Mismo con los botones que lanzan peticiónes, se deshabilitan y cambian su etiqueta a una referente a que se esta esperando que se procese la petición. 

¿Cómo estructurás los componentes?

Después de investigar la estructura más común en proyectos Angular.js intenté en principio implementar una estructura por capas, pero dado a que es mi primera experiencia con este framework me pareció demasiado incómoda, requiere saltar demasiado entre carpetas para entender un flujo. Es por esto que terminé reestructurando el proyecto por pantalla, cada cual mantiene cerca su par vista / controller, y todo lo transversal del proyecto o reutilizable quedó en core y en componentes reutilizables. 

### Decisiones sobre crear contenido

¿Validación en tiempo real o al enviar? ¿Por qué? 

Elegi validar antes de enviar la petición como tal, es decir, el usuario no ve los errores mientras escribe al sacar el foco el input sino recién al apretar el botón para enviar. Esto por una cuestión de no ser invasivo con los mensajes de error, por simple preferencia personal dado que no se requiere del back para validar porque son reglas locales. De todas maneras, no se envían peticiones innecesarias en el caso de no cumplir las reglas locales. 

 ¿Cómo manejás feedback de éxito y error?

Manejo el feedback con estados de carga y toasts. Mientras se guarda, el botón muestra “Guardando…” y se bloquean acciones para evitar duplicados. Si sale bien, cierro el modal, limpio el formulario, muestro un toast de éxito y actualizo la lista sin recargar la página. Si fallara el guardado, muestro un toast de error. 

### Decisiones de UX

Centralicé casi todo el flujo en el dashboard para que el usuario no pierda contexto, desde ahí puede ver la biblioteca, buscar, filtrar, seleccionar contenidos y ejecutar las acciones principales.

Las únicas instancias que interrumpen esa vista son la creación de un nuevo contenido y la confirmación de archivado. En ambos casos lo resolví con modales porque son momentos donde tiene sentido enfocar la atención del usuario en una acción puntual.

Todo esto está acompañado por feedback en los momentos clave, para que el usuario entienda siempre qué está pasando: carga inicial, guardado en proceso, errores y creación exitosa.

### Qué harías distinto con más tiempo

Con más tiempo revisaría cómo separar mejor las responsabilidades del controller del dashboard, porque terminó quedando bastante cargado. También implementaría un modal para ver el detalle de un contenido al hacer click sobre una tarjeta específica. 

Además, agregaría paginado o una carga progresiva. Para el volumen de datos del mock actual la solución cumple, pero si la lista de contenidos fuera mucho más grande sería indispensable.

Me hubiera gustado también agregar en el modal de creación de contenido una sección de previsualización para que el usuario pueda ver el contenido del link ingresado. 

### Qué parte fue más desafiante y cómo la resolviste.

Lo que más me costó fue el tema del archivado masivo, el diseño de la interfaz en este punto me costó porque no quería cargar la vista con los checkbox permanentes o botones que no se podían usar sin condiciones dadas, había muchas consideraciones que tener en cuenta para cuidar la lógica (seleccionar todos o varios, deseleccionar todos, que no se puedan seleccionar los contenidos ya archivados, etc.), sumado a que la acción es crítica, para lo cual implementé el modo selección que cambia la vista y habilita las acciones de manera progresiva, además del modal de confirmación.  




