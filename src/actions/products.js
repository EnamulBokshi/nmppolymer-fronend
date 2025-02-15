import api from "../api";
import { ACCESS_TOKEN } from "../constant";

export const deleteProduct = async (id)=>{
    const response = await api.delete(`/api/products/delete/${id}/`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    })
    return response;
}