import api from "../api";
import { ACCESS_TOKEN } from "../constant";
export const postProducts = async (product)=>{

    const response = await api.post('/api/products-create/',product,{
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    })
    return response.data;
    // return new Promise((resolve,reject)=>{
    //     api.post('/api/products-create/',product,{
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    //         }
    //     })
    //     .then(({data})=>{
    //         setTimeout(()=>{
    //             resolve(data)
    //         },1000)
    //     })
    //     .catch((error)=>{
    //         reject(error)
    //     })
    // })
}