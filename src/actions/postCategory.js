import api from "../api";
import { ACCESS_TOKEN } from "../constant";

export const postCategory = async(category) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    return await api.post('/api/categories/create/', category, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(({data})=>{
        return data
    })
}
