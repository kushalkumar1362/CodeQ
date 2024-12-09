import {
  activeSlice,
  chatsSlice,
  channelsSlice
} from "./";

import { combineReducers, configureStore } from "@reduxjs/toolkit";


const appReducer = combineReducers({
  active: activeSlice.reducer,
  chats: chatsSlice.reducer,
  channels: channelsSlice.reducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default configureStore({
  reducer: rootReducer
});