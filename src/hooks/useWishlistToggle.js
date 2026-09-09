import { useState } from "react";
import { getWishlist, addToWishlist, removeFromWishlist } from "../utils/storage";

export function useWishlistToggle(meal) {
  const [estaGuardado, setEstaGuardado] = useState(() =>
    getWishlist().some((item) => item.idMeal === meal.idMeal)
  );
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleToggle = () => {
    if (estaGuardado) {
      removeFromWishlist(meal.idMeal);
      setEstaGuardado(false);
    } else {
      setMostrarFormulario(true);
    }
  };

  const confirmarGuardado = (formData) => {
    addToWishlist(meal, formData);
    setEstaGuardado(true);
    setMostrarFormulario(false);
  };

  const cancelar = () => {
    setMostrarFormulario(false);
  };

  return { estaGuardado, mostrarFormulario, handleToggle, confirmarGuardado, cancelar };
}