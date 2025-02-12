import { Link } from "react-router";

const modulos = [
  {
    id: "inicio",
    titulo: "Inicio",
    url: "/",
  },
  {
    id: "facturas",
    titulo: "Facturas",
    url: "/facturas",
  },
  {
    id: "inventario",
    titulo: "Inventario",
    url: "/inventario",
  },
];

export default function SideMenu() {
  return (
    <aside className="w-64 bg-blue-600 text-white p-5 flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">Menú</h2>
      <nav>
        <ul className="space-y-2">
          {modulos.map((m) => {
            return (
              <li key={m.id}>
                <Link
                  to={m.url}
                  className="block p-2 rounded hover:bg-blue-500"
                >
                  {m.titulo}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
