import "./RecipeCard.css";

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DifficultyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#C65D3A" : "none"} stroke="#C65D3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function categoryColor(category) {
  if (category === "Postre") return { bg: "#FEF6E0", color: "#B8860B" };
  if (category === "Ensalada") return { bg: "#EEF4E8", color: "#4A6741" };
  if (category === "Vegetariana") return { bg: "#EEF4E8", color: "#4A6741" };
  return { bg: "#FCEEE9", color: "#C65D3A" };
}

export default function RecipeCard({ recipe, variant = "grid", onFavoriteToggle, onClick }) {
  const catStyle = categoryColor(recipe.category);

  if (variant === "list") {
    return (
      <article className="recipe-card recipe-card--list" onClick={() => onClick?.(recipe)}>
        <div className="recipe-card-list-img">
          <img src={recipe.image} alt={recipe.title} loading="lazy" />
        </div>
        <div className="recipe-card-list-body">
          <h3 className="recipe-card-list-title">{recipe.title}</h3>
          <div className="recipe-card-badges">
            <span className="badge badge--origin">{recipe.origin}</span>
              {recipe.category && (
                <span className="badge" style={{ background: catStyle.bg, color: catStyle.color }}>{recipe.category}</span>
              )}          
            </div>
          {(recipe.time || recipe.difficulty) && (
          <div className="recipe-card-meta">
            {recipe.time && <span className="recipe-meta-item"><ClockIcon /> {recipe.time} min</span>}
            {recipe.difficulty && <span className="recipe-meta-item"><DifficultyIcon /> {recipe.difficulty}</span>}
          </div>
        )}
        </div>
        <svg className="recipe-card-list-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </article>
    );
  }

  return (
    <article className={`recipe-card recipe-card--${variant}`} onClick={() => onClick?.(recipe)}>
      <div className="recipe-card-img-wrap">
        <img src={recipe.image} alt={recipe.title} loading="lazy" className="recipe-card-img" />
        <button
          className="recipe-card-fav"
          onClick={(e) => { e.stopPropagation(); onFavoriteToggle?.(recipe.id); }}
          aria-label={recipe.isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
        >
          <HeartIcon filled={recipe.isFavorite} />
        </button>
      </div>
      <div className="recipe-card-body">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <p className="recipe-card-origin">{recipe.origin}</p>
        <div className="recipe-card-badges">
          {recipe.category && (
            <span className="badge" style={{ background: catStyle.bg, color: catStyle.color }}>{recipe.category}</span>
          )}       
        </div>
          {(recipe.time || recipe.difficulty) && (
          <div className="recipe-card-meta">
            {recipe.time && <span className="recipe-meta-item"><ClockIcon /> {recipe.time} min</span>}
            {recipe.difficulty && <span className="recipe-meta-item"><DifficultyIcon /> {recipe.difficulty}</span>}
          </div>
        )}
      </div>
    </article>
  );
}
