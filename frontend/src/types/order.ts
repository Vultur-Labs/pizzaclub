import { Product } from "../components/Products";
import { Address } from "./address";
import { Base } from "./base";

export const statusMap: Record<string, string> = {
  shipping: "Envío",
  open: "Abierto",
  cancel: "Cancelado",
  pending: "Pendiente",
  processing: "Procesando",
  delivering: "Enviando",
  ready: "Listo",
};

export interface Order extends Base {
  client: number;
  comment: string;
  date: string;
  delivery_address: Address;
  delivery_mode: string;
  items: Product[];
  order: number;
  order_type: string;
  status: string;
  table: string;
  total: number;
}
