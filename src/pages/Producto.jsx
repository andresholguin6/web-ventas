import { useParams, Link } from "react-router-dom";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import { getProductoPorSlug } from "../services/productos";

export default function Producto({ config, rubro = "viajes" }) {
  const { slug } = useParams();
  const producto = getProductoPorSlug(slug, rubro);

  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Producto no encontrado
        </h1>
        <Link to={`/${rubro}`}className="mt-4 text-green-700 hover:underline">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  const mensaje = `Hola, vi el paquete "${producto.nombre}" en tu página. ¿Me das más información?`;
  const formatearPrecio = (precio, moneda = "COP") =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: moneda,
      maximumFractionDigits: 0,
    }).format(precio);

  return (
    <div className="pt-10 pb-16 px-6 max-w-5xl mx-auto">
      {/* Volver */}
      <Link
        to={`/${rubro}`}
        className="inline-flex items-center text-sm text-gray-600 hover:text-green-700 mb-6"
      >
        ← Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover aspect-square md:aspect-auto"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-green-700 font-semibold">
            {producto.categoria}
          </span>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-2">
            {producto.nombre}
          </h1>

          {producto.mostrarPrecio && producto.precio != null && (
            <p className="text-2xl font-bold text-green-700 mt-4">
              {formatearPrecio(producto.precio, producto.moneda)}
            </p>
          )}

          <p className="text-gray-700 mt-4 leading-relaxed">
            {producto.descripcionLarga || producto.descripcionCorta}
          </p>

          {/* Atributos dinámicos (destino, duración, incluye, etc.) */}
          {producto.atributos && (
            <div className="mt-6 space-y-2">
              {Object.entries(producto.atributos).map(([key, value]) => {
                if (Array.isArray(value)) {
                  return (
                    <div key={key}>
                      <p className="text-sm font-semibold text-gray-900 capitalize">
                        {key}:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {value.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return (
                  <p key={key} className="text-sm text-gray-700">
                    <span className="font-semibold capitalize">{key}:</span>{" "}
                    {value}
                  </p>
                );
              })}
            </div>
          )}

          <div className="mt-8">
            <WhatsAppButton
              mensaje={mensaje}
              variant="primary"
              className="w-full md:w-auto"
            >
              Cotizar por WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </div>
  );
}
