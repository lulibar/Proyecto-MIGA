import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const showBack = location.pathname.startsWith("/detalle");

  return (
    <header className="header">
      <div className="header-inner container">
        <div className="header-left">
          {showBack && (
            <button className="header-back" onClick={() => navigate(-1)} aria-label="Volver atrás">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Atrás</span>
            </button>
          )}
          <div className="header-logo">
            <svg className="logo-icon" width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#FCEEE9" />
              <path d="M11 20c0-3.866 3.134-7 7-7s7 3.134 7 7v1H11v-1z" fill="#C65D3A" />
              <circle cx="18" cy="13" r="3" fill="#C65D3A" />
              <path d="M14 21h8v1a1 1 0 01-1 1h-6a1 1 0 01-1-1v-1z" fill="#9E4028" />
              <rect x="16" y="6" width="4" height="2" rx="1" fill="#C65D3A" />
            </svg>
            <div className="logo-text">
              <span className="logo-name">RecetApp</span>
              <span className="logo-tagline">COCINA SIN LÍMITES</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="header-action-btn" aria-label="Buscar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button className="header-action-btn" aria-label="Favoritos">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
          <button className="header-action-btn" aria-label="Perfil">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}