import { useState } from "react";
import { useNavigate } from "react-router";
import CryptoJS from "crypto-js";
import config from "../config/config.js";
import Input from "../componentes/Input.jsx";
import Button from "../componentes/Button.jsx";

export default function Login() {
  const [correo, setCorreo] = useState("prueba@gmail.com");
  const [contrasena, setContrasena] = useState("asd.123");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    setCargando(true);
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
      ).catch((error) => alert(error));

      setCargando(false);

      const data = await response.json();

      if (response.status === 401) {
        alert(data.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      setCargando(false);
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
          <Input
            id="correo"
            label="Correo"
            onChange={(e) => setCorreo(e.target.value)}
            type="email"
            placeholder="Ingresa tu correo"
            value={correo}
            disabled={cargando}
          />
          <Input
            id="contrasena"
            label="Contraseña"
            onChange={(e) => setContrasena(e.target.value)}
            type="password"
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            disabled={cargando}
          />
          <div className="flex justify-between text-sm">
            <a href="#" className="text-blue-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Button
            clasesCSS="w-full text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            type="submit"
            disabled={cargando}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
