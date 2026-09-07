import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecetarioPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { getWishlist, removeFromWishlist } from "../../utils/storage";

function mapWishlistItem(item) {
  return {
    id: item.idMeal,
    title: item.strMeal,
    image: item.strMealThumb,
    category: item.strCategory,
    origin: item.strArea,
    isFavorite: true,
    prioridad: item.consulta?.cantidad,
    etiqueta: item.consulta?.categoria || "Sin categoría",
  };
}

function agruparPorEtiqueta(items) {
  const grupos = {};
  items.forEach((item) => {
    if (!grupos[item.etiqueta]) grupos[item.etiqueta] = [];
    grupos[item.etiqueta].push(item);
  });

  Object.keys(grupos).forEach((etiqueta) => {
    grupos[etiqueta].sort((a, b) => (a.prioridad ?? 999) - (b.prioridad ?? 999));
  });

  return grupos;
}

export default function RecetarioPage() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(getWishlist());

  function handleRemove(id) {
    const actualizado = removeFromWishlist(id);
    setWishlist(actualizado);
  }

  const saved = wishlist.map(mapWishlistItem);
  const grupos = agruparPorEtiqueta(saved);
  const etiquetas = Object.keys(grupos);

  return (
    <div className="recetario-page">
      <div className="container">
        <PageHeader
          title="Mi Recetario"
          subtitle="Tus recetas guardadas, siempre a mano."
        />

        {saved.length > 0 ? (
          etiquetas.map((etiqueta) => (
            <section key={etiqueta} aria-labelledby={`grupo-${etiqueta}`} style={{ marginBottom: "32px" }}>
              <p className="recetario-count" id={`grupo-${etiqueta}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
                <span>
                  {etiqueta} — {grupos[etiqueta].length} receta{grupos[etiqueta].length !== 1 ? "s" : ""}
                </span>
              </p>
              <div className="recetario-grid">
                {grupos[etiqueta].map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    variant="grid"
                    onFavoriteToggle={handleRemove}
                    onClick={(r) => navigate(`/detalle/${r.id}`)}
                  />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="recetario-empty" role="status">
            <div className="recetario-empty-icon" aria-hidden="true">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
              </svg>
            </div>
            <h2 className="recetario-empty-title">Tu recetario está vacío</h2>
            <p className="recetario-empty-subtitle">
              Guardá tus recetas favoritas para tenerlas siempre a mano. Tocá el corazón en cualquier receta para agregarla.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}