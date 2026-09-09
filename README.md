# MIGA — Recetas de todo el mundo

Aplicación web  para explorar, guardar y gestionar recetas de cocina de todo el mundo, consumiendo la API pública [TheMealDB](https://www.themealdb.com/api.php).

Trabajo Integrador - Módulo 1, Aplicaciones Móviles (UNAJ).

**Equipo**: Lourdes Barrientos  y Tomás Navas.

---

## Cómo levantar el proyecto en forma local

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/lulibar/Proyecto-MIGA.git
   cd Proyecto-MIGA
   ```

2. **Instalar las dependencias**

   ```bash
   npm install
   ```

   Esto instala todas las dependencias del proyecto: React, React Router, Leaflet/react-leaflet (mapas), vite-plugin-pwa, entre otras.

3. **Levantar el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   La terminal va a mostrar una URL local, normalmente:

   ```
   http://localhost:5173/
   ```


## Probar la versión de producción y la PWA


```bash
npm run build
npm run preview
```

Esto va a levantar otra URL local (normalmente `http://localhost:4173/`). Ahí sí:
- Para probar el modo offline: DevTools, pestaña **Network**, dropdown de estado de red, seleccionar **Offline**, y recargar la página.
- El ícono de instalación de la PWA aparece en la barra de direcciones de Chrome.

