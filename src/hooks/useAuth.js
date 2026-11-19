import { useState, useEffect } from "react";

const USUARIO_VALIDO = "admin";
const PASSWORD_VALIDA = "admin123";

export function useAuth() {
  const [autenticado, setAutenticado] = useState(() => {
    return localStorage.getItem("adminAuth") === "true";
  });
  const [error, setError] = useState("");

  // Al montar, revisa si ya hay sesión guardada
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") setAutenticado(true);
  }, []);

  const login = (usuario, password) => {
    if (usuario === USUARIO_VALIDO && password === PASSWORD_VALIDA) {
      localStorage.setItem("adminAuth", "true");
      setAutenticado(true);
      setError("");
      return true;
    }
    setError("Usuario o contraseña incorrectos");
    return false;
  };

  const logout = () => {
    localStorage.removeItem("adminAuth");
    setAutenticado(false);
    setError("");
  };

  return { autenticado, error, login, logout };
}
