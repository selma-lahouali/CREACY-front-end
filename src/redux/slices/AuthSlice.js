import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};
// auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { user, token } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    register(state, action) {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
    },
  },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;
