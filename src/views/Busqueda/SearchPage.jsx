import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { recipes } from "../../data/mockData";

const categoryOptions = ["Todas", "Plato principal", "Postre", "Ensalada", "Vegetariana", "Rápidas"];
const originOptions = ["Todos", "Tailandia", "México", "Italia", "Grecia", "Estados Unidos", "Francia", "Japón"];
const ingredientOptions = ["Todos", "Pollo", "Carne", "Pescado", "Pasta", "Arroz", "Verduras"];
const timeOptions = ["Cualquier tiempo", "Menos de 15 min", "15–30 min", "30–60 min", "Más de 60 min"];
const difficultyOptions = ["Cualquier dificultad", "Fácil", "Media", "Difícil"];
const sortOptions = ["Más recientes", "Más rápidas", "Más populares", "Tiempo ↑", "Tiempo ↓"];

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

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [origin, setOrigin] = useState("Todos");
  const [ingredient, setIngredient] = useState("Todos");
  const [time, setTime] = useState("Cualquier tiempo");
  const [difficulty, setDifficulty] = useState("Cualquier dificultad");
  const [sort, setSort] = useState("Más recientes");
  const [favorites, setFavorites] = useState(
    new Set(recipes.filter((r) => r.isFavorite).map((r) => r.id))
  );

  function clearFilters() {
    setCategory("Todas");
    setOrigin("Todos");
    setIngredient("Todos");
    setTime("Cualquier tiempo");
    setDifficulty("Cualquier dificultad");
    setQuery("");
  }

  function toggleFavorite(id) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const filtered = recipes
    .filter((r) => {
      if (query && !r.title.toLowerCase().includes(query.toLowerCase()) && !r.origin.toLowerCase().includes(query.toLowerCase())) return false;
      if (category !== "Todas" && r.category !== category) return false;
      if (origin !== "Todos" && r.origin !== origin) return false;
      if (difficulty !== "Cualquier dificultad" && r.difficulty !== difficulty) return false;
      return true;
    })
    .map((r) => ({ ...r, isFavorite: favorites.has(r.id) }));

  return (
    <div className="search-page">
      <div className="container">
        <PageHeader
          title="Buscar recetas"
          subtitle="Encontrá la receta perfecta según tus gustos e ingredientes."
        />

        <section className="search-filters-section" aria-label="Filtros de búsqueda">
          <div className="search-input-block">
            <label className="search-input-label" htmlFor="search-query">Buscar por nombre o ingrediente</label>
            <div className="search-input-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="search-query"
                className="search-input"
                type="search"
                placeholder="Ej: Pollo, chocolate, arroz..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
            <SelectFilter
              label="Ingrediente principal"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" /><path d="M7 2v20" /><path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3v7" /></svg>}
              options={ingredientOptions}
              value={ingredient}
              onChange={setIngredient}
            />
            <SelectFilter
              label="Tiempo de preparación"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>}
              options={timeOptions}
              value={time}
              onChange={setTime}
            />
            <SelectFilter
              label="Dificultad"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>}
              options={difficultyOptions}
              value={difficulty}
              onChange={setDifficulty}
            />
            <div className="filter-clear-wrap">
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
          <div className="results-header">
            <p className="results-count">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{filtered.length} recetas encontradas</span>
            </p>
            <div className="results-sort">
              <label htmlFor="sort-select" className="sort-label">Ordenar por</label>
              <div className="filter-select-wrap sort-select-wrap">
                <select id="sort-select" className="filter-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                  {sortOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
                <svg className="filter-select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="results-grid">
              {filtered.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  variant="grid"
                  onFavoriteToggle={toggleFavorite}
                  onClick={(r) => navigate(`/detalle/${r.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state" role="status">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p className="empty-state-title">Sin resultados</p>
              <p className="empty-state-subtitle">Probá con otros términos o filtros.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}