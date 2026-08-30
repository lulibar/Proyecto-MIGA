import "./PageHeader.css";

export default function PageHeader({ title, subtitle, decorative = "leaf" }) {
  return (
    <div className="page-header">
      <div className="page-header-text">
        <h1 className="page-header-title">{title}</h1>
        {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
      </div>
      {decorative === "leaf" && (
        <div className="page-header-deco" aria-hidden="true">
          <svg width="100" height="90" viewBox="0 0 120 110" fill="none">
            <ellipse cx="90" cy="55" rx="36" ry="18" transform="rotate(-30 90 55)" fill="#69734A" opacity="0.18" />
            <path d="M55 85 Q80 40 115 20" stroke="#69734A" strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round" />
            <ellipse cx="85" cy="38" rx="26" ry="13" transform="rotate(-45 85 38)" fill="#69734A" opacity="0.22" />
            <ellipse cx="100" cy="60" rx="22" ry="10" transform="rotate(-20 100 60)" fill="#69734A" opacity="0.16" />
          </svg>
        </div>
      )}
    </div>
  );
}
