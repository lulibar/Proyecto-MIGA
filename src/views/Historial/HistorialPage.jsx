import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HistorialPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import { getHistory, clearHistory } from "../../utils/storage";

function categoryColor(category) {
  if (category === "Dessert") return { bg: "#FEF6E0", color: "#B8860B" };
  if (category === "Vegetarian" || category === "Vegan") return { bg: "#EEF4E8", color: "#4A6741" };
  return { bg: "#FCEEE9", color: "#C65D3A" };
}

function formatearFecha(isoString) {
  const fecha = new Date(isoString);
  return fecha.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }) + " " + fecha.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function HistorialPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(getHistory());

  function handleClear() {
    const vacio = clearHistory();
    setItems(vacio);
  }

  return (
    <div className="historial-page">
      <div className="container">
        <PageHeader
          title="Historial"
          subtitle="Tus últimas recetas visitadas."
        />

        {items.length > 0 && (
          <aside className="historial-info-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <p>El historial se guarda automáticamente para que vuelvas a lo que te inspiró.</p>
            <button className="historial-clear-btn" onClick={handleClear}>
              Limpiar historial
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
            </button>
          </aside>
        )}

        {items.length === 0 ? (
          <div className="historial-empty" role="status">
            <div className="historial-empty-icon" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h2 className="historial-empty-title">Sin historial</h2>
            <p className="historial-empty-subtitle">Las recetas que visites aparecerán aquí.</p>
          </div>
        ) : (
          <section aria-labelledby="historial-heading">
            <h2 className="historial-group-title" id="historial-heading" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden" }}>
              Recetas visitadas
            </h2>
            <ul className="historial-list">
              {items.map((item) => {
                const catStyle = categoryColor(item.strCategory);
                return (
                  <li key={item.idMeal}>
                    <article
                      className="historial-item"
                      onClick={() => navigate(`/detalle/${item.idMeal}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && navigate(`/detalle/${item.idMeal}`)}
                      aria-label={`Ver receta: ${item.strMeal}`}
                    >
                      <div className="historial-item-img">
                        <img src={item.strMealThumb} alt={`Foto de ${item.strMeal}`} loading="lazy" />
                      </div>
                      <div className="historial-item-body">
                        <h3 className="historial-item-title">{item.strMeal}</h3>
                        <div className="historial-item-badges">
                          {item.strArea && <span className="badge badge--origin">{item.strArea}</span>}
                          {item.strCategory && (
                            <span className="badge" style={{ background: catStyle.bg, color: catStyle.color }}>{item.strCategory}</span>
                          )}
                        </div>
                        <p className="historial-item-time">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>{formatearFecha(item.fechaVisita)}</span>
                        </p>
                      </div>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="historial-item-arrow" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}