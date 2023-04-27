import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";
import checkoutSlice from "./slices/checkoutSlice";

const rootReducer = combineReducers(
  {
    auth: authSlice,
    cart: cartSlice,
    product: productSlice,
    checkout: checkoutSlice,
  }
);

const store = configureStore({
  reducer: rootReducer
  },
);

export default store;
