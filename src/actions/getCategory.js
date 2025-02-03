import api from "../api";


export const getCategory =  ()=> {
    return new Promise((resolve,reject)=>{
        api.get('/api/categories/')
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