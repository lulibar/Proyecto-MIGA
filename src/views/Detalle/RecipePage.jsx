import { useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css";
import { recipes } from "../../data/mockData";

function categoryColor(category) {
  if (category === "Postre") return { bg: "#FEF6E0", color: "#B8860B" };
  if (category === "Ensalada") return { bg: "#EEF4E8", color: "#4A6741" };
  return { bg: "#FCEEE9", color: "#C65D3A" };
}

const thumbnailIndexes = [0, 1, 2, 3];

export default function RecipePage() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  const [activeTab, setActiveTab] = useState("ingredientes");
  const [servings, setServings] = useState(recipe?.servings ?? 1);
  const [isFavorite, setIsFavorite] = useState(recipe?.isFavorite ?? false);
  const [activeThumb, setActiveThumb] = useState(0);

  if (!recipe) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <p>Receta no encontrada.</p>
      </div>
    );
  }

  const catStyle = categoryColor(recipe.category);
  const ratio = servings / recipe.servings;

  function scaleAmount(amount) {
    const match = amount.match(/^([\d.]+)/);
    if (!match || ratio === 1) return amount;
    const num = parseFloat(match[1]) * ratio;
    const rounded = Math.round(num * 10) / 10;
    return amount.replace(match[1], String(rounded));
  }

  const tabs = [
    {
      id: "ingredientes",
      label: "Ingredientes",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" /><path d="M7 2v20" /><path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3v7" /></svg>,
    },
    {
      id: "preparacion",
      label: "Preparación",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 010 8h-1" /><path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" /></svg>,
    },
    {
      id: "video",
      label: "Video",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>,
    },
  ];

  return (
    <article className="recipe-page">
      {/* Hero */}
      <section className="recipe-hero" aria-label="Información de la receta">
        <div className="recipe-hero-img-col">
          <div className="recipe-main-img-wrap">
            <img src={recipe.image} alt={`Foto de ${recipe.title}`} className="recipe-main-img" />
            <button
              className="recipe-fav-btn"
              onClick={() => setIsFavorite((f) => !f)}
              aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? "#C65D3A" : "none"} stroke="#C65D3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
          </div>
          <div className="recipe-thumbnails" role="list" aria-label="Fotos de la receta">
            {thumbnailIndexes.map((i) => (
              <button
                key={i}
                role="listitem"
                className={`recipe-thumb ${i === activeThumb ? "active" : ""}`}
                onClick={() => setActiveThumb(i)}
                aria-label={`Ver foto ${i + 1}`}
              >
                <img src={recipe.image} alt="" />
              </button>
            ))}
            <button className="recipe-thumb recipe-thumb--video" aria-label="Ver video de la receta">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
              </svg>
              <span>Ver video</span>
            </button>
          </div>
        </div>

        <div className="recipe-hero-info-col">
          <div className="recipe-badges">
            <span className="recipe-origin-badge">{recipe.origin.toUpperCase()}</span>
            <span className="badge" style={{ background: catStyle.bg, color: catStyle.color, textTransform: "uppercase", fontSize: "11px", fontWeight: 700 }}>
              {recipe.category}
            </span>
          </div>
          <h1 className="recipe-title">{recipe.title}</h1>
          <p className="recipe-description">{recipe.description}</p>

          <div className="recipe-meta-row">
            <div className="recipe-meta-block">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="recipe-meta-value">{recipe.time} min</span>
              <span className="recipe-meta-label">Tiempo total</span>
            </div>
            <div className="recipe-meta-block">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <span className="recipe-meta-value">{recipe.difficulty}</span>
              <span className="recipe-meta-label">Dificultad</span>
            </div>
            <div className="recipe-meta-block">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
              <span className="recipe-meta-value">{servings} porciones</span>
              <span className="recipe-meta-label">Rinde</span>
            </div>
          </div>

          <div className="recipe-action-row">
            <button className="recipe-save-btn" onClick={() => setIsFavorite((f) => !f)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
              </svg>
              {isFavorite ? "Guardada" : "Guardar receta"}
            </button>
            <button className="recipe-share-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Compartir
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="recipe-tabs-section" aria-label="Contenido de la receta">
        <div className="recipe-tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              className={`recipe-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              aria-selected={activeTab === tab.id}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="recipe-tab-content" role="tabpanel">
          {activeTab === "ingredientes" && (
            <div className="recipe-content-grid">
              <section aria-labelledby="ingredients-heading">
                <div className="ingredients-header">
                  <div className="ingredients-title-row">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" /><path d="M7 2v20" />
                    </svg>
                    <h2 className="ingredients-title" id="ingredients-heading">Ingredientes</h2>
                  </div>
                  <div className="servings-control" aria-label="Ajustar porciones">
                    <button className="servings-btn" onClick={() => setServings((s) => Math.max(1, s - 1))} aria-label="Reducir porciones">−</button>
                    <span className="servings-count" aria-live="polite">{servings} porciones</span>
                    <button className="servings-btn" onClick={() => setServings((s) => s + 1)} aria-label="Aumentar porciones">+</button>
                  </div>
                </div>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="ingredient-item">
                      <span className="ingredient-dot" aria-hidden="true" />
                      <span className="ingredient-name">{ing.name}</span>
                      <span className="ingredient-amount">{scaleAmount(ing.amount)}</span>
                    </li>
                  ))}
                </ul>
                {recipe.tip && (
                  <aside className="tip-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M11 20A7 7 0 0118 7a7 7 0 01-7 13z" /><path d="M11 20c0-5.523 4.477-10 10-10" />
                    </svg>
                    <p><strong>Tip:</strong> {recipe.tip}</p>
                  </aside>
                )}
              </section>

              <section aria-labelledby="prep-heading">
                <div className="preparation-title-row">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17 8h1a4 4 0 010 8h-1" /><path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" />
                  </svg>
                  <h2 className="ingredients-title" id="prep-heading">Preparación</h2>
                </div>
                <ol className="steps-list">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="step-item">
                      <span className="step-number" aria-hidden="true">{i + 1}</span>
                      <div className="step-body">
                        <h3 className="step-title">{step.title}</h3>
                        <p className="step-desc">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          )}

          {activeTab === "preparacion" && (
            <section aria-labelledby="prep-only-heading">
              <h2 className="ingredients-title" id="prep-only-heading" style={{ marginBottom: "16px" }}>Preparación</h2>
              <ol className="steps-list">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="step-item">
                    <span className="step-number" aria-hidden="true">{i + 1}</span>
                    <div className="step-body">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-desc">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {activeTab === "video" && (
            <div className="video-placeholder" role="status">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
              </svg>
              <p>Video no disponible aún</p>
            </div>
          )}
        </div>

        {recipe.advice && (
          <aside className="advice-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <p><strong>Consejo:</strong> {recipe.advice}</p>
            <span className="advice-emoji" aria-hidden="true">🌶️</span>
          </aside>
        )}
      </section>
    </article>
  );
}