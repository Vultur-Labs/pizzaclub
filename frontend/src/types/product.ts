import { Base } from "./base";
import { Feature } from "./feature";
import { Place } from "./place";
import { Presentation } from "./presentation";
import { ProductType } from "./product-type";
import { Size } from "./size";

interface PriceData {
  size: number | null;
  presentation: number | null;
  price: number;
}

export interface Product extends Base {
  size: Size;
  presentation: Presentation;
  feature: Feature;
  prices: PriceData[];
  order_n: number;
  name: string;
  description: string;
  image: string;
  is_active: boolean;
  types: ProductType;
  subtype?: string;
  place?: number | Partial<Place>;
}
