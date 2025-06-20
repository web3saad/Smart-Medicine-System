
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  status: false,
  priceRange: 400,
  statusCode: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleState: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
  },
});

export const { toggleState, setPriceRange } = userSlice.actions;

export default userSlice.reducer;
