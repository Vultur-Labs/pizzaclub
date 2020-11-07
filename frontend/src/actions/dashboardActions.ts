import { Dispatch } from "redux";
import { Product } from "../types/product";
import {
  DASHBOARD_LOGIN,
  FETCH_TYPES,
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  DASHBOARD_LOGOUT,
  FETCH_ORDERS,
  UPDATE_ORDER,
  FETCH_PLACE,
  FETCH_EMPLOYEES,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  FETCH_TABLES,
  CREATE_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE,
} from "../reducers/dashboardReducer";
import { apiRoutes, http } from "../services/http";
import { Credentials } from "../types/credentials";

// LOGIN ACTIONS
export const login = (credentials: Credentials) => async (
  dispatch: Dispatch
) => {
  try {
    const { token } = await http.post(apiRoutes.login, credentials);
    http.setAuth(token);
    localStorage.setItem("token", token);
    const user = await http.get(apiRoutes.me);

    return dispatch({ type: DASHBOARD_LOGIN, payload: user });
  } catch (error) {}
};

export const logout = () => async (dispatch: Dispatch) => {
  try {
    http.setAuth("");
    localStorage.removeItem("token");
    return dispatch({ type: DASHBOARD_LOGOUT });
  } catch (error) {}
};

// PLACE ACTIONS
export const fetchPlace = () => async (dispatch: Dispatch) => {
  try {
    const place = await http.get(apiRoutes.owner_data);

    return dispatch({ type: FETCH_PLACE, payload: place });
  } catch (error) {}
};

// TYPES ACTIONS
export const fetchTypes = () => async (dispatch: Dispatch) => {
  try {
    const types = await http.get(apiRoutes.types_data);

    return dispatch({ type: FETCH_TYPES, payload: types });
  } catch (error) {}
};

// PRODUCT ACTIONS
export const fetchProducts = () => async (dispatch: Dispatch) => {
  try {
    const products = await http.get(apiRoutes.products_data);

    return dispatch({ type: FETCH_PRODUCTS, payload: products });
  } catch (error) {}
};

export const fetchProduct = (id: number) => async (dispatch: Dispatch) => {
  try {
    const product = await http.get(`${apiRoutes.products_data}${id}/`);

    return dispatch({ type: FETCH_PRODUCT, payload: product });
  } catch (error) {}
};

export const createProduct = (product: Product, place_id: number) => async (
  dispatch: Dispatch
) => {
  try {
    const result = await http.post(apiRoutes.products_data, {
      ...product,
      place: place_id,
    });

    return dispatch({ type: CREATE_PRODUCT, payload: result });
  } catch (error) {}
};

export const updateProduct = (id: number, product: Product) => async (
  dispatch: Dispatch
) => {
  try {
    const result = await http.patch(
      `${apiRoutes.products_data}${id}/`,
      product
    );

    return dispatch({ type: UPDATE_PRODUCT, payload: result });
  } catch (error) {}
};

export const deleteProduct = (id: number) => async (dispatch: Dispatch) => {
  try {
    await http.delete(`${apiRoutes.products_data}${id}/`);

    return dispatch({ type: DELETE_PRODUCT, payload: id });
  } catch (error) {}
};

// ORDER ACTIONS
export const fetchOrders = (page?: number) => async (dispatch: Dispatch) => {
  try {
    const orders = await http.get(`${apiRoutes.orders}?page=${page ?? 1}`);

    return dispatch({ type: FETCH_ORDERS, payload: orders });
  } catch (error) {}
};

export const updateOrder = (id: number, change: Record<string, any>) => async (
  dispatch: Dispatch
) => {
  try {
    const order = await http.patch(`${apiRoutes.orders}${id}/`, change);

    return dispatch({ type: UPDATE_ORDER, payload: order });
  } catch (error) {}
};

// EMPLOYEE ACTIONS
export const fetchEmployees = () => async (dispatch: Dispatch) => {
  try {
    const employees = await http.get(apiRoutes.employee_data);

    return dispatch({ type: FETCH_EMPLOYEES, payload: employees });
  } catch (error) {}
};

export const createEmployee = (employee: Record<string, any>) => async (
  dispatch: Dispatch
) => {
  try {
    const result = await http.post(apiRoutes.employee_data, employee);

    return dispatch({ type: CREATE_EMPLOYEE, payload: result });
  } catch (error) {}
};

export const updateEmployee = (
  id: number,
  employee: Record<string, any>
) => async (dispatch: Dispatch) => {
  try {
    const result = await http.patch(
      `${apiRoutes.employee_data}${id}/`,
      employee
    );

    return dispatch({ type: UPDATE_EMPLOYEE, payload: result });
  } catch (error) {}
};

export const deleteEmployee = (id: number) => async (dispatch: Dispatch) => {
  try {
    await http.delete(`${apiRoutes.employee_data}${id}/`);

    return dispatch({ type: DELETE_EMPLOYEE, payload: id });
  } catch (error) {}
};

// TABLE ACTIONS
export const fetchTables = () => async (dispatch: Dispatch) => {
  try {
    const tables = await http.get(apiRoutes.tables_data);

    return dispatch({ type: FETCH_TABLES, payload: tables });
  } catch (error) {}
};

export const createTable = (table: Record<string, any>) => async (
  dispatch: Dispatch
) => {
  try {
    const result = await http.post(apiRoutes.tables_data, table);

    return dispatch({ type: CREATE_TABLE, payload: result });
  } catch (error) {}
};

export const updateTable = (id: number, table: Record<string, any>) => async (
  dispatch: Dispatch
) => {
  try {
    const result = await http.patch(`${apiRoutes.tables_data}${id}/`, table);

    return dispatch({ type: UPDATE_TABLE, payload: result });
  } catch (error) {}
};

export const deleteTable = (id: number) => async (dispatch: Dispatch) => {
  try {
    await http.delete(`${apiRoutes.tables_data}${id}/`);

    return dispatch({ type: DELETE_TABLE, payload: id });
  } catch (error) {}
};
