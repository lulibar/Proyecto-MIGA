export function validateWishlistForm({ cantidad, categoria, nota }, maxPrioridad) {
  const errores = {};

  if (cantidad === "" || cantidad === null || cantidad === undefined) {
    errores.cantidad = "La prioridad es obligatoria.";
  } else if (
    isNaN(Number(cantidad)) ||
    !Number.isInteger(Number(cantidad)) ||
    Number(cantidad) <= 0
  ) {
    errores.cantidad = "La prioridad debe ser un número entero mayor a 0.";
  } else if (maxPrioridad && Number(cantidad) > maxPrioridad) {
    errores.cantidad = `La prioridad no puede ser mayor a ${maxPrioridad}.`;
  }

  if (!categoria || categoria.trim() === "") {
    errores.categoria = "La categoría o etiqueta es obligatoria.";
  }

  if (nota && nota.length > 300) {
    errores.nota = "La nota no puede superar los 300 caracteres.";
  }

  return errores;
}