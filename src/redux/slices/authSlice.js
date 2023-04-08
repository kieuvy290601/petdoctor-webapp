import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRole: null,
  isLoggedIn: false,
  email: null,
  userName: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserActive(state, action) {
      console.log(action.payload);
      const { email, userName, userId, userRole } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userId = userId;
      state.userRole = userRole;
      console.log(userRole);
    },
    removeUserActive(state, action) {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userId = null;
      state.userRole = null;
    },
  },
});

export const { setUserActive, removeUserActive } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userId;
export const selectUserRole = (state) => state.auth.userRole;
export default authSlice.reducer;
