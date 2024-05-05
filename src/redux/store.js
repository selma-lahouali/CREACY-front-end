import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux/slices/AuthSlice";
import CreatShopSlice from "./slices/CreatShopSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    shop: CreatShopSlice,
  },
});