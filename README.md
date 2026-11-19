# Catálogo Digital Multi-Rubro

Prototipo de catálogo dinámico con panel administrativo, diseñado para pymes que venden por WhatsApp (agencias de viajes, bisutería, etc.). Un solo motor, múltiples "pieles" por rubro.

## 🚀 Cómo correr el proyecto

```bash
npm install
npm run dev
Abre http://localhost:5173.

🔑 Acceso al panel admin
Ruta: /admin

Usuario: admin

Contraseña: admin123

⚠️ Credenciales de prototipo. En producción se reemplazan por autenticación real.

🗺️ Rutas
Ruta	Descripción
/viajes	Catálogo de viajes
/bisuteria	Catálogo de bisutería (pendiente de conectar)
/producto/:slug	Ficha individual de producto
/admin	Panel administrativo

📁 Estructura
text
src/
├── components/
│   ├── layout/       → NavBar, Footer
│   ├── sections/     → Hero, Productos, SobreMi, Testimonios, etc.
│   ├── ui/           → ProductCard, WhatsAppButton
│   └── admin/        → LoginForm, AdminHeader, ProductosTable, ProductoForm
├── data/             → JSONs de config y productos (seeds)
├── hooks/            → useAuth, useProductos
├── pages/            → Home, Producto, Admin
├── servicios/        → productos.js (capa de acceso a datos)
└── styles/

🔄 Arquitectura de datos
Prototipo: localStorage + seeds JSON.

Producción: el servicio servicios/productos.js cambiará su cuerpo por fetch() a la API. Los componentes no se tocan.

✅ Funcionalidades actuales
Catálogo con filtros por categoría (pendiente de pulir).

Ficha individual con botón de WhatsApp (mensaje precargado).

Panel admin con login, CRUD de productos y compresión de imágenes.

Persistencia en localStorage.

⚠️ Pendientes para producción
Backend real (Node/Express o Cloudflare).

Autenticación real (JWT o Cloudflare Access).

Validación de archivos en el servidor.

Almacenamiento de imágenes en Cloudflare R2.

Admin en subdominio separado.

SEO básico y analytics.

npm audit y versiones fijas.

📝 Notas
La compresión de imágenes se hace en el cliente con browser-image-compression.

El slug se genera del nombre al crear y no se modifica al editar (para no romper URLs).

Los campos de producto son opcionales excepto nombre e imagen.