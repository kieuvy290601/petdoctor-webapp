import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: [],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload
      console.log(action.payload);
    },
  },
});

export const { saveShippingAddress } = checkoutSlice.actions;

export const selectShippingAddress = (state) => state.checkout.shippingAddress;

export default checkoutSlice.reducer;
