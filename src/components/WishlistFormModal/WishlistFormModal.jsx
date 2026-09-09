import { useState, useMemo } from "react";
import { validateWishlistForm } from "../../utils/validateWishlistForm";
import {
  getCategoriasPersonalizadas,
  addCategoriaPersonalizada,
  getWishlist,
} from "../../utils/storage";
import "./WishlistFormModal.css";

function WishlistFormModal({ meal, onConfirm, onCancel }) {
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nota, setNota] = useState("");
  const [errores, setErrores] = useState({});

  const categoriasGuardadas = getCategoriasPersonalizadas();

  const maxPrioridad = useMemo(() => {
    if (!categoria.trim()) return 1;
    const cantidadEnEstaCategoria = getWishlist().filter(
      (item) => item.consulta?.categoria === categoria.trim()
    ).length;
    return cantidadEnEstaCategoria + 1;
  }, [categoria]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const erroresValidacion = validateWishlistForm({ cantidad, categoria, nota }, maxPrioridad);
    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length > 0) {
      return;
    }

    addCategoriaPersonalizada(categoria);
    onConfirm({ cantidad: Number(cantidad), categoria: categoria.trim(), nota });
  };

  return (
    <div className="wishlist-modal-overlay" onClick={onCancel}>
      <div className="wishlist-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Agregar a mi recetario</h2>
        <p className="wishlist-modal-subtitle">{meal.strMeal}</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="categoria">Categoría o etiqueta</label>
            <input
              id="categoria"
              list="categorias-existentes"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Ej: Favorita, Para probar..."
              autoComplete="off"
            />
            <datalist id="categorias-existentes">
              {categoriasGuardadas.map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
            {errores.categoria && (
              <span className="error-msg">{errores.categoria}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="cantidad">
              Prioridad dentro de "{categoria || "esta lista"}"
            </label>
            <input
              id="cantidad"
              type="number"
              min="1"
              max={maxPrioridad}
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            <span className="char-count">Valores posibles: 1 a {maxPrioridad}</span>
            {errores.cantidad && (
              <span className="error-msg">{errores.cantidad}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="nota">Nota personal (opcional)</label>
            <textarea
              id="nota"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              maxLength={300}
              rows={3}
            />
            <span className="char-count">{nota.length}/300</span>
            {errores.nota && <span className="error-msg">{errores.nota}</span>}
          </div>

          <div className="wishlist-modal-actions">
            <button type="button" className="btn-secundario" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn-primario">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WishlistFormModal;