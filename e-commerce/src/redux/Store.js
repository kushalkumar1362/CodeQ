/* eslint-disable no-unused-vars */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import authReducer from "./Auth/authSlice";
import cartReducer from "./Product/cartSlice";
import { logoutSuccess } from "./Auth/authSlice"; 

const logger = createLogger();

const appReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

// Root reducer to reset the state
const rootReducer = (state, action) => {
  if (action.type === logoutSuccess.type) {
    // Reset the state to initial values
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
