import { createSlice,nanoid } from "@reduxjs/toolkit";

const fetchProducts = async () => {
    const response = await fetch('/api/products/')
    if (!response.ok) {
        throw new Error('An error occurred while fetching the products');
    }
    return response.json();
}

const initialState = {
    // products: [
    //     {
    //         id: nanoid(),
    //         name: "Electric Pipe",
    //         description: "product description",
    //         price: 200,
    //         image:
    //           "https://images.pexels.com/photos/357440/pexels-photo-357440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         image2:"https://images.pexels.com/photos/357440/pexels-photo-357440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         imgae3:"https://images.pexels.com/photos/357440/pexels-photo-357440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         image4:"https://images.pexels.com/photos/357440/pexels-photo-357440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         category: ["Pipe", "Electric"],
    //     }, 
    //     {
    //         id:2,
    //         name: "White black pipe"   ,
    //         description: "The pipe is good for water supply ",
    //         image: "https://images.pexels.com/photos/1029635/pexels-photo-1029635.jpeg?auto=compress&cs=tinysrgb&w=600",
    //         image2:"https://images.pexels.com/photos/2837863/pexels-photo-2837863.jpeg?auto=compress&cs=tinysrgb&w=600",
    //         image3:"https://images.pexels.com/photos/4017967/pexels-photo-4017967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //         image4:"https://images.pexels.com/photos/357440/pexels-photo-357440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        
    //         price: 100,
    //         category: ['white', 'black'],
        
    //     }
    // ],
    products: fetchProducts() ?? [],
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
        findProduct(state, action) {    
            return state.products.find(product => product.id === action.payload);
        },
        // relatedProducts(state, action) {
        //     return state.products.filter(product => product.category.includes(action.payload));
        // },
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

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, findProduct,addProduct, removeProduct, updateProduct,relatedProducts } = productSlice.actions;   

export default productSlice.reducer;