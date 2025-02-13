export const URL_SERVIDOR = "http://localhost:3000";

export const MAX_POCAS_EXISTENCIAS = 3;

export const FORMATO = Object.freeze({
  FECHA_CORTA: Symbol("FECHA_CORTA"),
  FECHA_LARGA: Symbol("FECHA_LARGA"),
  MONEDA: Symbol("MONEDA"),
  NUMERO: Symbol("NUMERO"),
  TEXTO: Symbol("TEXTO"),
});

export const configuracionGraficoInventario = {
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
