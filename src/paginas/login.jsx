import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import CryptoJS from "crypto-js";
import { URL_SERVIDOR } from "../config/config.js";
import Input from "../componentes/Input.jsx";
import Button from "../componentes/Button.jsx";
import { Alert } from "../componentes/Alert.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("prueba@gmail.com");
  const [contrasena, setContrasena] = useState("asd.123");
  const [error, setError] = useState(null);
  const mutation = useMutation({
    mutationFn: loginHTTP,
    onSuccess: exitoHTTP,
    onError: errorHTTP,
  });

  function loginHTTP(credenciales) {
    return fetch(`${URL_SERVIDOR}/autenticacion/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credenciales),
    });
  }

  async function exitoHTTP(respuesta) {
    const data = await respuesta.json();
    if (respuesta.status === 401) {
      setError(data.message);
    } else {
      localStorage.setItem("usuarioActivo", JSON.stringify(data));
      navigate("/");
    }
  }

  function errorHTTP() {
    setError("Error al comunicarse con el servidor");
  }

  function login(e) {
    e.preventDefault();
    mutation.mutate({
      correo: correo,
      contrasena: CryptoJS.SHA256(contrasena).toString(),
    });
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
            disabled={mutation.isPending}
          />
          <Input
            id="contrasena"
            label="Contraseña"
            onChange={(e) => setContrasena(e.target.value)}
            type="password"
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            disabled={mutation.isPending}
          />
          <div className="flex justify-between text-sm">
            <a href="#" className="text-blue-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Button
            clasesCSS="w-full text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            type="submit"
            disabled={mutation.isPending}
          >
            Login
          </Button>
          {error && <Alert tipo="error">{error}</Alert>}
        </form>
      </div>
    </div>
  );
}
