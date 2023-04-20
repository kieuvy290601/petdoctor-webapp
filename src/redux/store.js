import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

import cartSlice from "./slices/cartSlice";

const rootReducer = combineReducers(
  {
    auth: authSlice,
    cart: cartSlice,
  }
);

const store = configureStore({
  reducer: rootReducer
  },
);

export default store;
