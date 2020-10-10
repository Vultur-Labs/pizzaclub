import { Reducer } from "redux";
import { Account } from "../types/account";
import { ProductType } from "../types/product-type";
import { Product } from "../types/product";
import { Place } from "../types/place";

export const DASHBOARD_LOGIN = "DASHBOARD_LOGIN";
export const DASHBOARD_LOGOUT = "DASHBOARD_LOGOUT";
export const FETCH_PLACE = "FETCH_PLACE";
export const FETCH_TYPES = "FETCH_TYPES";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const FETCH_ORDERS = "FETCH_ORDERS";
export const UPDATE_ORDER = "UPDATE_ORDER";

type State = {
  account: Partial<Account>;
  types: ProductType[];
  products: Product[];
  product: Partial<Product>;
  orders: any[];
  place: Partial<Place>;
};

const initialState: State = {
  account: {},
  types: [],
  products: [],
  product: {},
  orders: [],
  place: {},
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

    case FETCH_PLACE:
      return {
        ...state,
        place: payload ?? [],
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

    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload],
      };

    case UPDATE_PRODUCT:
      const productIndex = state.products.findIndex(
        (product) => product.id === payload.id
      );
      const products = [...state.products];

      products[productIndex] = payload;

      return {
        ...state,
        products,
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

    case UPDATE_ORDER:
      const orderIndex = state.orders.findIndex(
        (order) => order.order === payload.order
      );
      const orders = [...state.orders];

      orders[orderIndex] = payload;

      return {
        ...state,
        orders,
      };

    default:
      return state;
  }
};
