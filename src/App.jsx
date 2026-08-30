import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import BottomNav from "./components/BottomNav/BottomNav";
import HomePage from "./views/Home/HomePage";
import SearchPage from "./views/Busqueda/SearchPage";
import RecipePage from "./views/Detalle/RecipePage";
import RecetarioPage from "./views/Recetario/RecetarioPage";
import HistorialPage from "./views/Historial/HistorialPage";
import ContactoPage from "./views/Contacto/ContactoPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Header />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/busqueda" element={<SearchPage />} />
            <Route path="/detalle/:id" element={<RecipePage />} />
            <Route path="/recetario" element={<RecetarioPage />} />
            <Route path="/historial" element={<HistorialPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}