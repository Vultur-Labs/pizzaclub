import { Base } from "./base";
// import { Product } from "./product";
import { Price } from "./price";

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
    total: number
}

export interface TableItem extends Base {
    order: number;
    product: Price;
    quantity: number;
    unitary_price: number;
    total: number;
    is_delivered: boolean;
}