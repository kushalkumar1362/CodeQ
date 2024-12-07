import { activeSlice } from "./activeSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";


const appReducer = combineReducers({
  active: activeSlice.reducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default configureStore({
  reducer: rootReducer
});