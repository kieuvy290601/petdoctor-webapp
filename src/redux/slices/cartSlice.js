import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemtoCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.prdId === newItem.prdId
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          prdId: newItem.prdId,
          prdName: newItem.prdName,
          prdURL: newItem.prdURL,
          prdPrice: newItem.prdPrice,
          quantity: 1,
          totalPrice: newItem.prdPrice,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.prdPrice);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.prdPrice) * Number(item.quantity),
        0
      );
      console.log(state.totalQuantity);
      console.log(state.cartItems);
      console.log(newItem);
      console.log("total", state.totalAmount);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
