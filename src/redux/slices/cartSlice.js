import { createSlice } from "@reduxjs/toolkit";

const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));

const initialState = {
  cartItems: storedCartItems ? storedCartItems : [],
  totalAmount: 0,
  totalQuantity: 0,
  shippingFee: 0,
};

// const initialState = {
//   cartItems: localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//     : [],
//   totalAmount: 0,
//   totalQuantity: 0,
// };

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
      state.totalAmount += state.shippingFee;
      // save cart to LS
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      console.log(state.totalQuantity);
      console.log(state.cartItems);
      console.log(newItem);
      console.log("total", state.totalAmount);
    },
    setShippingFee: (state, action) => {
      state.shippingFee = action.payload;
      state.totalAmount += action.payload; // Cập nhật tổng số tiền khi thay đổi phí ship
    },
    decreaseItemQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.prdId === itemId);
      item.quantity--;
      item.totalPrice = Number(item.totalPrice) - Number(item.prdPrice);
      if (item.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item.prdId !== itemId
        );
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.prdPrice) * Number(item.quantity),
        0
      );
      state.totalQuantity--;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItemFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.prdId === action.payload
      );

      if (itemIndex !== -1) {
        state.totalQuantity -= state.cartItems[itemIndex].quantity;
        state.totalAmount -=
          state.cartItems[itemIndex].prdPrice *
          state.cartItems[itemIndex].quantity;
        state.cartItems.splice(itemIndex, 1);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = initialState.cartItems;
      state.totalAmount = initialState.totalAmount;
      state.totalQuantity = initialState.totalQuantity;
      state.shippingFee = initialState.shippingFee;
      localStorage.removeItem("cartItems");
    },
  },
});

export const cartActions = cartSlice.actions;
export const { addItemtoCart, decreaseItemQuantity, removeItemFromCart, clearCart } =
  cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export default cartSlice.reducer;
