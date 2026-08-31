import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const navItems = [
  {
    path: "/",
    end: true,
    label: "Inicio",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    path: "/busqueda",
    label: "Buscar",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    path: "/recetario",
    label: "Recetario",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    path: "/historial",
    label: "Historial",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    path: "/contacto",
    label: "Contacto",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const showBack = location.pathname.startsWith("/detalle");

  return (
    <header className="header">
      <div className="header-inner">
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
              <span className="logo-name">MIGA</span>
              <span className="logo-tagline">Descubrí algo rico para cocinar hoy</span>
            </div>
          </div>
        </div>

        <nav className="header-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `header-nav-item ${isActive ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}