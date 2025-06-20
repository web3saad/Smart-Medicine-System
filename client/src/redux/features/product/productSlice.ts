import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface Iproduct {
  status: boolean;
  priceRange: number;
  statusCode: number | null | string;
}

const initialState: Iproduct = {
  status: false,
  priceRange: 100,
  statusCode: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

export const { toggleState, setPriceRange } = productSlice.actions;

export default productSlice.reducer;
