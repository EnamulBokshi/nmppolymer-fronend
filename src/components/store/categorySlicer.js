import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        fetchCategoriesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCategoriesSuccess(state, action) {
            state.loading = false;
            state.categories = action.payload;
        },
        fetchCategoriesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addCategory(state, action) {
            state.categories.push(action.payload);
        },
        removeCategory(state, action) {
            state.categories = state.categories.filter(category => category.id !== action.payload);
        },
        updateCategory(state, action) {
            const index = state.categories.findIndex(category => category.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },
    },
});

export const {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    addCategory,
    removeCategory,
    updateCategory,
} = categorySlice.actions;

export default categorySlice.reducer;