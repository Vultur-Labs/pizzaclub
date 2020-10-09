import { Reducer } from "redux";
import { Account } from "../types/account";
import { ProductType } from "../types/product-type";
import { Product } from "../types/product";

export const DASHBOARD_LOGIN = "DASHBOARD_LOGIN";
export const DASHBOARD_LOGOUT = "DASHBOARD_LOGOUT";
export const FETCH_TYPES = "FETCH_TYPES";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const FETCH_ORDERS = "FETCH_ORDERS";

type State = {
  account: Partial<Account>;
  types: ProductType[];
  products: Product[];
  product: Partial<Product>;
  orders: any[];
};

const initialState: State = {
  account: {},
  types: [],
  products: [],
  product: {},
  orders: [],
};

export const dashboardReducer: Reducer<State> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case DASHBOARD_LOGIN:
      return {
        ...state,
        account: payload,
      };

    case DASHBOARD_LOGOUT:
      return {
        ...state,
        account: {},
      };

    case FETCH_PRODUCTS:
      return {
        ...state,
        products: payload ?? [],
      };

    case FETCH_TYPES:
      return {
        ...state,
        types: payload ?? [],
      };

    case FETCH_PRODUCT:
      return {
        ...state,
        product: payload ?? [],
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products:
          state.products.filter((product) => product.id !== payload) ?? [],
      };

    case FETCH_ORDERS:
      return {
        ...state,
        orders: payload ?? [],
      };

    default:
      return state;
  }
};
