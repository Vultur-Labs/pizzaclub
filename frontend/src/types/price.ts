import { Product } from "./product";

export interface Price {
  product: Product;
  get_product_name: string;
  size: any;
  presentation: any;
  price: number;
}
