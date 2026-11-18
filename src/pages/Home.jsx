import NavBar from "../components/layout/NavBar";
import Hero from "../components/sections/Hero";
import Estadisticas from "../components/sections/Estadisticas";
import SobreMi from "../components/sections/SobreMi";
import Servicios from "../components/sections/Servicios";
import Productos from "../components/sections/Productos";
import Testimonios from "../components/sections/Testimonios";
import Footer from "../components/layout/Footer";
import { getProductos } from "../services/productos";

export default function Home({
  config,
  rubro = "viajes",
  tituloProductos = "Productos",
}) {
  const productos = getProductos(rubro);
  return (
    <div className="min-h-screen bg-green-50">
      <NavBar config={config} />
      <main>
        <Hero config={config} />
        <Estadisticas />
      </main>

      {/* Franja de cierre del Hero */}
      <div className="w-full bg-green-950 py-20 px-6">
        <div className="mx-auto text-center">
          <p className="font-eslogan-2 text-2xl md:text-4xl font-bold text-green-100 leading-snug">
            "Tu salud y bienestar merecen una atención cercana y personalizada"
          </p>
        </div>
      </div>

      <SobreMi />
      {/* <Servicios /> */}
      <Productos productos={productos} titulo={tituloProductos} />
      <Testimonios />
      <Footer config={config} />
    </div>
  );
}
