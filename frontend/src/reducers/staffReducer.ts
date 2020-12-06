import { Reducer } from "redux";
import { OrderTable } from "../types/table";

export const FETCH_ORDERTABLE = "FETCH_ORDERTABLE";
export const OPEN_TABLE = "OPEN_TABLE";
export const ADD_TABLEITEM = "ADD_TABLEITEM";
export const REMOVE_TABLEITEM = "REMOVE_TABLEITEM";
export const CLOSE_TABLE = "CLOSE_TABLE";
export const SET_STATUS_ITEM = "SET_STATUS_ITEM";
export const SET_COMMENT = "SET_COMMENT";

type State = {
  orders: OrderTable[];
};

const initialState: State = {
  orders: [],
};

export const staffReducer: Reducer<State> = (
  state = initialState,
  { type, payload }
) => {
  let orders: OrderTable[];

  switch (type) {
    case FETCH_ORDERTABLE:
      return {
        ...state,
        orders: payload,
      };

    case OPEN_TABLE:
      orders = [...state.orders, payload];
      return {
        ...state,
        orders,
      };

    case ADD_TABLEITEM:
    case REMOVE_TABLEITEM:
      orders = state.orders.map((o) => (o.id === payload.id ? payload : o));

      return {
        ...state,
        orders,
      };

    case CLOSE_TABLE:
      orders = state.orders.filter(({ id }) => id !== payload.id);

      return {
        ...state,
        orders,
      };

    case SET_STATUS_ITEM:
      orders = state.orders.map((o) => {
        if (o.id === payload.order) {
          const itemIndex = o.items.findIndex((i) => i.id === payload.id);
          o.items[itemIndex].status = payload.status;
        }
        return o;
      });

      return {
        ...state,
        orders,
      };

    case SET_COMMENT:
      return {
        ...state,
        orders: state.orders.map((o) => (o.id === payload.id ? payload : o)),
      };

    default:
      return state;
  }
};

export const getOrderTables = (state: any) => state.staff.orders;
