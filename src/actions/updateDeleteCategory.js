import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { ACCESS_TOKEN } from "../constant";

export const updateCategory = async (id)=>{
    const response = await api.post(`/api/category/update/${id}/`,product,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    })  
    return response.data;
}
export const updateProduct = async ({id,product})=>{
    const response = await api.put(`/api/products/update/${id}/`,product,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    })
    return response.data;
}