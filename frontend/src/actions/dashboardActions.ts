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
} from "../reducers/dashboardReducer";
import { apiRoutes, http } from "../services/http";
import { Credentials } from "../types/credentials";

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

export const fetchPlace = () => async (dispatch: Dispatch) => {
  try {
    const place = await http.get(apiRoutes.owner_data);

    return dispatch({ type: FETCH_PLACE, payload: place });
  } catch (error) {}
};

export const fetchTypes = () => async (dispatch: Dispatch) => {
  try {
    const types = await http.get(apiRoutes.types_data);

    return dispatch({ type: FETCH_TYPES, payload: types });
  } catch (error) {}
};

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

export const createProduct = (product: Product) => async (
  dispatch: Dispatch
) => {
  try {
    const result = await http.post(apiRoutes.products_data, product);

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

export const fetchOrders = () => async (dispatch: Dispatch) => {
  try {
    const orders = await http.get(apiRoutes.orders);

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
