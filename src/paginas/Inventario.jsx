import Layout from "../componentes/Layout";
import { useQuery } from "@tanstack/react-query";
import { obtenerInventarioSucursal } from "../utils/sucursales.http";
import Card from "../componentes/Card";
import { MAX_POCAS_EXISTENCIAS } from "../config/config";
import { moneda } from "../utils/formato.js";
import { Bar } from "react-chartjs-2";

let configuracionGrafico = {
  data: {
    labels: ["En Existencia", "Bajo en Existencia", "Sin Existencia"],
    datasets: [],
  },
  options: {
    indexAxis: "y",
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
        },
        border: {
          display: false,
        },
      },
    },
  },
};

export default function Inventario() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["inventario"],
    queryFn: obtenerInventarioSucursal,
  });
  let valorInventario = "";

  if (data) {
    valorInventario = moneda.format(
      data.reduce(
        (acumulador, valorActual) =>
          acumulador + valorActual.precio * valorActual.cantidad,
        0
      )
    );
    configuracionGrafico.data.datasets = [
      {
        label: "Cantidad",
        data: [
          data.filter((producto) => producto.cantidad > MAX_POCAS_EXISTENCIAS)
            .length,
          data.filter((producto) => producto.cantidad <= MAX_POCAS_EXISTENCIAS)
            .length,
          data.filter((producto) => producto.cantidad === 0).length,
        ],
        backgroundColor: ["#2196f3", "#ffeb3b", "#f44336"],
        borderColor: ["#2196f3", "#ffeb3b", "#f44336"],
      },
    ];
  }
  return (
    <Layout>
      {!isPending && (
        <div className="flex items-center justify-center mb-3">
          <div className="w-1/5 flex-auto">
            <Card titulo={valorInventario}>Valor total del inventario</Card>
          </div>
          <div className="w-3/5 flex-auto">
            <Card>
              <Bar
                data={configuracionGrafico.data}
                height={"40px"}
                options={configuracionGrafico.options}
              />
            </Card>
          </div>
          <div className="w-1/5 flex-auto">
            <select name="" id="">
              <option value="">Sucursal principal</option>
            </select>
          </div>
        </div>
      )}

      {isPending && <p>Cargando...</p>}
      {!isPending && (
        <div className="flex items-center justify-center">
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
                    <td className="px-6 py-4">
                      {moneda.format(producto.precio)}
                    </td>
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
