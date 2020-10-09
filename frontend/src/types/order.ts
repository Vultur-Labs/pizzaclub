import { Product } from "../components/Products";
import { Base } from "./base";

export interface Order extends Base {
  client: number;
  comment: string;
  date: string;
  delivery_address: string;
  delivery_mode: string;
  items: Product[];
  order: number;
  order_type: string;
  status: string;
  table: string;
  total: number;
}
