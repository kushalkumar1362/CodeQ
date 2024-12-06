/* eslint-disable no-unused-vars */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import cartReducer from "./Product/cartSlice";
import { logoutSuccess } from "./Auth/authSlice"; 

const appReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logoutSuccess.type) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default configureStore({
  reducer: rootReducer
});
