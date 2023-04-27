import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";
import checkoutSlice from "./slices/checkoutSlice";
import orderSlice from "./slices/orderSlice";

const rootReducer = combineReducers(
  {
    auth: authSlice,
    cart: cartSlice,
    product: productSlice,
    checkout: checkoutSlice,
    orders: orderSlice
  }
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
