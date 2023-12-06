import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/authSlice";
import { productSlice } from "./features/product/productSlice";




export const store = configureStore({
    reducer: {
        // Aqui se agregan los reducers.
        auth: authSlice.reducer,
        product: productSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});