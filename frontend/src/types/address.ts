import { Base } from "./base";

export interface Address extends Base {
  address: string;
  elev: string;
  lat: string;
  lon: string;
}
