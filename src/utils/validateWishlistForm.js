// Recibe los datos del formulario y devuelve un objeto con los errores encontrados.
// Si el objeto devuelto está vacío ({}), significa que no hay errores.
export function validateWishlistForm({ nombre, email, mensaje }) {
    const errores = {};

    if (!nombre || nombre.trim() === "") {
        errores.nombre = "El nombre es obligatorio.";
    }

    // Regex simple para validar formato de email: algo@algo.algo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errores.email = "Ingresá un email válido.";
    }

    if (mensaje && mensaje.length > 300) {
        errores.mensaje = "El mensaje no puede superar los 300 caracteres.";
    }

    return errores;
}