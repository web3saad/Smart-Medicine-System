
import { createSlice } from "@reduxjs/toolkit";


const storedwish = localStorage.getItem("wishlist");
const initialwishState =

storedwish ? JSON.parse(storedwish) : { wishList: [] };



const wishSlice = createSlice({
  name: "wishlist",
  initialState: initialwishState,
  reducers: {
    addTowish: (state, action ) => {
      state.wishList.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("wishlist", JSON.stringify(state));
    },

    removeFromwish: (state, action) => {
      state.wishList = state.wishList.filter((wishList) => wishList.id !== action.payload.id);

      localStorage.setItem("wishlist", JSON.stringify(state));
    },

    markAsFinished: (state, action) => {
      const updatedwishList = {
        ...action.payload,
        finishedReading: true,
      };

      state.wishList = state.wishList.map((wishList) =>
        wishList.id === updatedwishList.id ? updatedwishList : wishList
      );

      localStorage.setItem("wishlist", JSON.stringify(state.wishList));
    },
    markAsUnfinished: (state, action) => {
      const updatedwishList = {
        ...action.payload,
        finishedReading: false,
      };

      state.wishList = state.wishList.map((wishList) =>
        wishList.id === updatedwishList.id ? updatedwishList : wishList
      );

      localStorage.setItem("wishlist", JSON.stringify(state.wishList));
    },
  },
});

export const { addTowish, markAsUnfinished, markAsFinished, removeFromwish } =
  wishSlice.actions;

export default wishSlice.reducer;
