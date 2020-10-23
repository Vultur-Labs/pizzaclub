import { Base } from "./base";
import { Price } from "./price";

export interface Item extends Base{
    product: Price;
    quantity: number;
    unitary_price: number;
    discount: number;
    total: number;
}

