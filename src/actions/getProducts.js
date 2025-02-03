import api from "../api"

export const getProducts =  ()=> {
    return new Promise((resolve,reject) => {
        api.get('/api/products/')
        .then(({data}) =>{
            setTimeout(()=>{
                resolve(data)
            },1000)
        })
        .catch((error) =>{
            reject(error)
        })
    })
}
export const getProduct = (id)=>{
    return new Promise ((resolve,reject)=>{
        api.get(`/api/product/${id}/`)
        .then(({data})=>{
            setTimeout(()=>{
                resolve(data)
            },1000)
        })
        .catch((error)=>{
            reject(error)
        })
    })
}