import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Redux/Slices/AuthSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
