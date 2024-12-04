import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      // console.log(action.payload);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    remove: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

  },
});

export const { add, remove } = CartSlice.actions;
export default CartSlice.reducer;

