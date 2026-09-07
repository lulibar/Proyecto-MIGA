import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useGeolocation } from "../../hooks/useGeolocation";
import { buscarComerciosCercanos } from "../../services/overpass";
import "../../utils/leafletIconFix";
import "./ComerciosCercanos.css";

export default function ComerciosCercanos({ strCategory }) {
  const { ubicacion, error: errorUbicacion, loading: cargandoUbicacion, pedirUbicacion } = useGeolocation();
  const [comercios, setComercios] = useState([]);
  const [etiqueta, setEtiqueta] = useState("");
  const [buscando, setBuscando] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState(null);
  const [yaBuscado, setYaBuscado] = useState(false);

  async function handleBuscar() {
    if (!ubicacion) {
      pedirUbicacion();
      return;
    }
    await buscarComercios();
  }

  async function buscarComercios() {
    setBuscando(true);
    setErrorBusqueda(null);
    try {
      const resultado = await buscarComerciosCercanos(strCategory, ubicacion.lat, ubicacion.lon);
      setComercios(resultado.comercios);
      setEtiqueta(resultado.etiqueta);
      setYaBuscado(true);
    } catch (err) {
      setErrorBusqueda(err.message);
    } finally {
      setBuscando(false);
    }
  }

  // Si recién se obtuvo la ubicación (después de pedirla), disparamos la búsqueda
  if (ubicacion && !yaBuscado && !buscando && !errorBusqueda) {
    buscarComercios();
  }

  return (
    <section className="comercios-section" aria-labelledby="comercios-heading">
      <div className="comercios-title-row">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <h2 className="comercios-title" id="comercios-heading">
          {etiqueta || "Comercios cercanos"}
        </h2>
      </div>

      {!ubicacion && !cargandoUbicacion && (
        <div className="comercios-cta">
          <p>Descubrí dónde comprar los ingredientes de esta receta cerca tuyo.</p>
          <button className="comercios-btn" onClick={handleBuscar}>
            Buscar comercios cercanos
          </button>
        </div>
      )}

      {cargandoUbicacion && <p role="status">Obteniendo tu ubicación...</p>}
      {errorUbicacion && <p className="comercios-error" role="status">{errorUbicacion}</p>}

      {buscando && <p role="status">Buscando comercios cercanos...</p>}
      {errorBusqueda && <p className="comercios-error" role="status">{errorBusqueda}</p>}

      {ubicacion && yaBuscado && comercios.length === 0 && !buscando && (
        <p className="comercios-empty" role="status">
          No encontramos {etiqueta.toLowerCase()} cerca tuyo. Probá ampliando la búsqueda desde otra ubicación.
        </p>
      )}

      {ubicacion && comercios.length > 0 && (
        <div className="comercios-map-container">
          <MapContainer
            center={[ubicacion.lat, ubicacion.lon]}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[ubicacion.lat, ubicacion.lon]}>
              <Popup>Tu ubicación</Popup>
            </Marker>
            {comercios.map((c) => (
              <Marker key={c.id} position={[c.lat, c.lon]}>
                <Popup>{c.nombre}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </section>
  );
}