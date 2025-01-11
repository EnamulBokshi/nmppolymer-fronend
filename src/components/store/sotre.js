import { configureStore } from "@reduxjs/toolkit";
import { notificationSlicer } from "..";
import { categorySlicer } from "..";
import { productSlicer } from "..";
const store = configureStore({
    reducer: {
        notification: notificationSlicer,
        category: categorySlicer,
    }   
});

export default store;