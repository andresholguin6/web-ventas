export default function ProductosTable({ productos, onEditar, onEliminar }) {
  const formatearPrecio = (precio, moneda = "COP") =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: moneda,
      maximumFractionDigits: 0,
    }).format(precio);

  if (productos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
        No hay productos. Crea el primero.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
              Imagen
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
              Nombre
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
              Categoría
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
              Precio
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
              Estado
            </th>
            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {productos.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              </td>
              <td className="px-4 py-3">
                <p className="font-medium text-gray-900">{p.nombre}</p>
                <p className="text-xs text-gray-500">/{p.slug}</p>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {p.categoria || "—"}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {p.mostrarPrecio && p.precio != null
                  ? formatearPrecio(p.precio, p.moneda)
                  : "—"}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${p.activo ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                >
                  {p.activo ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onEditar(p)}
                  className="text-sm text-blue-600 hover:underline mr-3"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(p.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
