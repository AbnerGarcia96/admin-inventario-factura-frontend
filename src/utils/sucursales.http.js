import config from "../config/config";

export async function obtenerInventarioSucursal() {
  const respuesta = await fetch(
    `${config.URL_SERVIDOR}/sucursales/4d33ef92-9362-4ccc-8d22-57b873affedf`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (respuesta.status != 200) {
    return "Error al hacer conexión";
  }

  const data = await respuesta.json();
  return data.inventario;
}
