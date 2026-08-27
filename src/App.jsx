import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getRandomMeals } from "./services/api";
import Home from "./views/Home/Home";
import Busqueda from "./views/Busqueda/Busqueda";
import Detalle from "./views/Detalle/Detalle";
import Recetario from "./views/Recetario/Recetario";
import Historial from "./views/Historial/Historial";
import Contacto from "./views/Contacto/Contacto";

function App() {
  useEffect(() => {
    getRandomMeals(3)
      .then((meals) => console.log("Recetas random:", meals))
      .catch((error) => console.error("Error:", error.message));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/busqueda" element={<Busqueda />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/recetario" element={<Recetario />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;