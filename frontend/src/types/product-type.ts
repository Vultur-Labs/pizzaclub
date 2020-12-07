import { Base } from "./base";

export interface ProductSubType extends Base {
  name: string;
  order_n: number;
}

export interface ProductType extends Base, ProductSubType {
  subtype: ProductSubType[];
  only_local: boolean;
}
