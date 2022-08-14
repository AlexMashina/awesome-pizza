import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  cartList: [],
  sum: 0,
};

export const addItem = createAction("ADD-ITEM");
export const removeItem = createAction("REMOVE-ITEM");
export const clearCart = createAction("CLEAR-CART");
export const countMinus = createAction("COUNT-MINUS");
export const countPlus = createAction("COUNT-PLUS");
export const setSum = createAction("SET-SUM");

export default createReducer(initialState, {
  [addItem]: (state, action) => {
    state.cartList = [...state.cartList, action.payload];
  },
  [removeItem]: (state, action) => {
    state.cartList = state.cartList.filter(
      (item, index) => action.payload !== index
    );
  },
  [clearCart]: (state) => {
    state.cartList = [];
  },
  [countPlus]: (state, action) => {
    const index = action.payload;
    state.cartList[index].count = ++state.cartList[index].count;
  },
  [countMinus]: (state, action) => {
    const index = action.payload;
    if (state.cartList[index].count > 1) {
      state.cartList[index].count = --state.cartList[index].count;
    }
  },
  [setSum]: (state) => {
    state.sum = state.cartList.reduce((prev, current) => {
      return prev + current.price * current.count;
    }, 0);
  },
});
