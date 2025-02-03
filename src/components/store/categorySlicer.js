import { createSlice, nanoid } from "@reduxjs/toolkit";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";

const data = async ()=>{
  const res = api.get("/api/categories/")
  if(res.status === 200){
    return res.data
    console.log(res.data)
  }

}
const initialState = {
  categories: data,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
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
      state.categories = [
        ...state.categories,
        { id: nanoid(), ...action.payload },
      ];
    },
    removeCategory(state, action) {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    updateCategory(state, action) {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
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
  setCategories,
} = categorySlice.actions;

export default categorySlice.reducer;
