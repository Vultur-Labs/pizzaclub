import { Address } from "./address";
import { Base } from "./base";
import { Item } from "./item";

export const statusMap: Record<string, string> = {
  // shipping: "Envío",
  // open: "Abierto",
  cancel: "Cancelado",
  pending: "Pendiente",
  processing: "Procesando",
  delivering: "Enviando",
  ready: "Listo",
};

export const statusStyleMap: Record<string, string> = {
  // shipping: "has-background-primary has-text-link-light is-uppercase",
  // open: "has-background-warning has-text-link-light is-uppercase",
  cancel: "has-background-danger has-text-link-light is-uppercase",
  pending: "has-background-warning has-text-link-light is-uppercase",
  processing: "has-background-primary has-text-link-light is-uppercase",
  delivering: "has-background-info has-text-link-light is-uppercase",
  ready: "has-background-success has-text-link-light is-uppercase",
};

export const deliveryModeMap: Record<string, string> = {
  delivery: "Delivery",
  takeaway: "Takeaway",
  local: "En el Salón",
};

export const deliveryModeStyleMap: Record<string, string> = {
  delivery: "has-background-success has-text-link-light is-uppercase",
  takeaway: "has-background-warning has-text-link-light is-uppercase",
  local: "has-background-info has-text-link-light is-uppercase",
};

export interface Order extends Base {
  client: number;
  comment: string;
  date: string;
  delivery_address: Address;
  delivery_mode: string;
  items: Item[];
  order: number;
  order_type: string;
  status: string;
  table: string;
  total: number;
}

export interface OrderPagination {
  count: number;
  current: number;
  next: number | null;
  previous: number | null;
  total_pages: number;
  results: Order[];
}
