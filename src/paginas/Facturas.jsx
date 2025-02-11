import { useLoaderData } from "react-router";
import Layout from "../componentes/Layout";
import config from "../config/config";
import { useQuery } from "@tanstack/react-query";
import { obtenerInventarioSucursal } from "../utils/sucursales.http";

export default function Facturas() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["inventario"],
    queryFn: obtenerInventarioSucursal,
  });

  return (
    <Layout>
      <div className="resumen">
        <span>Valor total del inventario</span>|
        <span>
          Gráfico En existencia vs. Bajo en existencia vs. Fuera de inventario
        </span>
        |<span>Filtro de sucursal</span>
      </div>
      <hr />
      {isPending && <p>Cargando...</p>}
      {!isPending && (
        <div className="inventario">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Marca
                </th>
                <th scope="col" className="px-6 py-3">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3">
                  Precio unitario
                </th>
                <th scope="col" className="px-6 py-3">
                  Cantidad
                </th>
                <th scope="col" className="px-6 py-3">
                  Última modificación
                </th>
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((producto) => {
                return (
                  <tr key={producto.idProducto} className="border-gray-200">
                    <td className="px-6 py-4">{producto.nombre}</td>
                    <td className="px-6 py-4">{producto.marca}</td>
                    <td className="px-6 py-4">{producto.descripcion}</td>
                    <td className="px-6 py-4">{producto.precio}</td>
                    <td className="px-6 py-4">{producto.cantidad}</td>
                    <td className="px-6 py-4">
                      {producto.modificado
                        ? producto.modificado
                        : "Sin modificar"}
                    </td>
                    <td>
                      <button>Detalles</button>|<button>Editar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
