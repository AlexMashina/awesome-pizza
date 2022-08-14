import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  listTitles: ["Пицца", "Напитки", "Десерты", "Закуски", "Комбо"],
  menuList: [],
};

export const countIncrease = createAction("COUNT-INCREASE");
export const countDecrease = createAction("COUNT-DECREASE");
export const addToCart = createAction("ADD-TO-CART");
export const resetDisableButton = createAction("RESET-DISABLE");
export const setItems = createAction("SET-ITEMS");

export default createReducer(initialState, {
  [countIncrease]: (state, action) => {
    const id = action.payload;
    state.menuList.forEach((item) => {
      if (item.id === id) {
        item.count++;
      }
    });
  },
  [countDecrease]: (state, action) => {
    const id = action.payload;
    state.menuList.forEach((item) => {
      if (item.id === id) {
        if (item.count > 1) {
          item.count--;
        }
      }
    });
  },
  [addToCart]: (state, action) => {
    const id = action.payload;
    state.menuList.forEach((item) => {
      if (item.id === id) {
        item.isAdded = !item.isAdded;
      }
    });
  },
  [resetDisableButton]: (state) => {
    state.menuList.forEach((item) => {
      item.isAdded = false;
    });
  },
  [setItems]: (state, action) => {
    state.menuList = [...action.payload];
  },
});
