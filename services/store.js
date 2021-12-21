import { configureStore } from "@reduxjs/toolkit";
import reduxReducer from "./Redux";
export const store = configureStore({
    reducer: {
        redux: reduxReducer,
    }
})