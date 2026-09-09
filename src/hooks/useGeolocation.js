import { useState } from "react";

export function useGeolocation() {
  const [ubicacion, setUbicacion] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function pedirUbicacion() {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUbicacion({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setError("Necesitamos tu ubicación para mostrarte comercios cercanos.");
        } else {
          setError("No pudimos obtener tu ubicación.");
        }
        setLoading(false);
      }
    );
  }

  return { ubicacion, error, loading, pedirUbicacion };
}