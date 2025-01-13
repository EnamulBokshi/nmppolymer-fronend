import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    catalogues: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action) {
            state.loading = false;
            state.products = action.payload;
        },
        fetchProductsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addProduct(state, action) {
            state.products.push(action.payload);
        },
        removeProduct(state, action) {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        updateProduct(state, action) {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },

        fetchCataloguesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCataloguesSuccess(state,action) {
            state.loading = false;
            state.catalogues = action.payload;
        },
        fetchCataloguesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addCatalogue(state, action) {
            state.catalogues = [action.payload, ...state.catalogues];
        },


    },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, addProduct, removeProduct, updateProduct } = productSlice.actions;   

export default productSlice.reducer;