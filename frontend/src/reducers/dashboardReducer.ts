import { Reducer } from "redux";
import { Account } from "../types/account";
import { ProductType, ProductSubType } from "../types/product-type";
import { Product } from "../types/product";
import { Place } from "../types/place";
import { Employee } from "../types/employee";
import { Table } from "../types/table";
import { OrderPagination } from "../types/order";
import { OPEN_TABLE, CLOSE_TABLE } from "./staffReducer";

export const DASHBOARD_LOGIN = "DASHBOARD_LOGIN";
export const DASHBOARD_LOGOUT = "DASHBOARD_LOGOUT";
export const FETCH_PLACE = "FETCH_PLACE";
export const FETCH_TYPES = "FETCH_TYPES";
export const CREATE_TYPE = "CREATE_TYPE";
export const UPDATE_TYPE = "UPDATE_TYPE";
export const DELETE_TYPE = "DELETE_TYPE";
export const FETCH_SUBTYPES = "FETCH_SUBTYPES";
export const CREATE_SUBTYPE = "CREATE_SUBTYPE";
export const UPDATE_SUBTYPE = "UPDATE_SUBTYPE";
export const DELETE_SUBTYPE = "DELETE_SUBTYPE";
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
  subtypes: ProductSubType[];
  products: Product[];
  product: Partial<Product>;
  orders: Partial<OrderPagination>;
  place: Partial<Place>;
  employees: Employee[];
  tables: Table[];
};

const initialState: State = {
  account: {},
  types: [],
  subtypes: [],
  products: [],
  product: {},
  orders: {},
  place: {},
  employees: [],
  tables: [],
};

export const dashboardReducer: Reducer<State> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    // LOGIN AND LOGOUT ACTIONS
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
    // PLACE DATA
    case FETCH_PLACE:
      return {
        ...state,
        place: payload ?? [],
      };
    // PRODUCTS ACTIONS
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: payload ?? [],
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
    // TYPES ACTIONS
    case FETCH_TYPES:
      return {
        ...state,
        types: payload ?? [],
      };

    case CREATE_TYPE:
      return {
        ...state,
        types: [...state.types, payload],
      };

    case UPDATE_TYPE:
      return {
        ...state,
        types: state.types.map((t) => (t.id === payload.id ? payload : t)),
      };

    case DELETE_TYPE:
      return {
        ...state,
        types: state.types.filter((t) => t.id !== payload) ?? [],
      };
    // SUBTYPES ACTIONS
    case FETCH_SUBTYPES:
      return {
        ...state,
        subtypes: payload ?? [],
      };

    case CREATE_SUBTYPE:
      return {
        ...state,
        subtypes: [...state.subtypes, payload],
      };

    case UPDATE_SUBTYPE:
      return {
        ...state,
        subtypes: state.subtypes.map((t) =>
          t.id === payload.id ? payload : t
        ),
      };

    case DELETE_SUBTYPE:
      return {
        ...state,
        subtypes: state.types.filter((t) => t.id !== payload) ?? [],
      };
    // ORDERS ACTIONS
    case FETCH_ORDERS:
      return {
        ...state,
        orders: payload ?? {},
      };

    case UPDATE_ORDER:
      const orderIndex = state.orders.results!.findIndex(
        (order) => order.order === payload.order
      );

      const orders = { ...state.orders };
      orders.results![orderIndex] = payload;

      return {
        ...state,
        orders,
      };

    // EMPLOYEES ACTIONS
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
        (e) => e.user.id === payload.user.id
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
        employees: state.employees.filter((e) => e.user.id !== payload) ?? [],
      };
    // TABLES ACTIONS
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
      let tableIndex = state.tables.findIndex((t) => t.id === payload.id);
      let tables = [...state.tables];

      tables[tableIndex] = payload;

      return {
        ...state,
        tables,
      };

    case DELETE_TABLE:
      return {
        ...state,
        tables: state.tables.filter((t) => t.id !== payload) ?? [],
      };

    case OPEN_TABLE:
    case CLOSE_TABLE:
      tableIndex = state.tables.findIndex((t) => t.id === payload.table.id);
      tables = [...state.tables];

      tables[tableIndex] = payload.table;

      return {
        ...state,
        tables,
      };

    default:
      return state;
  }
};

export const getPlace = (state: any) => state.dashboard.place;
export const getTables = (state: any) => state.dashboard.tables;
export const getEmployees = (state: any) => state.dashboard.employees;
export const getAccount = (state: any) => state.dashboard.account;
export const getOrders = (state: any) => state.dashboard.orders.results;
export const getOrdersPages = (state: any) =>
  state.dashboard.orders.total_pages;
export const getOrdersCurrent = (state: any) => state.dashboard.orders.current;
export const getOrdersNext = (state: any) => state.dashboard.orders.next;
export const getOrdersPrevious = (state: any) =>
  state.dashboard.orders.previous;
export const getProducts = (state: any) => state.dashboard.products;
export const getTypesProduct = (state: any) => state.dashboard.types;
export const getSubTypesProduct = (state: any) => state.dashboard.subtypes;
