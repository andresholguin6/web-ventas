// src/servicios/productos.js
// Capa de acceso a datos. Hoy: localStorage + seed JSON.
// Mañana: fetch() a la API real. Los componentes no se tocan.

import productosViajesSeed from "../data/productos-viajes.json";
import productosBisuteriaSeed from "../data/productos-bisuteria.json";

// Clave de localStorage por rubro
const STORAGE_KEYS = {
  viajes: "productos_viajes",
  bisuteria: "productos_bisuteria",
};

// Seeds por rubro
const SEEDS = {
  viajes: productosViajesSeed,
  bisuteria: productosBisuteriaSeed,
};

/**
 * Inicializa localStorage con el seed si está vacío.
 */
function inicializar(rubro) {
  const key = STORAGE_KEYS[rubro];
  if (!key) throw new Error(`Rubro no válido: ${rubro}`);

  const existente = localStorage.getItem(key);
  if (!existente) {
    localStorage.setItem(key, JSON.stringify(SEEDS[rubro] || []));
  }
}

/**
 * Devuelve todos los productos de un rubro.
 */
export function getProductos(rubro = "viajes") {
  inicializar(rubro);
  const data = localStorage.getItem(STORAGE_KEYS[rubro]);
  return data ? JSON.parse(data) : [];
}

/**
 * Devuelve un producto por slug.
 */
export function getProductoPorSlug(slug, rubro = "viajes") {
  const productos = getProductos(rubro);
  return productos.find((p) => p.slug === slug) || null;
}

/**
 * Crea un producto nuevo.
 * Solo título e imagen son obligatorios (validación en el admin).
 */
export function crearProducto(data, rubro = "viajes") {
  const productos = getProductos(rubro);

  const nuevo = {
    id: data.id || `prod-${Date.now()}`,
    slug: data.slug || slugify(data.nombre || ""),
    nombre: data.nombre || "",
    categoria: data.categoria || "",
    descripcionCorta: data.descripcionCorta || "",
    descripcionLarga: data.descripcionLarga || "",
    imagen: data.imagen || "",
    galeria: data.galeria || [],
    precio: data.precio ?? null,
    moneda: data.moneda || "COP",
    mostrarPrecio: data.mostrarPrecio ?? false,
    atributos: data.atributos || {},
    activo: data.activo ?? true,
    createdAt: new Date().toISOString(),
  };

  productos.push(nuevo);
  localStorage.setItem(STORAGE_KEYS[rubro], JSON.stringify(productos));
  return nuevo;
}

/**
 * Actualiza un producto existente por id.
 */
export function actualizarProducto(id, data, rubro = "viajes") {
  const productos = getProductos(rubro);
  const idx = productos.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  productos[idx] = {
    ...productos[idx],
    ...data,
    id: productos[idx].id, // no permitir cambiar el id
    slug: data.slug || productos[idx].slug,
  };

  localStorage.setItem(STORAGE_KEYS[rubro], JSON.stringify(productos));
  return productos[idx];
}

/**
 * Elimina un producto por id.
 */
export function eliminarProducto(id, rubro = "viajes") {
  const productos = getProductos(rubro);
  const filtrados = productos.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS[rubro], JSON.stringify(filtrados));
  return true;
}

/**
 * Resetea el rubro al seed original (útil para pruebas).
 */
export function resetearProductos(rubro = "viajes") {
  localStorage.setItem(STORAGE_KEYS[rubro], JSON.stringify(SEEDS[rubro] || []));
}

/**
 * Helper: genera slug a partir de un texto.
 */
function slugify(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}