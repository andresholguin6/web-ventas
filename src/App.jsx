import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Producto from "./pages/Producto";
import configViajes from "./data/config-viajes.json";
import productosViajes from "./data/productos-viajes.json";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME DE VIAJES */}
        <Route
          path="/viajes"
          element={
            <Home
              config={configViajes}
              productos={productosViajes}
              tituloProductos="Paquetes"
            />
          }
        />

        {/* FICHA DE PRODUCTO — sin Navbar ni Footer */}
        <Route
          path="/producto/:slug"
          element={
            <div className="min-h-screen bg-green-50">
              <Producto productos={productosViajes} config={configViajes} />
            </div>
          }
        />

        {/* REDIRECCIÓN RAÍZ */}
        <Route path="/" element={<Navigate to="/viajes" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
