import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./SearchPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import {
  searchMealsByName,
  filterMealsByCategory,
  filterMealsByArea,
  filterMealsByIngredient,
  getCategories,
  getAreas,
  getRandomMeals,
} from "../../services/api";
import { getWishlist, addToWishlist, removeFromWishlist } from "../../utils/storage";
import WishlistFormModal from "../../components/WishlistFormModal/WishlistFormModal";

const PAGE_SIZE = 10;

// Saca duplicados de una lista de strings.
function quitarDuplicados(lista) {
  return [...new Set(lista)];
}

// Arma un diccionario de alias automático: para cada gentilicio (strArea),
// guarda el/los nombre/s real/es de país (strCountry) que lo comparten.
// Esto cubre TODOS los países sin que tengamos que anotarlos a mano uno por uno.
function construirAliasDeAreas(areas) {
  const mapa = {};

  areas.forEach(({ strArea, strCountry }) => {
    if (!strArea || !strCountry) return;
    if (!mapa[strArea]) mapa[strArea] = new Set();
    if (strCountry !== strArea) {
      mapa[strArea].add(strCountry);
    }
  });

  const resultado = {};
  Object.entries(mapa).forEach(([area, countries]) => {
    resultado[area] = [...countries];
  });
  return resultado;
}

function SelectFilter({ label, icon, options, value, onChange }) {
  return (
    <div className="filter-group">
      <label className="filter-label">{label}</label>
      <div className="filter-select-wrap">
        <span className="filter-select-icon">{icon}</span>
        <select className="filter-select" value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg className="filter-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

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

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Los filtros arrancan leyendo la URL, no siempre en blanco
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [category, setCategory] = useState(searchParams.get("categoria") || "Todas");
  const [origin, setOrigin] = useState(searchParams.get("origen") || "Todos");
  const [ingredient, setIngredient] = useState(searchParams.get("ingrediente") || "");

  const [categoryOptions, setCategoryOptions] = useState(["Todas"]);
  const [originOptions, setOriginOptions] = useState(["Todos"]);
  const [areaAliases, setAreaAliases] = useState({});

  const [results, setResults] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [randomMeals, setRandomMeals] = useState([]);
  const [loadingRandom, setLoadingRandom] = useState(true);
  const [mealParaGuardar, setMealParaGuardar] = useState(null);

  // Carga inicial: favoritos, categorías/orígenes (con alias y sin duplicados),
  // y las recetas aleatorias que se muestran antes de la primera búsqueda.
  useEffect(() => {
    setFavorites(new Set(getWishlist().map((item) => item.idMeal)));

    Promise.all([getCategories(), getAreas()])
      .then(([cats, areas]) => {
        const catNames = quitarDuplicados(cats.map((c) => c.strCategory));
        const areaNames = quitarDuplicados(areas.map((a) => a.strArea));

        setCategoryOptions(["Todas", ...catNames]);
        setOriginOptions(["Todos", ...areaNames]);
        setAreaAliases(construirAliasDeAreas(areas));
      })
      .catch((err) => setError(err.message));

    getRandomMeals(10)
      .then((meals) => {
        setRandomMeals(meals);
        setLoadingRandom(false);
      })
      .catch(() => setLoadingRandom(false));
  }, []);

  // Mantiene la URL sincronizada con los filtros actuales,
  // así "Atrás" desde Detalle vuelve a esta misma búsqueda.
  useEffect(() => {
    const params = {};
    if (query.trim()) params.query = query;
    if (category !== "Todas") params.categoria = category;
    if (origin !== "Todos") params.origen = origin;
    if (ingredient.trim()) params.ingrediente = ingredient;
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, origin, ingredient]);

  useEffect(() => {
    const hayAlgunFiltro = query.trim() || ingredient.trim() || category !== "Todas" || origin !== "Todos";

    if (!hayAlgunFiltro) {
      setResults([]);
      setSearched(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, origin, ingredient, areaAliases]);

  function clearFilters() {
    setQuery("");
    setCategory("Todas");
    setOrigin("Todos");
    setIngredient("");
    setResults([]);
    setSearched(false);
  }

  function coincideOrigen(strArea, origenSeleccionado) {
    if (!strArea) return false;
    if (strArea === origenSeleccionado) return true;
    const alias = areaAliases[origenSeleccionado] || [];
    return alias.includes(strArea);
  }

  async function handleSearch() {
    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      let meals = [];

      if (query.trim()) {
        meals = await searchMealsByName(query.trim());
        if (category !== "Todas") meals = meals.filter((m) => m.strCategory === category);
        if (origin !== "Todos") meals = meals.filter((m) => coincideOrigen(m.strArea, origin));
      } else if (ingredient.trim()) {
        meals = await filterMealsByIngredient(ingredient.trim());
      } else if (category !== "Todas") {
        meals = await filterMealsByCategory(category);
        meals = meals.map((m) => ({ ...m, strCategory: category }));
      } else if (origin !== "Todos") {
        // Probamos con el gentilicio seleccionado y, si existen, con sus alias
        // (nombres de país reales), armados automáticamente desde list.php?a=list.
        const variantes = [origin, ...(areaAliases[origin] || [])];
        const resultadosPorVariante = await Promise.all(
          variantes.map((v) =>
            filterMealsByArea(v).catch((err) => {
              console.error(`Error al buscar el origen "${v}":`, err.message);
              return [];
            })
          )
        );

        const vistos = new Set();
        meals = resultadosPorVariante.flat().filter((m) => {
          if (vistos.has(m.idMeal)) return false;
          vistos.add(m.idMeal);
          return true;
        });

        meals = meals.map((m) => ({ ...m, strArea: m.strArea || origin }));
      } else {
        meals = [];
      }

      setResults(meals);
      setVisibleCount(PAGE_SIZE);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite(id) {
    const meal = results.find((m) => m.idMeal === id);
    if (!meal) return;

    if (favorites.has(id)) {
      removeFromWishlist(id);
      setFavorites((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      setMealParaGuardar(meal);
    }
  }

  function confirmarGuardado(formData) {
    if (!mealParaGuardar) return;
    addToWishlist(mealParaGuardar, formData);
    setFavorites((prev) => new Set(prev).add(mealParaGuardar.idMeal));
    setMealParaGuardar(null);
  }

  function cancelarGuardado() {
    setMealParaGuardar(null);
  }

  const mapped = results.map((m) => mapMeal(m, favorites));
  const visible = mapped.slice(0, visibleCount);
  const mappedRandom = randomMeals.map((m) => mapMeal(m, favorites));

  return (
    <div className="search-page">
      <div className="container">
        <PageHeader
          title="Buscar recetas"
          subtitle="Encontrá la receta perfecta según tus gustos e ingredientes."
        />

        <section className="search-filters-section" aria-label="Filtros de búsqueda">
          <div className="search-input-block">
            <label className="search-input-label" htmlFor="search-query">Buscar por nombre</label>
            <div className="search-input-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="search-query"
                className="search-input"
                type="search"
                placeholder="Ej: Chicken, Pasta, Cake..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>

          <div className="filters-grid">
            <SelectFilter
              label="Categoría"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>}
              options={categoryOptions}
              value={category}
              onChange={setCategory}
            />
            <SelectFilter
              label="Origen"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>}
              options={originOptions}
              value={origin}
              onChange={setOrigin}
            />
            <div className="filter-group">
              <label className="filter-label" htmlFor="ingredient-input">Ingrediente principal</label>
              <div className="filter-select-wrap">
                <input
                  id="ingredient-input"
                  className="filter-select"
                  type="text"
                  placeholder="Ej: chicken, rice..."
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>

            <div className="filter-clear-wrap" style={{ gap: "10px" }}>
              <button
                className="filter-clear-btn"
                style={{ background: "var(--color-terracota)", color: "var(--color-white)", padding: "9px 16px", borderRadius: "var(--radius-sm)" }}
                onClick={handleSearch}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Buscar
              </button>
              <button className="filter-clear-btn" onClick={clearFilters}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                </svg>
                Limpiar filtros
              </button>
            </div>
          </div>
        </section>

        <section aria-label="Resultados de búsqueda">
          {loading && <p>Buscando recetas...</p>}
          {error && <p role="status">Ocurrió un error: {error}</p>}

          {!loading && searched && (
            <div className="results-header">
              <p className="results-count">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{mapped.length} recetas encontradas</span>
              </p>
            </div>
          )}

          {!loading && searched && mapped.length > 0 && (
            <>
              <div className="results-grid">
                {visible.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    variant="grid"
                    onFavoriteToggle={toggleFavorite}
                    onClick={(r) => navigate(`/detalle/${r.id}`)}
                  />
                ))}
              </div>

              {visibleCount < mapped.length && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <button className="filter-clear-btn" onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}>
                    Cargar más recetas
                  </button>
                </div>
              )}
            </>
          )}

          {!loading && searched && mapped.length === 0 && !error && (
            <div className="empty-state" role="status">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p className="empty-state-title">Sin resultados</p>
              <p className="empty-state-subtitle">Probá con otros términos o filtros.</p>
            </div>
          )}

          {!searched && (
            <>
              <div className="results-header">
                <p className="results-count">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M11 20A7 7 0 0118 7a7 7 0 01-7 13z" /><path d="M11 20c0-5.523 4.477-10 10-10" />
                  </svg>
                  <span>Algunas ideas para inspirarte</span>
                </p>
              </div>

              {loadingRandom && <p>Cargando sugerencias...</p>}

              {!loadingRandom && mappedRandom.length > 0 && (
                <div className="results-grid">
                  {mappedRandom.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      variant="grid"
                      onFavoriteToggle={toggleFavorite}
                      onClick={(r) => navigate(`/detalle/${r.id}`)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {mealParaGuardar && (
        <WishlistFormModal
          meal={mealParaGuardar}
          onConfirm={confirmarGuardado}
          onCancel={cancelarGuardado}
        />
      )}
    </div>
  );
}