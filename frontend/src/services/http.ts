import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { logout } from "../actions/dashboardActions";
import store from "../store";

type Data = Record<string, any>;

const mapData = (result: AxiosResponse<any>) => result.data;

const handleError = (error: Error & { response: AxiosResponse<any> }) => {
  if (error.response.status === 401) {
    store.dispatch(logout() as any);
  }

  throw error;
};

export class Http {
  public constructor() {
    axios.defaults.baseURL = "/api";
    const token = localStorage.getItem("token") ?? "";
    this.setAuth(token);
  }

  public setAuth(token: string) {
    if (token) {
      axios.defaults.headers.common["authorization"] = `JWT ${token}`;
    } else {
      delete axios.defaults.headers.common["authorization"];
    }
  }

  public get(path: string, options: AxiosRequestConfig = {}) {
    return axios.get(path, options).then(mapData).catch(handleError);
  }

  public post(path: string, data: Data, options: AxiosRequestConfig = {}) {
    return axios.post(path, data, options).then(mapData).catch(handleError);
  }

  public put(path: string, data: Data, options: AxiosRequestConfig = {}) {
    return axios.put(path, data, options).then(mapData).catch(handleError);
  }

  public patch(path: string, data: Data, options: AxiosRequestConfig = {}) {
    return axios.patch(path, data, options).then(mapData).catch(handleError);
  }

  public delete(path: string, options: AxiosRequestConfig = {}) {
    return axios.delete(path, options).then(mapData).catch(handleError);
  }
}

export const http = new Http();

export const apiRoutes = {
  login: "/api-token-auth/",
  me: "/accounts/me/",
  validate_username: "/accounts/validate_username/",
  order_whatsapp: "/orders/whatsapp/",
  owner_data: "/orders/owner/",
  employee_data: "/accounts/employees/",
  types_data: "/orders/types/",
  products_data: "/orders/products/",
  orders: "/orders/",
  tables_data: "/tables/",
  tableorder: "/tables/tableorder/",
  // add_tableitem: "/tables/new_item/",
  // remove_tableitem: "/tables/remove_item/",
  staff_table: "/tables/staff/",
};
