import { Base } from "./base";
import { Address } from "./address";
import { Shipping } from "./shipping";
 
export interface Place extends Base {
    name: string;
    email: string;
    whatsapp: string;
    cuil: string;
    phone: string;
    address: Address;
    shipping: Shipping;
    tables: number;
}
