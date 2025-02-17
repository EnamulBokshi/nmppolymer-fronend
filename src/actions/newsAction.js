// Date: 03/18/2021
import api from "../api";
import { ACCESS_TOKEN } from "../constant";

export const getNews = async ()=>{
    const res = await api.get('/api/news/');
    return res.data;
}

export const getNewsDetails = async (id)=>{
    const res = await api.get(`/api/news/${id}/`);
    return res.data;
}

export const createNews = async (data)=>{
    const res = await api.post('/api/news/create/',data,{
        headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.data;
}

export const deleteNews = async (id)=>{
    const res = await api.delete(`/api/news/delete/${id}/`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.data;
}

export const updateNews = async ({id,data})=>{
    const res = await api.put(`/api/news/update/${id}/`,data,{
        headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    });
    return res.data;
}

