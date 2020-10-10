import { Base } from "./base";
import { Feature } from "./feature";
import { Place } from "./place";
import { Presentation } from "./presentation";
import { Price } from "./price";
import { Size } from "./size";

export interface Product extends Base {
  size: Size;
  presentation: Presentation;
  feature: Feature;
  prices: Price[];
  order_n: number;
  name: string;
  description: string;
  image: string;
  is_active: boolean;
  types: number | string;
  subtype: string;
  place?: number | Partial<Place>;
}
