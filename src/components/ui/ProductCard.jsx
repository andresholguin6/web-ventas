import WhatsAppButton from "./WhatsAppButton";
import { Link } from "react-router-dom";

export default function ProductCard({ producto }) {
  const mensaje = `Hola, me interesa el producto "${producto.nombre}". ¿Está disponible?`;
  const formatearPrecio = (precio, moneda = "COP") =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: moneda,
      maximumFractionDigits: 0,
    }).format(precio);

  return (
    <article className="bg-white/30 rounded-3xl shadow-xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1">
      <Link to={`/producto/${producto.slug}`} className="block overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full aspect-square object-cover object-center transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="p-6 flex flex-col flex-1">
        {/* Título clickeable → ficha */}
        <Link to={`/producto/${producto.slug}`}>
          <h3 className="font-eslogan-2 text-lg font-semibold text-gray-900 hover:text-green-700 transition-colors">
            {producto.nombre}
          </h3>
        </Link>
        <p className="font-eslogan-2 text-sm text-gray-600 mt-2 flex-1">
          {producto.descripcionCorta || producto.descripcion}
        </p>
        {/* Precio condicional */}
        {producto.mostrarPrecio && producto.precio != null && (
          <p className="font-eslogan-2 text-base font-semibold text-green-700 mt-3">
            {formatearPrecio(producto.precio, producto.moneda)}
          </p>
        )}
        <div className="mt-4">
          <WhatsAppButton
            mensaje={mensaje}
            variant="primary"
            className="w-full text-sm"
          >
            Me interesa
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
