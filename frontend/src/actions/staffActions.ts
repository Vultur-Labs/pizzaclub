import { Dispatch } from "redux";
import {
  FETCH_ORDERTABLE,
  OPEN_TABLE,
  CLOSE_TABLE,
  ADD_TABLEITEM,
  REMOVE_TABLEITEM,
  SET_STATUS_ITEM,
  SET_COMMENT,
} from "../reducers/staffReducer";
import { apiRoutes, http } from "../services/http";

// STAFF ACTIONS
export const fetchOrderTable = () => async (dispatch: Dispatch) => {
  try {
    const payload = await http.get(apiRoutes.tableorder);

    return dispatch({ type: FETCH_ORDERTABLE, payload });
  } catch (error) {}
};

export const openTable = (
  owner: number,
  table: number,
  employee: number
) => async (dispatch: Dispatch) => {
  try {
    const data = { owner, table, employee };
    const payload = await http.post(apiRoutes.tableorder, data);

    return dispatch({ type: OPEN_TABLE, payload });
  } catch (error) {}
};

export const closeTable = (order: number) => async (dispatch: Dispatch) => {
  try {
    const payload = await http.post(`${apiRoutes.tableorder}${order}/`, {});

    return dispatch({ type: CLOSE_TABLE, payload });
  } catch (error) {}
};

export const addTableItem = (items: Record<string, any>[]) => async (
  dispatch: Dispatch
) => {
  try {
    const payload = await http.post(apiRoutes.staff_table, items);

    return dispatch({ type: ADD_TABLEITEM, payload });
  } catch (error) {}
};

export const removeTableItem = (_order: number, id: number) => async (
  dispatch: Dispatch
) => {
  try {
    const payload = await http.delete(`${apiRoutes.staff_table}${id}/`);

    return dispatch({ type: REMOVE_TABLEITEM, payload });
  } catch (error) {}
};

export const setStatusTableItem = (id: number, status: string) => async (
  dispatch: Dispatch
) => {
  try {
    const payload = await http.patch(`${apiRoutes.staff_table}${id}/`, {
      status,
    });

    return dispatch({ type: SET_STATUS_ITEM, payload });
  } catch (error) {}
};

export const setCommentOrderTable = (id: number, comment: string) => async (
  dispatch: Dispatch
) => {
  try {
    const payload = await http.patch(`${apiRoutes.tableorder}${id}/`, {
      comment,
    });

    return dispatch({ type: SET_COMMENT, payload });
  } catch (error) {}
};
