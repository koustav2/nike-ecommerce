import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer, // Use cartReducer instead of cartSlice
    }
});

export default store;