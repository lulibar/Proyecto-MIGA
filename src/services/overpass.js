const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

function categoriaAComercio(strCategory) {
  const carnes = ["Beef", "Chicken", "Pork", "Lamb", "Goat"];
  if (carnes.includes(strCategory)) {
    return { tag: "shop=butcher", etiqueta: "Carnicerías" };
  }
  if (strCategory === "Seafood") {
    return { tag: "shop=seafood", etiqueta: "Pescaderías" };
  }
  if (["Vegetarian", "Vegan", "Side", "Starter"].includes(strCategory)) {
    return { tag: "shop=greengrocer", etiqueta: "Verdulerías" };
  }
  return { tag: "shop=supermarket", etiqueta: "Supermercados" };
}

export async function buscarComerciosCercanos(strCategory, lat, lon, radio = 1500) {
  const { tag, etiqueta } = categoriaAComercio(strCategory);
  const [key, value] = tag.split("=");

  const query = `
    [out:json][timeout:25];
    (
      node["${key}"="${value}"](around:${radio},${lat},${lon});
    );
    out center 15;
  `;

  const response = await fetch(OVERPASS_URL, {
    method: "POST",
    body: query,
  });

  if (!response.ok) {
    throw new Error("No se pudo consultar los comercios cercanos.");
  }

  const data = await response.json();

  const comercios = data.elements.map((el) => ({
    id: el.id,
    nombre: el.tags?.name || etiqueta.slice(0, -1), 
    lat: el.lat,
    lon: el.lon,
  }));

  return { etiqueta, comercios };
}