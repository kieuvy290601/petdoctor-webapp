import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRole: null,
  isLoggedIn: false,
  email: null,
  userName: null,
  userId: null,
  userURL: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserActive(state, action) {
      console.log(action.payload);
      const { email, userName, userId, userURL } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userId = userId;
      state.userURL = userURL;
    },
  },
});

export const { setUserActive } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userId;
export const selectUserRole = (state) => state.auth.userRole;
export const selectUserURL = (state) => state.auth.userURL;
export default authSlice.reducer;
