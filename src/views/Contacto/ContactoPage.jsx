import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./ContactoPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import "../../utils/leafletIconFix";

const CATEDRAL_COORDS = [-34.9215, -57.9536];

export default function ContactoPage() {
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
                    <a href="mailto:hola@miga.com" className="contact-info-value">hola@miga.com</a>
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
                    <a href="tel:+542211234567" className="contact-info-value">+54 221 123 4567</a>
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

            <section className="contacto-card" aria-labelledby="location-heading">
              <h2 className="contacto-card-title" id="location-heading">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Nuestra ubicación
              </h2>
              <div className="location-section">
                <p className="location-address">
                  Catedral de La Plata, La Plata, Buenos Aires, Argentina
                </p>
                <div className="map-container">
                  <MapContainer
                    center={CATEDRAL_COORDS}
                    zoom={16}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={CATEDRAL_COORDS}>
                      <Popup>Catedral de La Plata — Nuestra oficina</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </section>
          </aside>
        </div>

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
            <p className="thankyou-title">¡Gracias por ser parte de MIGA!</p>
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