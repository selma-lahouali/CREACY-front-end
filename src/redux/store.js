import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/slices/AuthSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});