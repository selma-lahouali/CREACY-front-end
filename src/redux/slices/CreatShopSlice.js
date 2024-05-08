import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShopCreated: false,
  shop: null,
};

const CreatShopSlice = createSlice({
  name: "shops",
  initialState,
  reducers: {
    shopCreation(state, action) {
      state.isShopCreated = true;
      state.shop = action.payload;
    },
  },
});

export const { shopCreation } = CreatShopSlice.actions;

export default CreatShopSlice.reducer;
