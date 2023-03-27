// import { createSlice } from "@reduxjs/toolkit";

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     userRole: null,
//     isAuthenticated: false,
//   },
//   reducers: {
//     setUserRole: (state, action) => {
//       state.userRole = action.payload;
//     },
//     setIsAuthenticated: (state, action) => {
//       state.isAuthenticated = action.payload;
//     },
//   },
// });

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRole: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserRole(state, action) {
      console.log(action);
      // state.userRole = action.payload;
      state.userRole = "vy";
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUserRole, setIsAuthenticated } = authSlice.actions;

export default authSlice.reducer;
