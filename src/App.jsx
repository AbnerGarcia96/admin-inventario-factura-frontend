import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import Inicio from "./paginas/Inicio";
import Login from "./paginas/Login";

const router = createBrowserRouter([
  {
    path: "",
    element: <Inicio />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
