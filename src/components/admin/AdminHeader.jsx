export default function AdminHeader({ onLogout }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Panel Admin</h1>
        <button
          onClick={onLogout}
          className="text-sm text-gray-600 hover:text-red-600 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
