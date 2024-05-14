import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Redux/Slices/AuthSlice";
export const Store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
