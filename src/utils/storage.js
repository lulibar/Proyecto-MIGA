const WISHLIST_KEY = "miga_wishlist";
const CATEGORIAS_KEY = "miga_categorias_personalizadas";

// Lee todo el recetario guardado. Si no hay nada todavía, devuelve un array vacío.
export function getWishlist() {
    const data = localStorage.getItem(WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
}

// Agrega una receta al recetario, junto con los datos que el usuario cargó en el formulario.
// La prioridad (cantidad) se reordena SOLO dentro de la misma categoría/etiqueta.
export function addToWishlist(meal, formData) {
    const wishlist = getWishlist();

    const yaExiste = wishlist.some((item) => item.idMeal === meal.idMeal);
    if (yaExiste) return wishlist;

    const prioridadNueva = Number(formData.cantidad);
    const categoriaNueva = formData.categoria;

    const reordenado = wishlist.map((item) => {
        const mismaCategoria = item.consulta?.categoria === categoriaNueva;
        const prioridadActual = Number(item.consulta?.cantidad);

        if (mismaCategoria && !isNaN(prioridadActual) && prioridadActual >= prioridadNueva) {
            return {
                ...item,
                consulta: { ...item.consulta, cantidad: prioridadActual + 1 },
            };
        }
        return item;
    });

    const nuevoItem = {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        consulta: formData, // acá van cantidad (prioridad dentro de la categoría), categoria y nota
        fechaAgregado: new Date().toISOString(),
    };

    const actualizado = [...reordenado, nuevoItem];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(actualizado));
    return actualizado;
}

// Elimina una receta del recetario a partir de su id.
// Renumera la prioridad SOLO de las recetas que compartían su misma categoría/etiqueta.
export function removeFromWishlist(id) {
    const wishlist = getWishlist();
    const itemAEliminar = wishlist.find((item) => item.idMeal === id);
    const filtrado = wishlist.filter((item) => item.idMeal !== id);

    if (!itemAEliminar) {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(filtrado));
        return filtrado;
    }

    const categoriaEliminada = itemAEliminar.consulta?.categoria;

    const mismaCategoria = filtrado
        .filter((item) => item.consulta?.categoria === categoriaEliminada)
        .sort((a, b) => Number(a.consulta?.cantidad ?? 0) - Number(b.consulta?.cantidad ?? 0));

    const otrasCategorias = filtrado.filter(
        (item) => item.consulta?.categoria !== categoriaEliminada
    );

    const renumerado = mismaCategoria.map((item, index) => ({
        ...item,
        consulta: { ...item.consulta, cantidad: index + 1 },
    }));

    const actualizado = [...otrasCategorias, ...renumerado];
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

// Resuelve tema categorias

export function getCategoriasPersonalizadas() {
    const data = localStorage.getItem(CATEGORIAS_KEY);
    return data ? JSON.parse(data) : [];
}   

export function addCategoriaPersonalizada(categoria) {
    const categorias = getCategoriasPersonalizadas();
    const yaExiste = categorias.some(
    (c) => c.toLowerCase() === categoria.trim().toLowerCase()
    );
    if (!yaExiste && categoria.trim() !== "") {
    categorias.push(categoria.trim());
    localStorage.setItem(CATEGORIAS_KEY, JSON.stringify(categorias));
    }
}