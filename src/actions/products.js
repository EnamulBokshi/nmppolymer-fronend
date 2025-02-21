import api from "../api";
import { ACCESS_TOKEN } from "../constant";

export const updateProduct = async ({id,product})=>{
    const response = await api.put(`/api/products/update/${id}/`,product,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    })
    return response.data;
}

export const deleteProduct = async (id)=>{
    const response = await api.delete(`/api/products/delete/${id}/`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    })
    return response;
}