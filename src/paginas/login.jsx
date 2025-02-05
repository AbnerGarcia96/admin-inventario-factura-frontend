import { useState } from "react";
import CryptoJS from "crypto-js";
import config from "../config/config.js";

export default function Login() {
  const [correo, setCorreo] = useState("prueba@gmail.com");
  const [contrasena, setContrasena] = useState("asd.123");

  async function login(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${config.URL_SERVIDOR}/autenticacion/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correo: correo,
            contrasena: CryptoJS.SHA256(contrasena).toString(),
          }),
        }
      );

      if (response.status === 401) {
        alert("Credenciales inválidas");
      } else {
        const data = await response.json();
        alert("Login exitoso");
      }
    } catch (error) {
      console.error("Error no esperado", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Iniciar Sesión
        </h2>
        <form className="space-y-4" onSubmit={login} noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between text-sm">
            <a href="#" className="text-blue-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
