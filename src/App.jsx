import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import Inicio from "./paginas/Inicio";
import Login from "./paginas/Login";
import Facturas from "./paginas/Facturas";
import Inventario from "./paginas/Inventario";

const router = createBrowserRouter([
  {
    path: "",
    element: <Inicio />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/facturas",
    element: <Facturas />,
  },
  {
    path: "/inventario",
    element: <Inventario />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
