import api from "../api";


export const getUsers = ()=>{
    return new Promise((resolve,reject)=>{
        api.get('/api/users/')
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