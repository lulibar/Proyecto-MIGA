import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { getRandomMeals, getCategories } from "../../services/api";
import { getWishlist, addToWishlist, removeFromWishlist } from "../../utils/storage";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1627286400579-027de47e9e73?w=800&q=80",
    badge: "🌿 INSPIRACIÓN PARA HOY",
    title: "Descubrí recetas de todo el mundo",
    subtitle: "Explorá sabores, ingredientes y culturas. Encontrá la receta perfecta para cada momento.",
  },
  {
    image: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=800&q=80",
    badge: "🍝 RECETA DEL DÍA",
    title: "Pasta italiana auténtica",
    subtitle: "Simple, elegante y deliciosa. La tradición italiana en tu mesa.",
  },
  {
    image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&q=80",
    badge: "🌮 COCINA MUNDIAL",
    title: "Sabores que cruzan fronteras",
    subtitle: "Desde México hasta Tailandia. Cada receta es un viaje.",
  },
];

function mapMeal(meal, favoritesIds) {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    origin: meal.strArea,
    isFavorite: favoritesIds.has(meal.idMeal),
  };
}

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredMeals, setFeaturedMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const wishlistIds = new Set(getWishlist().map((item) => item.idMeal));
    setFavorites(wishlistIds);

    Promise.all([getRandomMeals(4), getCategories()])
      .then(([meals, cats]) => {
        setFeaturedMeals(meals);
        setCategories(cats.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

    useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  function toggleFavorite(id) {
    const meal = featuredMeals.find((m) => m.idMeal === id);
    if (!meal) return;

    if (favorites.has(id)) {
      removeFromWishlist(id);
      setFavorites((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      addToWishlist(meal, {});
      setFavorites((prev) => new Set(prev).add(id));
    }
  }

  const featuredRecipes = featuredMeals.map((m) => mapMeal(m, favorites));
  const slide = heroSlides[currentSlide];

  return (
    <>
            {/* Hero banner */}
      <section className="hero" aria-label="Receta destacada">
        <div className="hero-img-wrap">
          <img src={slide.image} alt="Plato de receta destacada" className="hero-img" />
          <div className="hero-overlay" aria-hidden="true" />
        </div>
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">{slide.badge}</span>
            <h2 className="hero-title">{slide.title}</h2>
            <p className="hero-subtitle">{slide.subtitle}</p>
            <button className="hero-cta" onClick={() => navigate("/busqueda")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Buscar recetas
            </button>
          </div>
        </div>
        <div className="hero-dots" role="tablist" aria-label="Slides del banner">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              role="tab"
              className={`hero-dot ${i === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(i)}
              aria-selected={i === currentSlide}
              aria-label={`Ver slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="home-section" aria-labelledby="categories-title">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" id="categories-title">Explorá por categoría</h2>
            <button className="section-link" onClick={() => navigate("/busqueda")}>
              Ver todas
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {loading && <p>Cargando categorías...</p>}
          {error && <p role="status">No pudimos cargar las categorías: {error}</p>}

          <div className="category-grid">
            {categories.map((cat) => (
              <button key={cat.idCategory} className="category-chip" onClick={() => navigate(`/busqueda?categoria=${encodeURIComponent(cat.strCategory)}`)}>
                <span className="category-chip-icon">
                  <img src={cat.strCategoryThumb} alt="" width="26" height="26" style={{ borderRadius: "50%", objectFit: "cover" }} />
                </span>
                <span className="category-chip-label">{cat.strCategory}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured recipes */}
      <section className="home-section" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" id="featured-title">Recetas destacadas</h2>
            <button className="section-link" onClick={() => navigate("/busqueda")}>
              Ver todas
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {loading && <p>Cargando recetas...</p>}
          {error && !loading && <p role="status">No pudimos cargar las recetas: {error}</p>}

          <div className="featured-grid">
            {featuredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                variant="grid"
                onFavoriteToggle={toggleFavorite}
                onClick={(r) => navigate(`/detalle/${r.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="home-section" aria-labelledby="cta-title">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-deco-left" aria-hidden="true">
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                <rect x="8" y="12" width="40" height="52" rx="6" fill="#D6A63A" opacity="0.25" />
                <rect x="14" y="6" width="40" height="52" rx="6" fill="#C65D3A" opacity="0.15" stroke="#C65D3A" strokeWidth="1.5" />
                <circle cx="52" cy="18" r="10" fill="#C65D3A" opacity="0.8" />
                <path d="M46 18h12M52 12v12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 26h20M22 34h16M22 42h12" stroke="#9E4028" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
              </svg>
            </div>
            <div className="cta-banner-text">
              <h3 className="cta-banner-title" id="cta-title">Guardá tus recetas favoritas</h3>
              <p className="cta-banner-subtitle">Creá tu recetario personal y tené siempre a mano lo que más te gusta cocinar.</p>
            </div>
            <button className="cta-banner-btn" onClick={() => navigate("/recetario")}>
              Ir a mi recetario
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <div className="cta-banner-deco-right" aria-hidden="true">
              <svg width="48" height="60" viewBox="0 0 48 60" fill="none">
                <path d="M24 55 Q40 30 44 5" stroke="#69734A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
                <ellipse cx="38" cy="20" rx="14" ry="7" transform="rotate(-35 38 20)" fill="#69734A" opacity="0.2" />
                <ellipse cx="42" cy="36" rx="12" ry="6" transform="rotate(-20 42 36)" fill="#69734A" opacity="0.15" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}