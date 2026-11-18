import { useState, useEffect } from "react";
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../services/productos";

export default function Admin() {
  const [autenticado, setAutenticado] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [productos, setProductos] = useState([]);

  // Estado del formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const USUARIO_VALIDO = "admin";
  const PASSWORD_VALIDA = "admin123";

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") setAutenticado(true);
  }, []);

  useEffect(() => {
    if (autenticado) {
      setProductos(getProductos("viajes"));
    }
  }, [autenticado]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (usuario === USUARIO_VALIDO && password === PASSWORD_VALIDA) {
      localStorage.setItem("adminAuth", "true");
      setAutenticado(true);
      setError("");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setAutenticado(false);
    setUsuario("");
    setPassword("");
  };

  const handleEliminar = (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    eliminarProducto(id, "viajes");
    setProductos(getProductos("viajes"));
  };

  const abrirNuevo = () => {
    setProductoEditando(null);
    setMostrarFormulario(true);
  };

  const abrirEditar = (producto) => {
    setProductoEditando(producto);
    setMostrarFormulario(true);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);
  };

  const guardarProducto = (data) => {
    if (productoEditando) {
      actualizarProducto(productoEditando.id, data, "viajes");
    } else {
      crearProducto(data, "viajes");
    }
    setProductos(getProductos("viajes"));
    cerrarFormulario();
  };

  const formatearPrecio = (precio, moneda = "COP") =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: moneda,
      maximumFractionDigits: 0,
    }).format(precio);

  if (!autenticado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
            Panel Admin
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Panel Admin</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Productos</h2>
          <button
            onClick={abrirNuevo}
            className="bg-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-800 transition"
          >
            + Nuevo producto
          </button>
        </div>

        {/* Listado de productos */}
        {productos.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
            No hay productos. Crea el primero.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Imagen</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Nombre</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Categoría</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Precio</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Estado</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productos.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <img src={p.imagen} alt={p.nombre} className="w-12 h-12 object-cover rounded-lg" />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{p.nombre}</p>
                      <p className="text-xs text-gray-500">/{p.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{p.categoria || "—"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {p.mostrarPrecio && p.precio != null ? formatearPrecio(p.precio, p.moneda) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${p.activo ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                        {p.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => abrirEditar(p)}
                        className="text-sm text-blue-600 hover:underline mr-3"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(p.id)}
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
        )}
      </main>

      {/* Formulario modal */}
      {mostrarFormulario && (
        <FormularioProducto
          producto={productoEditando}
          onGuardar={guardarProducto}
          onCancelar={cerrarFormulario}
        />
      )}
    </div>
  );
}

// ============ FORMULARIO ============
function FormularioProducto({ producto, onGuardar, onCancelar }) {
  const [form, setForm] = useState({
    nombre: producto?.nombre || "",
    slug: producto?.slug || "",
    categoria: producto?.categoria || "",
    precio: producto?.precio ?? "",
    moneda: producto?.moneda || "COP",
    mostrarPrecio: producto?.mostrarPrecio ?? false,
    descripcionCorta: producto?.descripcionCorta || "",
    descripcionLarga: producto?.descripcionLarga || "",
    imagen: producto?.imagen || "",
    activo: producto?.activo ?? true,
  });

  const [preview, setPreview] = useState(producto?.imagen || "");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, imagen: reader.result });
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.imagen) {
      alert("El nombre y la imagen son obligatorios");
      return;
    }
    onGuardar(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl my-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {producto ? "Editar producto" : "Nuevo producto"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagen}
              className="w-full text-sm"
            />
            {preview && (
              <img src={preview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
            )}
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría (opcional)
            </label>
            <input
              type="text"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Precio */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio (opcional)
              </label>
              <input
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Moneda
              </label>
              <select
                name="moneda"
                value={form.moneda}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="COP">COP</option>
                <option value="USD">USD</option>
                <option value="MXN">MXN</option>
              </select>
            </div>
          </div>

          {/* Mostrar precio */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="mostrarPrecio"
              checked={form.mostrarPrecio}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-700">Mostrar precio en el catálogo</label>
          </div>

          {/* Descripción corta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción corta (opcional)
            </label>
            <textarea
              name="descripcionCorta"
              value={form.descripcionCorta}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Descripción larga */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción larga (opcional)
            </label>
            <textarea
              name="descripcionLarga"
              value={form.descripcionLarga}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Activo */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="activo"
              checked={form.activo}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-700">Producto activo</label>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              {producto ? "Guardar cambios" : "Crear producto"}
            </button>
            <button
              type="button"
              onClick={onCancelar}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}