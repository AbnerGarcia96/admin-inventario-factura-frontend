import Layout from "../componentes/Layout";
import { useQuery } from "@tanstack/react-query";
import { obtenerInventarioSucursal } from "../utils/sucursales.http";
import Card from "../componentes/Card";
import { formatear } from "../utils/formato.js";
import { Bar } from "react-chartjs-2";
import Table from "../componentes/Table.jsx";
import Input from "../componentes/Input.jsx";

import {
  MAX_POCAS_EXISTENCIAS,
  FORMATO,
  configuracionGraficoInventario,
} from "../config/config";
import { Eye, Pen } from "lucide-react";
import { useState } from "react";

const configuracionGrafico = configuracionGraficoInventario;
const configuracionColumnas = [
  {
    id: "nombre",
    titulo: "Nombre",
    formato: FORMATO.TEXTO,
    default: "No definido",
  },
  {
    id: "marca",
    titulo: "Marca",
    formato: FORMATO.TEXTO,
    default: "No definido",
  },
  {
    id: "descripcion",
    titulo: "Descripción",
    formato: FORMATO.TEXTO,
    default: "No definido",
  },
  {
    id: "precio",
    titulo: "Precio unitario",
    formato: FORMATO.MONEDA,
    default: "No definido",
  },
  {
    id: "cantidad",
    titulo: "Cantidad",
    formato: FORMATO.NUMERO,
    default: "No definido",
  },
  {
    id: "modificado",
    titulo: "Última modificación",
    formato: FORMATO.FECHA_LARGA,
    default: "Sin actualizaciones",
  },
];
const acciones = [
  {
    nombre: "Detalles",
    icono: <Eye size={15} />,
    color: "bg-blue-600",
    accion: (e) => {
      console.log("Detalles", e);
    },
  },
  {
    nombre: "Editar",
    icono: <Pen size="15" />,
    color: "bg-gray-600",
    accion: (e) => {
      console.log("EDITAR", e);
    },
  },
];

export default function Inventario() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["inventario"],
    queryFn: obtenerInventarioSucursal,
  });
  const [filtro, setFiltro] = useState({
    nombre: "",
    marca: "",
    descripcion: "",
  });
  let valorInventario = "";

  function actualizarFiltro(llave, valor) {
    setFiltro((filtroActual) => {
      return { ...filtroActual, [llave]: valor };
    });
  }

  if (data) {
    valorInventario = formatear(
      data.reduce(
        (acumulador, valorActual) =>
          acumulador + valorActual.precio * valorActual.cantidad,
        0
      ),
      FORMATO.MONEDA
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
      {isPending && <p>Cargando...</p>}

      {!isPending && (
        <>
          <div className="flex items-center justify-center mb-3">
            <div className="w-1/5 flex-auto">
              <Card titulo={valorInventario}>Valor total del inventario</Card>
            </div>
            <div className="w-3/5 flex-auto">
              <Card>
                <Bar
                  data={configuracionGrafico.data}
                  height={"25px"}
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
          <div className="flex items-center justify-center mb-5 gap-5">
            <Input
              id="nombre"
              label="Nombre"
              onChange={(e) => {
                actualizarFiltro("nombre", e.target.value);
              }}
              type="text"
              placeholder="Nombre"
              value={filtro.nombre}
            />
            <Input
              id="marca"
              label="Marca"
              onChange={(e) => {
                actualizarFiltro("marca", e.target.value);
              }}
              type="text"
              placeholder="Marca"
              value={filtro.marca}
            />
            <Input
              id="descripcion"
              label="Descripción"
              onChange={(e) => {
                actualizarFiltro("descripcion", e.target.value);
              }}
              type="text"
              placeholder="Descripción"
              value={filtro.descripcion}
            />
          </div>
          <div className="flex items-center justify-center">
            <Table
              columnas={configuracionColumnas}
              datos={data}
              acciones={acciones}
              filtro={filtro}
            ></Table>
          </div>
        </>
      )}
    </Layout>
  );
}
