import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";

import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/product/productSlice";
import userReducer from "./features/user/userSlice";
import WishListReducer from "./features/wishList/wishListSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    product: productReducer,
    wishlist: WishListReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
