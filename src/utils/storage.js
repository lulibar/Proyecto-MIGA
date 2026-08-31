const WISHLIST_KEY = "miga_wishlist";

// Lee todo el recetario guardado. Si no hay nada todavía, devuelve un array vacío.
export function getWishlist() {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
}

// Agrega una receta al recetario, junto con los datos que el usuario cargó en el formulario.
export function addToWishlist(meal, formData) {
    const wishlist = getWishlist();

    // Evitamos duplicados: si la receta ya está guardada, no la agregamos de nuevo.
    const yaExiste = wishlist.some((item) => item.idMeal === meal.idMeal);
    if (yaExiste) return wishlist;

    const nuevoItem = {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        consulta: formData, // acá van nombre, email y mensaje del formulario
        fechaAgregado: new Date().toISOString(),
    };

    const actualizado = [...wishlist, nuevoItem];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(actualizado));
    return actualizado;
}

// Elimina una receta del recetario a partir de su id.
export function removeFromWishlist(id) {
    const wishlist = getWishlist();
    const actualizado = wishlist.filter((item) => item.idMeal !== id);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(actualizado));
    return actualizado;
}


const HISTORY_KEY = "miga_historial";

// Lee el historial completo.
export function getHistory() {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
}

// Registra una receta como visitada. Si ya estaba, la mueve al principio (más reciente primero).
export function addToHistory(meal) {
    let history = getHistory();

    history = history.filter((item) => item.idMeal !== meal.idMeal);

    history.unshift({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        fechaVisita: new Date().toISOString(),
    });

    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    return history;
}

// Borra el historial completo.
export function clearHistory() {
    localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
    return [];
}