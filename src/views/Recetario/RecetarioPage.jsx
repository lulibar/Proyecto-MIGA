import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecetarioPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { recipes } from "../../data/mockData";

export default function RecetarioPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(
    new Set(recipes.filter((r) => r.isFavorite).map((r) => r.id))
  );

  function toggleFavorite(id) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const saved = recipes
    .filter((r) => favorites.has(r.id))
    .map((r) => ({ ...r, isFavorite: true }));

  return (
    <div className="recetario-page">
      <div className="container">
        <PageHeader
          title="Mi Recetario"
          subtitle="Tus recetas guardadas, siempre a mano."
        />

        {saved.length > 0 ? (
          <section aria-labelledby="recetario-heading">
            <p className="recetario-count" id="recetario-heading">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
              </svg>
              <span>{saved.length} receta{saved.length !== 1 ? "s" : ""} guardada{saved.length !== 1 ? "s" : ""}</span>
            </p>
            <div className="recetario-grid">
              {saved.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  variant="grid"
                  onFavoriteToggle={toggleFavorite}
                  onClick={(r) => navigate(`/detalle/${r.id}`)}
                />
              ))}
            </div>
          </section>
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