import { useState, useEffect, useCallback } from "react";
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../services/productos";

export function useProductos(rubro = "viajes") {
  const [productos, setProductos] = useState([]);

  const recargar = useCallback(() => {
    setProductos(getProductos(rubro));
  }, [rubro]);

  useEffect(() => {
    recargar();
  }, [recargar]);

  const crear = (data) => {
    crearProducto(data, rubro);
    recargar();
  };

  const actualizar = (id, data) => {
    actualizarProducto(id, data, rubro);
    recargar();
  };

  const eliminar = (id) => {
    eliminarProducto(id, rubro);
    recargar();
  };

  return { productos, recargar, crear, actualizar, eliminar };
}