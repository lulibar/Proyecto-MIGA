# Contexto y enfoque del trabajo — MIGA

## Qué es MIGA

MIGA es una aplicación web para buscar y guardar recetas de cocina de todo el mundo. Elegimos la temática de gastronomía porque nos pareció que ofrecía una API diversa en datos reales  y una experiencia con la que cualquier usuario puede identificarse fácilmente, lo cual facilita pensar un diseño y un flujo de uso genuinamente útiles.

La API elegida fue **TheMealDB**, por su facilidad de acceso (no requiere registro ni API key) y por la cantidad de datos que ofrece por receta.

## Enfoque general y framework elegido

Optamos por **React + Vite** en lugar de Vanilla JS. Con seis vistas que comparten estado entre sí , un framework con manejo de estado declarativo y componentes reutilizables simplificó mucho evitar la duplicación de lógica y la sincronización manual del DOM que hubiera exigido Vanilla JS.

Descartamos usar TypeScript para mantener el proyecto más simple de razonar en equipo, dado el plazo del trabajo.

No usamos ninguna librería de UI (Bootstrap, Tailwind, Material UI, etc.), como exige la consigna: todo el diseño visual está resuelto con CSS propio, centralizando colores, tipografías y breakpoints en variables CSS globales para mantener coherencia visual en toda la app.

## Cómo se relacionan las tecnologías con los requisitos funcionales

- **React Router** resuelve que cada una de las 6 vistas tenga su propia URL real (RF1–RF7), incluyendo la sincronización de los filtros de búsqueda con los parámetros de la URL, lo que permite que al volver desde el Detalle de una receta se recupere exactamente la misma búsqueda que se había hecho antes.
- **Fetch API**, centralizada en `src/services/api.js`, resuelve el consumo de TheMealDB para los cuatro filtros de búsqueda (nombre, categoría, origen, ingrediente), con manejo explícito de errores de red y HTTP en todos los casos.
- **localStorage**, encapsulado en `src/utils/storage.js`, resuelve la persistencia de la lista de deseos y el historial de recetas visitadas entre sesiones, sin necesidad de backend propio.
- **Leaflet + react-leaflet** resuelven el mapa de la página de Contacto de forma interactiva y real (no como un iframe embebido), mostrando la ubicación de la Catedral de La Plata en las coordenadas exactas pedidas.
- **vite-plugin-pwa** resuelve la etapa PLUS opcional: genera el Web App Manifest, registra el Service Worker, y define la estrategia de caché tanto para el shell de la aplicación como para las respuestas de la API consultada, permitiendo un funcionamiento offline básico.

## Decisiones propias, más allá del mínimo pedido

Para el requisito de la lista de deseos (RF5) elegimos la **Variante B** (formulario de preferencias). El campo "cantidad o prioridad" que pide la consigna lo interpretamos como un **ranking numérico real**: al guardar una receta con prioridad 1, las demás recetas de esa misma categoría/etiqueta se reordenan automáticamente, y al eliminar una receta las demás se renumeran para no dejar huecos. Además, el ranking es **independiente por cada categoría o etiqueta personalizada** que el usuario crea (por ejemplo, "Favoritas" y "Para probar" son dos listas con su propio orden 1, 2, 3...). Esta decisión fue nuestra, buscando que el campo tuviera un uso real dentro de la experiencia de la app, más allá de ser solo un número sin función.

Ademas, sobre el mapa de Contacto  pedida explícitamente por el docente para no resolverlo de forma demasiado básica sumamos una funcionalidad de **comercios cercanos por receta**: en el Detalle de cada receta, el usuario puede pedir ver comercios reales cercanos a su ubicación (carnicerías, pescaderías, verdulerías o supermercados, según la categoría de la receta), usando la **Geolocation API** del navegador combinada con **Overpass API**, mostrados en otro mapa Leaflet. Elegimos Overpass por sobre Google Places API para no depender de una cuenta de Google Cloud con tarjeta asociada, dado el plazo ajustado del trabajo.

## Estructura de recursos de la web

El proyecto separa responsabilidades en carpetas claras: `components/` para piezas de UI reutilizables entre vistas, `views/` para cada una de las 6 pantallas con su propia ruta, `services/` para las conexiones con APIs externas (TheMealDB y Overpass), `utils/` para lógica pura sin interfaz (localStorage, validaciones), y `hooks/` para lógica de estado reutilizable (geolocalización). Esta separación entre estructura (componentes/JSX), presentación (CSS por componente) y comportamiento (funciones en `utils/`) responde directamente a la consideración técnica de la consigna sobre separación de responsabilidades.

## Validaciones y manejo de errores

Todas las validaciones de formularios (el de la lista de deseos) se implementan en JavaScript puro, sin depender de atributos HTML nativos (`required`, `type`, etc.), usando el atributo `noValidate` en los formularios para desactivar la validación del navegador. El consumo de la API centraliza el manejo de errores de red y HTTP en una única función (`fetchFromApi`), evitando repetir lógica de captura de errores en cada vista, y mostrando siempre un mensaje claro al usuario en caso de falla, nunca una pantalla en blanco o rota.

## Limitaciones conocidas

Documentamos honestamente algunas limitaciones que identificamos durante el desarrollo, sin considerarlas bugs sino consecuencias de decisiones o del alcance del proyecto:

- La calidad y cantidad de resultados de comercios cercanos depende de qué haya cargado la comunidad de OpenStreetMap en cada zona geográfica.
- En modo offline, la sección "Recetas destacadas" de Home puede mostrar la misma receta repetida, porque el endpoint de recetas aleatorias de TheMealDB no admite pedir varias en una sola consulta, y el Service Worker cachea una única respuesta por URL.
- Los tiles del mapa de Contacto no están cacheados para uso offline.
- La app no cuenta con traducción al español de los datos de las recetas (nombres, categorías, países): se evaluó una integración con una API de traducción gratuita, pero se descartó por las limitaciones de cuota diaria que hacían inviable su uso continuo.

## PWA

Implementamos la conversión opcional a Progressive Web App con `vite-plugin-pwa`: manifest con nombre, íconos en 192px y 512px, color de tema y modo `standalone`; Service Worker con caché del shell de la aplicación (HTML, CSS, JS) y estrategia `NetworkFirst` para las respuestas de la API, de forma que las consultas ya realizadas previamente sigan disponibles sin conexión, y las que nunca se pidieron muestren un mensaje informativo en lugar de romper la interfaz.