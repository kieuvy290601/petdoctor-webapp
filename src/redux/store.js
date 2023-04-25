import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";

const rootReducer = combineReducers(
  {
    auth: authSlice,
    cart: cartSlice,
    product: productSlice,
  }
);

const store = configureStore({
  reducer: rootReducer
  },
);

export default store;
