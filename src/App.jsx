import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import Inicio from "./paginas/Inicio";
import Login from "./paginas/Login";
import Facturas from "./paginas/Facturas";
import Inventario from "./paginas/Inventario";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const queryClient = new QueryClient();
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
