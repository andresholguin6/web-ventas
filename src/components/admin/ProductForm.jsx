import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function ProductoForm({ producto, onGuardar, onCancelar }) {
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

  const handleImagen = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    //se instala browser-image-compression para la compresion de imagenes para el prototipo
    //para el backend real validar que tipo de archivo se va a subir antes de comprimirlo
    // Opciones de compresión: apunta a ~200 KB y máx 800px
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);

      // Ahora sí, conviertes el archivo comprimido a Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, imagen: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Error comprimiendo la imagen:", error);
      alert("No se pudo procesar la imagen. Intenta con otra.");
    }
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
    <div className="fixed inset-0 bg-black/50 flex z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl mx-auto my-8 max-h-[90vh] overflow-hidden flex flex-col">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {producto ? "Editar producto" : "Nuevo producto"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-3 pt-2 overflow-y-auto"
        >
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
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
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
            <label className="text-sm text-gray-700">
              Mostrar precio en el catálogo
            </label>
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
