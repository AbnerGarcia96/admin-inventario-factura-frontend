import { useState } from "react";
import { formatear } from "../utils/formato";
import { FORMATO } from "../config/config";
import {
  ArrowUpDown,
  ArrowUpNarrowWide,
  ArrowUpWideNarrow,
} from "lucide-react";
import Button from "./Button.jsx";

export default function Table({
  columnas,
  datos,
  filtro = null,
  acciones = [],
}) {
  let datosTabla = [...datos];
  const [ordenar, setOrdenar] = useState({ columna: "", orden: "" });

  function cambiarOrden(columna) {
    setOrdenar((ordenActual) => {
      let nuevoOrden = {
        columna: columna.id,
        orden: ordenActual.orden,
      };

      if (ordenActual.orden === "") nuevoOrden.orden = "ASC";
      else if (ordenActual.orden === "ASC") nuevoOrden.orden = "DESC";
      else nuevoOrden.orden = "";

      return nuevoOrden;
    });
  }

  if (ordenar.orden != "") {
    const columnaOrdenar = columnas.find(
      (columna) => columna.id === ordenar.columna
    );

    if (
      columnaOrdenar.formato === FORMATO.NUMERO ||
      columnaOrdenar.formato === FORMATO.MONEDA
    ) {
      datosTabla.sort((a, b) =>
        ordenar.orden === "ASC"
          ? a[ordenar.columna] - b[ordenar.columna]
          : b[ordenar.columna] - a[ordenar.columna]
      );
    } else {
      datosTabla.sort((a, b) => {
        const textoA = a[ordenar.columna]?.toUpperCase();
        const textoB = b[ordenar.columna]?.toUpperCase();
        if (textoA < textoB) {
          return ordenar.orden === "ASC" ? -1 : 1;
        }
        if (textoA > textoB) {
          return ordenar.orden === "ASC" ? 1 : -1;
        }
        return 0;
      });
    }
  } else {
    datosTabla = [...datos];
  }

  if (filtro) {
    for (const [llave, valor] of Object.entries(filtro)) {
      datosTabla = datosTabla.filter((fila) =>
        fila[llave].toLowerCase().includes(valor.toLowerCase())
      ); // Actualmente solo functiona para columnas que sean STRING
    }
  }

  return (
    <>
      <table className="w-full text-sm text-left">
        <thead className="text-xs">
          <tr>
            {columnas.map((columna) => (
              <th
                key={columna.titulo}
                scope="col"
                className="px-6 py-3"
                onClick={() => cambiarOrden(columna)}
              >
                <Button className="flex items-center gap-2 uppercase">
                  {columna.titulo}
                  {ordenar.orden === "" && <ArrowUpDown size="15" />}
                  {ordenar.orden === "ASC" && <ArrowUpWideNarrow size="15" />}
                  {ordenar.orden === "DESC" && <ArrowUpNarrowWide size="15" />}
                </Button>
              </th>
            ))}
            {acciones.length > 0 && (
              <th scope="col" className="px-6 py-3">
                ACCIONES
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {datosTabla.map((producto) => {
            const contenido = columnas.map((columna) => (
              <td key={columna.id} className="px-6 py-4">
                {producto[columna.id]
                  ? formatear(producto[columna.id], columna.formato)
                  : columna.default}
              </td>
            ));
            return (
              <tr key={producto.idProducto} className="border-gray-200">
                {contenido}
                {acciones.length > 0 && (
                  <td>
                    {acciones.map((a) => (
                      <Button
                        key={a.nombre}
                        title={a.nombre}
                        onClick={a.accion}
                        clasesCSS={`mx-1 rounded text-white ${a.color}`}
                      >
                        {a.icono && a.icono}
                        {!a.icono && a.nombre}
                      </Button>
                    ))}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
