import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "./exerciseSlice.js";

export const myStore = configureStore({
    reducer: {
        exerciseReducer,
    },
})