import api from "../api";
import { ACCESS_TOKEN } from "../constant";

export const getContacts = async () =>{
    const response  = await api.get('/api/contacts/',{
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    })
    return response.data;
}

export const postContact = async (contact) =>{
    const response = await api.post('/api/contacts/create/',contact)
    return response.data;
}

export const deleteContact = async (id) =>{
    const response = await api.delete(`/api/contacts/delete/${id}/`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
        }
    })
    return response.data;
}

export const updateContact = async (id,contact) =>{
    const response = await api.put(`/api/contacts/update/${id}/`,contact,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
        }
    })
    return response.data;
}
