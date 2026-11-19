import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useProductos } from "../hooks/useProducts";
import LoginForm from "../components/admin/LoginForm";
import AdminHeader from "../components/admin/AdminHeader";
import ProductosTable from "../components/admin/ProductsTable";
import ProductoForm from "../components/admin/ProductForm";

export default function Admin() {
  // 1. Autenticación (hook)
  const { autenticado, error, login, logout } = useAuth();

  // 2. Productos (hook)
  const { productos, crear, actualizar, eliminar } = useProductos("viajes");

  // 3. Estado local del formulario (solo UI)
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  // Handlers del formulario
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
      actualizar(productoEditando.id, data);
    } else {
      crear(data);
    }
    cerrarFormulario();
  };

  const handleEliminar = (id) => {
    if (!confirm("¿Eliminar este producto?")) return;
    eliminar(id);
  };

  // 4. Render condicional: login o panel
  if (!autenticado) {
    return <LoginForm onLogin={login} error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={logout} />

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

        <ProductosTable
          productos={productos}
          onEditar={abrirEditar}
          onEliminar={handleEliminar}
        />
      </main>

      {mostrarFormulario && (
        <ProductoForm
          producto={productoEditando}
          onGuardar={guardarProducto}
          onCancelar={cerrarFormulario}
        />
      )}
    </div>
  );
}