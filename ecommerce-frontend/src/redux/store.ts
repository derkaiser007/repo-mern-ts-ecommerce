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

// export const server = import.meta.env.VITE_SERVER;
// 1) import.meta.env: import.meta is a special object available in ESM (ECMAScript Modules). In Vite, 
// import.meta.env provides access to environment variables defined in the project.
// 2) VITE_SERVER: VITE_SERVER is an environment variable, typically defined in a .env file at the root of the 
// project. Vite requires all environment variables to be prefixed with VITE_ for them to be exposed to the 
// frontend. This ensures that sensitive variables are not inadvertently exposed.
// 3) export const server: This exports the variable server, making it available for use in other parts of the 
// application.

// RTK Query's middleware is essential for enabling features such as:
// 1) Automated Cache Management: RTK Query keeps a cache of fetched data to avoid unnecessary network requests. It 
// ensures data is shared across components without duplicating API calls.
// 2) Background Refetching: Automatically refetches data when certain triggers occur (e.g., when a component using 
// cached data re-mounts).

// export type RootState = ReturnType<typeof store.getState>;
// 1) store.getState: getState is a method provided by the Redux store. It returns the current state of the Redux 
// store.
// 2) typeof store.getState: typeof is a TypeScript operator that captures the type of the getState method.
// 3) ReturnType<typeof store.getState>: ReturnType is a TypeScript utility type that extracts the return type of a 
// function. In this case, it extracts the type of the value returned by store.getState, which is the shape of the 
// entire Redux store's state.
// 4) export type RootState: By assigning the extracted return type to RootState, you now have a reusable type that 
// represents the structure of your application's global state.
