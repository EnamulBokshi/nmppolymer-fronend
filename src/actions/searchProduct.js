import api from "../api";
import { ACCESS_TOKEN } from "../constant";

export const searchProduct = async (searchArgs)=>{
    if(searchArgs === ''){
        return [];
    }
    const response = await api.get(`/api/products/search/?search=${searchArgs}`)
    return response.data;
}
