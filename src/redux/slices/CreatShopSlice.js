import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShopCreated: false,
  shop: null,
};

const CreatShopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    shopCreation(state, action) {
      console.log("test", action.payload);
      state.isShopCreated = true;
      state.shop = action.payload;
    },
  },
});

export const { shopCreation } = CreatShopSlice.actions;

export default CreatShopSlice.reducer;
