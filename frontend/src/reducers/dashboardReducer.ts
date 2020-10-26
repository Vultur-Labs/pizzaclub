import { Reducer } from "redux";
import { Account } from "../types/account";
import { ProductType } from "../types/product-type";
import { Product } from "../types/product";
import { Place } from "../types/place";
import { Employee } from "../types/employee";
import { Table } from "../types/table";

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
export const FETCH_EMPLOYEES = "FETCH_EMPLOYEES";
export const CREATE_EMPLOYEE = "CREATE_EMPLOYEE";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const FETCH_TABLES = "FETCH_TABLES";
export const CREATE_TABLE = "CREATE_TABLE";
export const UPDATE_TABLE = "UPDATE_TABLE";
export const DELETE_TABLE = "DELETE_TABLE";

type State = {
  account: Partial<Account>;
  types: ProductType[];
  products: Product[];
  product: Partial<Product>;
  orders: any[];
  place: Partial<Place>;
  employees: Employee[];
  tables: Table[];
};

const initialState: State = {
  account: {},
  types: [],
  products: [],
  product: {},
  orders: [],
  place: {},
  employees: [],
  tables: [],
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
    
      case FETCH_EMPLOYEES:
        return {
          ...state,
          employees: payload ?? [],
        };
  
      case CREATE_EMPLOYEE:
        return {
          ...state,
          employees: [...state.employees, payload],
        };
  
      case UPDATE_EMPLOYEE:
        const employeeIndex = state.employees.findIndex(
          e => e.user.id === payload.user.id
        );
        const employees = [...state.employees];
  
        employees[employeeIndex] = payload;
  
        return {
          ...state,
          employees,
        };
  
      case DELETE_EMPLOYEE:
        return {
          ...state,
          employees:
            state.employees.filter(e => e.user.id !== payload) ?? [],
        };
      
      case FETCH_TABLES:
        return {
          ...state,
          tables: payload ?? [],
        };
  
      case CREATE_TABLE:
        return {
          ...state,
          tables: [...state.tables, payload],
        };
  
      case UPDATE_TABLE:
        const tableIndex = state.tables.findIndex(
          t => t.id === payload.id
        );
        const tables = [...state.tables];
  
        tables[tableIndex] = payload;
  
        return {
          ...state,
          tables,
        };
  
      case DELETE_TABLE:
        return {
          ...state,
          tables:
            state.tables.filter(t => t.id !== payload) ?? [],
        };
    default:
      return state;
  }
};
