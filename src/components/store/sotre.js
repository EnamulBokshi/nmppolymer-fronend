import { configureStore } from "@reduxjs/toolkit";
import { notificationSlicer, Products } from "..";
import { categorySlicer } from "..";
import { productSlicer } from "..";
const store = configureStore({
    reducer: {
        notification: notificationSlicer,
        category: categorySlicer,
        products: productSlicer,
    }   
});

export default store;