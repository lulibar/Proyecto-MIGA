import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HistorialPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import { historialItems } from "../../data/mockData";

function categoryColor(category) {
  if (category === "Postre") return { bg: "#FEF6E0", color: "#B8860B" };
  if (category === "Ensalada") return { bg: "#EEF4E8", color: "#4A6741" };
  return { bg: "#FCEEE9", color: "#C65D3A" };
}

const groups = ["Hoy", "Ayer", "Esta semana"];

export default function HistorialPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(historialItems);

  function clearHistorial() {
    setItems([]);
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
            <button className="historial-clear-btn" onClick={clearHistorial}>
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
          groups.map((group) => {
            const groupItems = items.filter((i) => i.group === group);
            if (groupItems.length === 0) return null;
            return (
              <section key={group} className="historial-group" aria-labelledby={`group-${group}`}>
                <h2 className="historial-group-title" id={`group-${group}`}>{group}</h2>
                <ul className="historial-list">
                  {groupItems.map((item) => {
                    const catStyle = categoryColor(item.recipe.category);
                    return (
                      <li key={item.recipe.id}>
                        <article
                          className="historial-item"
                          onClick={() => navigate(`/detalle/${item.recipe.id}`)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === "Enter" && navigate(`/detalle/${item.recipe.id}`)}
                          aria-label={`Ver receta: ${item.recipe.title}`}
                        >
                          <div className="historial-item-img">
                            <img src={item.recipe.image} alt={`Foto de ${item.recipe.title}`} loading="lazy" />
                          </div>
                          <div className="historial-item-body">
                            <h3 className="historial-item-title">{item.recipe.title}</h3>
                            <div className="historial-item-badges">
                              <span className="badge badge--origin">{item.recipe.origin}</span>
                              <span className="badge" style={{ background: catStyle.bg, color: catStyle.color }}>{item.recipe.category}</span>
                            </div>
                            <p className="historial-item-time">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>{item.viewedAt}</span>
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
            );
          })
        )}
      </div>
    </div>
  );
}