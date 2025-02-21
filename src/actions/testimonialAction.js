import api from "../api";
import { ACCESS_TOKEN } from "../constant";

export const getTestimonials = () => async ()=>{
    const response = await api.get('/testimonials/');
    return response.data;
}

export const createTestimonial = (data) =>{
    const token = localStorage.getItem(ACCESS_TOKEN)
    return api.post('/testimonials/create/',data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateTestimonial = ({id,data}) =>{
    const token = localStorage.getItem(ACCESS_TOKEN);
    return api.put(`/testimonials/update/${id}/`,data,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteTestimonial = (id)=>{
    const token = localStorage.getItem(ACCESS_TOKEN);
    return api.delete(`/testimonials/delete/${id}/`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}