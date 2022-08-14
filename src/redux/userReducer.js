import { createAction, createReducer, isRejected } from "@reduxjs/toolkit";

const userJSON = window.localStorage.getItem("user");
/* const user = JSON.parse(userJSON); */

const initialState = {
  id: "",
  name: "",
  email: "",
  token: "",
  phone: "",
  isRole: "",
  orders: [],
};

console.log(initialState);

export const setUser = createAction("SET-USER");
export const removeUser = createAction("REMOVE-USER");
export const setOrder = createAction("SET-ORDER");

export default createReducer(initialState, {
  [setUser]: (state, action) => {
    state.id = action.payload.id;
    state.name = action.payload.name;
    state.email = action.payload.email;
    state.phone = action.payload.phone;
    state.password = action.payload.password;
    state.token = action.payload.token;
    state.isRole = action.payload.isRole;
  },
  [removeUser]: (state) => {
    state.id = null;
    state.name = null;
    state.email = null;
    state.phone = null;
    state.password = null;
    state.token = null;
    state.isRole = "";
  },
  [setOrder]: (state, action) => {
    state.orders.push(action.payload);
  },
});
