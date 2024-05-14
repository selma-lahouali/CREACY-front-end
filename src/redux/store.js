import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Redux/Slices/AuthSlice";
import CreatShopSlice from "../Redux/Slices/CreatShopSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    shop: CreatShopSlice,
  },
});
