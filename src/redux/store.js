import { combineReducers, configureStore } from "@reduxjs/toolkit";

//Reducers
import cartReducer from "./cartReducer";
import mainReducer from "./mainReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  main: mainReducer,
  cart: cartReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
