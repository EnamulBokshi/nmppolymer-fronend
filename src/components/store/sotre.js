import { configureStore } from "@reduxjs/toolkit";
import { notificationSlicer } from "..";
import { categorySlicer } from "..";
import { productSlicer } from "..";
import authSlicer from './auth'

const store = configureStore({
    reducer: {
        notification: notificationSlicer,
        categories: categorySlicer,
        products: productSlicer,
        auth: authSlicer,
    }   
});

export default store;