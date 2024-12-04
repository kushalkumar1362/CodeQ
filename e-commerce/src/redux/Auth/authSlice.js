import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    name: '',
    email: '',
    isLoggedIn: false,
    role:''
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email
      state.userId = action.payload.userId
      state.role = action.payload.role
    },
    logoutSuccess: (state, action) => {
      state.isLoggedIn = false;
      state.name = '';
      state.email = '';
      state.userId = '';
      state.role = '';
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
