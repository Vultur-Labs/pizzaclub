import { Base, User } from "./base";
import { Address } from "./address";

export interface Employee extends Base {
  user: User;
  dni: string;
  cuil: string;
  phone?: string;
  address: Address;
}
