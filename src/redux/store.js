import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Redux/Slices/AuthSlice";
import CreatShopSlice from "../Redux/Slices/CreatShopSlice";
export default configureStore({
  reducer: {
    auth: authSlice,
    shop: CreatShopSlice,
  },
});
