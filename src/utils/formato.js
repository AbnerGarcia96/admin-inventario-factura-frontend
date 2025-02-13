import { FORMATO } from "../config/config";

const moneda = new Intl.NumberFormat("es-HN", {
  style: "currency",
  currency: "HNL",
});
const numero = new Intl.NumberFormat("es-HN", {
  style: "decimal",
});

export function formatear(valor, formato) {
  switch (formato) {
    case FORMATO.MONEDA:
      return moneda.format(valor);
    case FORMATO.NUMERO:
      return numero.format(valor);
    case FORMATO.FECHA_CORTA:
      return valor;
    case FORMATO.FECHA_LARGA:
      return valor;
    case FORMATO.TEXTO:
      return valor;
  }
}
