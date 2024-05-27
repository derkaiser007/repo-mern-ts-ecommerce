import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
    },
    middleware: (mid) => mid().concat(userAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>;