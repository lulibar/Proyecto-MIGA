const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Esta función la usan TODAS las demás. Recibe una URL, hace el fetch,
// y se encarga de chequear tanto errores de RED (no hay internet, el server no responde)
// como errores HTTP (la petición llegó, pero el servidor respondió con un código de error).
async function fetchFromApi(url) {
  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    // Esto se dispara cuando ni siquiera se pudo conectar (sin internet, DNS caído, etc.)
    throw new Error("No se pudo conectar con el servidor. Revisá tu conexión a internet.");
  }

  // Esto se dispara cuando SÍ hubo respuesta, pero no es una respuesta exitosa
  // (por ejemplo, error 404, 500, etc.)
  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
  }

  // Si llegamos hasta acá, la respuesta es válida. La convertimos de JSON a objeto JS.
  const data = await response.json();
  return data;
}

// Busca recetas por nombre (texto libre)
export async function searchMealsByName(query) {
  const data = await fetchFromApi(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  return data.meals || []; // si no hay resultados, TheMealDB devuelve "meals": null
}

// Filtra recetas por categoría (ej: "Dessert", "Seafood")
export async function filterMealsByCategory(category) {
  const data = await fetchFromApi(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
  return data.meals || [];
}

// Filtra recetas por área/origen (ej: "Italian", "Mexican")
export async function filterMealsByArea(area) {
  const data = await fetchFromApi(`${BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
  return data.meals || [];
}

// Filtra recetas por ingrediente principal (ej: "chicken", "rice")
export async function filterMealsByIngredient(ingredient) {
  const data = await fetchFromApi(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
  return data.meals || [];
}

// Trae la lista de categorías disponibles (para poblar el filtro en el formulario)
export async function getCategories() {
  const data = await fetchFromApi(`${BASE_URL}/categories.php`);
  return data.categories || [];
}

// Trae la lista de áreas/orígenes disponibles (para poblar el filtro)
export async function getAreas() {
  const data = await fetchFromApi(`${BASE_URL}/list.php?a=list`);
  return data.meals || []; // ojo: esta también viene bajo la clave "meals", es rareza de la API
}

// Trae el detalle COMPLETO de una receta puntual, a partir de su id
export async function getMealById(id) {
  const data = await fetchFromApi(`${BASE_URL}/lookup.php?i=${id}`);
  return data.meals ? data.meals[0] : null; // esta siempre devuelve un array de 1 elemento
}

// Trae UNA receta aleatoria. TheMealDB no tiene endpoint para traer varias de una,
// así que para pedir varias, llamamos esta función varias veces en simultáneo.
export async function getRandomMeals(cantidad = 6) {
  const promesas = [];

  for (let i = 0; i < cantidad; i++) {
    promesas.push(fetchFromApi(`${BASE_URL}/random.php`));
  }

  const resultados = await Promise.all(promesas);
  return resultados.map((data) => data.meals[0]);
}