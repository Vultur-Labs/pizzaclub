import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faClock,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import { Base } from "./base";
import { Price } from "./price";

export const statusMap: Record<string, string> = {
  prepearing: "Preparando",
  delivered: "Entregado",
  asked: "Pedido",
};

export const statusMapToClassButton: Record<string, string> = {
  prepearing: "button is-small is-warning has-tooltip-right",
  delivered: "button is-small is-success has-tooltip-right",
  asked: "button is-small is-danger has-tooltip-right",
};

export const statusMapToIcon: Record<string, IconProp> = {
  prepearing: faUtensils,
  delivered: faCheckSquare,
  asked: faClock,
};

export const statusMapToNext: Record<string, string> = {
  prepearing: "delivered",
  delivered: "asked",
  asked: "prepearing",
};

export interface Table extends Base {
  number: number;
  is_open: boolean;
  owner: number;
}

export interface OrderTable extends Base {
  owner: number;
  employee: number;
  table: Table;
  date: Date;
  items: TableItem[];
  status: string;
  total: number;
  comment: string;
}

export interface TableItem extends Base {
  order: number;
  product: Price;
  quantity: number;
  unitary_price: number;
  total: number;
  status: string;
}
