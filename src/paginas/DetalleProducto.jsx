import Layout from "../componentes/Layout";

export default function DetalleProducto() {
  return (
    <Layout>
      <h1>Detalle Producto</h1>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">Formulario</div>
        <div className="col-span-2">Existencia en sucursales</div>
      </div>
    </Layout>
  );
}
