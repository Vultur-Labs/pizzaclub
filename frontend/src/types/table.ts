import { Base } from "./base";

export interface Table extends Base {
    number: number;
    is_open: boolean;
    owner: number;
}