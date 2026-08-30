import { useState } from "react";
import "./ContactoPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";

const subjectOptions = [
  "¿En qué podemos ayudarte?",
  "Consulta general",
  "Reportar un problema",
  "Sugerir una receta",
  "Colaboración",
  "Otro",
];

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="contacto-page">
      <div className="container">
        <PageHeader
          title="Contacto"
          subtitle="Nos encantaría saber de vos. Escribinos tu consulta, sugerencia o propuesta."
        />

        <div className="contacto-grid">
          {/* Left column */}
          <aside className="contacto-left">
            <section className="contacto-card" aria-labelledby="info-heading">
              <h2 className="contacto-card-title" id="info-heading">Información de contacto</h2>
              <ul className="contact-info-list">
                <li className="contact-info-item">
                  <span className="contact-info-icon contact-info-icon--mail" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <div>
                    <p className="contact-info-label">Email</p>
                    <a href="mailto:hola@recetapp.com" className="contact-info-value">hola@recetapp.com</a>
                  </div>
                </li>
                <li className="contact-info-item">
                  <span className="contact-info-icon contact-info-icon--phone" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                    </svg>
                  </span>
                  <div>
                    <p className="contact-info-label">Teléfono</p>
                    <a href="tel:+5491112345678" className="contact-info-value">+54 9 11 1234 5678</a>
                  </div>
                </li>
                <li className="contact-info-item">
                  <span className="contact-info-icon contact-info-icon--clock" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <div>
                    <p className="contact-info-label">Horario de atención</p>
                    <p className="contact-info-text">Lunes a Viernes de 9:00 a 18:00 hs</p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="contacto-card" aria-labelledby="social-heading">
              <h2 className="contacto-card-title" id="social-heading">Seguinos en redes</h2>
              <div className="social-icons">
                <a href="#" className="social-icon" aria-label="Instagram de RecetApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Facebook de RecetApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="YouTube de RecetApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Pinterest de RecetApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83l1.2-5.07s-.31-.61-.31-1.52c0-1.43.83-2.49 1.86-2.49.88 0 1.3.66 1.3 1.45 0 .88-.56 2.21-.85 3.44-.24 1.03.51 1.86 1.52 1.86 1.82 0 3.23-1.92 3.23-4.69 0-2.45-1.76-4.16-4.28-4.16-2.91 0-4.62 2.18-4.62 4.44 0 .88.34 1.82.76 2.33.08.1.09.19.07.29l-.28 1.15c-.05.18-.16.22-.36.13-1.33-.62-2.16-2.57-2.16-4.14 0-3.36 2.44-6.45 7.04-6.45 3.7 0 6.57 2.64 6.57 6.16 0 3.67-2.31 6.63-5.52 6.63-1.08 0-2.09-.56-2.44-1.22l-.66 2.47c-.24.92-.88 2.07-1.31 2.77.99.31 2.03.47 3.11.47 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                  </svg>
                </a>
              </div>
              <p className="social-handle">@recetapp.oficial</p>
            </section>
          </aside>

          {/* Contact form */}
          <section className="contacto-card contacto-form-card" aria-labelledby="form-heading">
            <div className="form-card-header">
              <h2 className="contacto-card-title" id="form-heading">Envianos un mensaje</h2>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-terracota)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>

            {sent ? (
              <div className="form-success" role="status">
                <div className="form-success-icon" aria-hidden="true">✓</div>
                <h3>¡Mensaje enviado!</h3>
                <p>Gracias por escribirnos. Te responderemos a la brevedad.</p>
                <button className="form-success-btn" onClick={() => setSent(false)}>Enviar otro mensaje</button>
              </div>
            ) : (
              <form className="contacto-form" onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                  <label className="form-label" htmlFor="nombre">Nombre</label>
                  <input
                    id="nombre"
                    className="form-input"
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="asunto">Asunto</label>
                  <div className="form-select-wrap">
                    <select
                      id="asunto"
                      className="form-select"
                      name="asunto"
                      value={form.asunto}
                      onChange={handleChange}
                    >
                      {subjectOptions.map((o) => (
                        <option key={o} value={o === subjectOptions[0] ? "" : o}>{o}</option>
                      ))}
                    </select>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="form-select-arrow" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    className="form-textarea"
                    name="mensaje"
                    placeholder="Escribí tu mensaje aquí..."
                    value={form.mensaje}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>
                <button type="submit" className="form-submit-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Enviar mensaje
                </button>
              </form>
            )}
          </section>
        </div>

        {/* Location */}
        <section className="location-section" aria-labelledby="location-heading">
          <div className="contacto-card">
            <h2 className="contacto-card-title" id="location-heading">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Dónde estamos
            </h2>
            <address className="location-address">
              Av. Corrientes 1234, Piso 5, Oficina 502<br />CABA, Argentina
            </address>
            <div className="map-placeholder" role="img" aria-label="Mapa de ubicación en Av. Corrientes, CABA">
              <div className="map-grid" aria-hidden="true">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="map-cell" />
                ))}
              </div>
              <div className="map-pin" aria-hidden="true">
                <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
                  <path d="M14 0C6.268 0 0 6.268 0 14c0 9.625 14 22 14 22S28 23.625 28 14C28 6.268 21.732 0 14 0z" fill="#C65D3A" />
                  <circle cx="14" cy="14" r="6" fill="white" />
                </svg>
              </div>
              <span className="map-label map-label--teatro" aria-hidden="true">Teatro Colón</span>
              <span className="map-label map-label--obelisco" aria-hidden="true">Obelisco</span>
              <span className="map-label map-label--corrientes" aria-hidden="true">Av. Corrientes</span>
              <span className="map-label map-label--congreso" aria-hidden="true">Congreso</span>
            </div>
          </div>
        </section>

        {/* Thank you footer */}
        <footer className="thankyou-banner">
          <div className="thankyou-icon" aria-hidden="true">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="26" fill="#FAF5EB" />
              <path d="M18 30c3 4 13 4 16 0" stroke="#69734A" strokeWidth="2" fill="none" strokeLinecap="round" />
              <ellipse cx="20" cy="24" rx="2" ry="1.5" fill="#69734A" />
              <ellipse cx="32" cy="24" rx="2" ry="1.5" fill="#69734A" />
            </svg>
          </div>
          <div className="thankyou-text">
            <p className="thankyou-title">¡Gracias por ser parte de RecetApp!</p>
            <p className="thankyou-subtitle">Tu opinión nos ayuda a seguir mejorando cada día.</p>
          </div>
          <div className="thankyou-heart" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#F4A7A7" stroke="none">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
        </footer>
      </div>
    </div>
  );
}