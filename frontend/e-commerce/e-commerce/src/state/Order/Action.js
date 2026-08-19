import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_REQUEST,
  GET_ALL_ORDERS_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  SAVE_ADDRESS,
} from "./ActionType";

import { api } from "../../config/apiConfig";

// ======================================================
// SAVE ADDRESS
// ======================================================

export const saveAddress = (address) => ({
  type: SAVE_ADDRESS,
  payload: address,
});


// ======================================================
// SAVE USER ADDRESS
// ======================================================

export const saveUserAddress = (address) => async (dispatch) => {

  const token = localStorage.getItem("jwt");

  try {

    const { data } = await api.post(
      "/api/users/address",
      address,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: SAVE_ADDRESS,
      payload: data,
    });

    console.log("Address saved:", data);

  } catch (error) {

    console.error(
      "Error saving address:",
      error.response?.data || error.message
    );
  }
};


// ======================================================
// CREATE ORDER
// ======================================================

export const createOrder = (reqData) => async (dispatch) => {

  dispatch({
    type: CREATE_ORDER_REQUEST,
  });

  const token = localStorage.getItem("jwt");

  try {

    console.log(
      "ADDRESS SENT TO CREATE ORDER:",
      reqData.address
    );

    const { data } = await api.post(
      "/api/orders/",
      reqData.address,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "ORDER CREATED:",
      data
    );

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });

    if (data?.id) {

      reqData.navigate(
        `/checkout?step=3&order_id=${data.id}`
      );

    }

  } catch (error) {

    console.error(
      "CREATE ORDER ERROR:",
      error.response?.data ||
      error.message
    );

    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message,
    });
  }
};


// ======================================================
// GET ORDER BY ID
// ======================================================

export const getOrderById = (orderId) => async (dispatch) => {

  console.log(
    "order id in getOrder:",
    orderId
  );

  dispatch({
    type: GET_ORDER_BY_ID_REQUEST,
  });

  const token = localStorage.getItem("jwt");

  try {

    const { data } = await api.get(
      `/api/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "order by id:",
      data
    );

    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });

  } catch (error) {

    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload:
        error.response?.data?.message ||
        error.message,
    });
  }
};


// ======================================================
// GET ALL ORDERS FOR USER
// ======================================================

export const getAllOrdersForUser =
  (status = "") =>
  async (dispatch) => {

    dispatch({
      type: GET_ALL_ORDERS_REQUEST,
    });

    const token =
      localStorage.getItem("jwt");

    try {

      let url = "/api/orders/user";

      // ================================================
      // STATUS FILTER
      // ================================================

      if (
        status &&
        status.trim() !== ""
      ) {

        url +=
          `?status=${encodeURIComponent(
            status.toUpperCase()
          )}`;

      }

      console.log(
        "GET USER ORDERS URL:",
        url
      );

      const { data } = await api.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "USER ORDERS:",
        data
      );

      dispatch({
        type: GET_ALL_ORDERS_SUCCESS,
        payload: data,
      });

    } catch (error) {

      console.error(
        "GET USER ORDERS ERROR:",
        error.response?.data ||
        error.message
      );

      dispatch({
        type: GET_ALL_ORDERS_FAILURE,
        payload:
          error.response?.data?.message ||
          error.message,
      });
    }
  };