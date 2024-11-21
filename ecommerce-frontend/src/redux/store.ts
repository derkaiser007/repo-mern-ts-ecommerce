import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { productAPI } from "./api/productAPI";
import { orderAPI } from "./api/orderAPI";
import { userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [orderAPI.reducerPath]: orderAPI.reducer,
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
    },
    middleware: (mid) => mid().concat(
        userAPI.middleware,
        productAPI.middleware,
        orderAPI.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>;

// RTK Query's middleware is essential for enabling features such as:
// 1) Automated Cache Management: RTK Query keeps a cache of fetched data to avoid unnecessary network requests. It 
// ensures data is shared across components without duplicating API calls.
// 2) Background Refetching: Automatically refetches data when certain triggers occur (e.g., when a component using 
// cached data re-mounts).
