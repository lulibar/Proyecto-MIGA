import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipePage.css";
import { getMealById } from "../../services/api";
import { getWishlist, addToWishlist, removeFromWishlist, addToHistory } from "../../utils/storage";
import WishlistFormModal from "../../components/WishlistFormModal/WishlistFormModal";
import ComerciosCercanos from "../../components/ComerciosCercanos/ComerciosCercanos";

function categoryColor() {
  return { bg: "#FCEEE9", color: "#C65D3A" };
}

function extraerIngredientes(meal) {
  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const nombre = meal[`strIngredient${i}`];
    const medida = meal[`strMeasure${i}`];
    if (nombre && nombre.trim()) {
      ingredientes.push({ name: nombre, amount: medida || "" });
    }
  }
  return ingredientes;
}

function extraerPasos(meal) {
  if (!meal.strInstructions) return [];

  return meal.strInstructions
    .split(/\r?\n/)
    .map((paso) => paso.trim())
    .map((paso) => paso.replace(/^step\s*\d+[:.]?\s*/i, ""))
    .filter((paso) => paso.length > 0);
}

function extraerYoutubeId(url) {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

export default function RecipePage() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("ingredientes");
  const [isFavorite, setIsFavorite] = useState(false);
  const [itemGuardado, setItemGuardado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getMealById(id)
      .then((data) => {
        setMeal(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!meal) return;
    const wishlist = getWishlist();
    const encontrado = wishlist.find((item) => item.idMeal === meal.idMeal);
    setIsFavorite(!!encontrado);
    setItemGuardado(encontrado || null);
  }, [meal]);

  useEffect(() => {
    if (!meal) return;
    addToHistory(meal);
  }, [meal]);

  function toggleFavorite() {
    if (!meal) return;

    if (isFavorite) {
      removeFromWishlist(meal.idMeal);
      setIsFavorite(false);
      setItemGuardado(null);
    } else {
      setMostrarFormulario(true);
    }
  }

  function confirmarGuardado(formData) {
    addToWishlist(meal, formData);
    setIsFavorite(true);
    setItemGuardado({ ...meal, consulta: formData });
    setMostrarFormulario(false);
  }

  function cancelarGuardado() {
    setMostrarFormulario(false);
  }

  if (loading) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <p>Cargando receta...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <p>Ocurrió un error al cargar la receta: {error}</p>
      </div>
    );
  }

  if (!meal) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <p>Receta no encontrada.</p>
      </div>
    );
  }

  const catStyle = categoryColor();
  const ingredientes = extraerIngredientes(meal);
  const pasos = extraerPasos(meal);
  const youtubeId = extraerYoutubeId(meal.strYoutube);
  const nota = itemGuardado?.consulta?.nota;

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
    <>
      <article className="recipe-page">
        {/* Hero */}
        <section className="recipe-hero" aria-label="Información de la receta">
          <div className="recipe-hero-img-col">
            <div className="recipe-main-img-wrap">
              <img src={meal.strMealThumb} alt={`Foto de ${meal.strMeal}`} className="recipe-main-img" />
              <button
                className="recipe-fav-btn"
                onClick={toggleFavorite}
                aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? "#C65D3A" : "none"} stroke="#C65D3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="recipe-hero-info-col">
            <div className="recipe-badges">
              <span className="recipe-origin-badge">{meal.strArea?.toUpperCase()}</span>
              <span className="badge" style={{ background: catStyle.bg, color: catStyle.color, textTransform: "uppercase", fontSize: "11px", fontWeight: 700 }}>
                {meal.strCategory}
              </span>
            </div>
            <h1 className="recipe-title">{meal.strMeal}</h1>

            <div className="recipe-action-row">
              <button className="recipe-save-btn" onClick={toggleFavorite}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
                {isFavorite ? "Guardada" : "Guardar receta"}
              </button>
            </div>

            {nota && (
              <div className="recipe-nota-personal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z" />
                </svg>
                <p>{nota}</p>
              </div>
            )}
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
              <section aria-labelledby="ingredients-heading">
                <div className="ingredients-title-row">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" /><path d="M7 2v20" />
                  </svg>
                  <h2 className="ingredients-title" id="ingredients-heading">Ingredientes</h2>
                </div>
                <ul className="ingredients-list">
                  {ingredientes.map((ing, i) => (
                    <li key={i} className="ingredient-item">
                      <span className="ingredient-dot" aria-hidden="true" />
                      <span className="ingredient-name">{ing.name}</span>
                      <span className="ingredient-amount">{ing.amount}</span>
                    </li>
                  ))}
                </ul>

                <ComerciosCercanos strCategory={meal.strCategory} />
              </section>
            )}

            {activeTab === "preparacion" && (
              <section aria-labelledby="prep-heading">
                <div className="preparation-title-row">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17 8h1a4 4 0 010 8h-1" /><path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" />
                  </svg>
                  <h2 className="ingredients-title" id="prep-heading">Preparación</h2>
                </div>
                <ol className="steps-list">
                  {pasos.map((paso, i) => (
                    <li key={i} className="step-item">
                      <span className="step-number" aria-hidden="true">{i + 1}</span>
                      <div className="step-body">
                        <p className="step-desc">{paso}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {activeTab === "video" && (
              youtubeId ? (
                <div style={{ aspectRatio: "16/9", width: "100%" }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={`Video de preparación de ${meal.strMeal}`}
                    allowFullScreen
                    style={{ border: 0, borderRadius: "var(--radius-md)" }}
                  />
                </div>
              ) : (
                <div className="video-placeholder" role="status">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                  </svg>
                  <p>Esta receta no tiene video disponible</p>
                </div>
              )
            )}
          </div>
        </section>
      </article>

      {mostrarFormulario && (
        <WishlistFormModal
          meal={meal}
          onConfirm={confirmarGuardado}
          onCancel={cancelarGuardado}
        />
      )}
    </>
  );
}