import { Navigate } from "react-router";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constant";
import {jwtDecode} from 'jwt-decode';
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { loginSuccess } from "./store/auth";
import api from "../api";

export default function ProtectedRoutes({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const dispatch = useDispatch();
    const tokenRefresh = async()=>{
        const token = localStorage.getItem(REFRESH_TOKEN);
        if(!token){
            console.log("No token found");
            setIsAuthenticated(false);
            return;
        }
        try{
            const response = await api.post("/api/token/refresh/",{refresh:token});
            if(response.status === 200){

                localStorage.setItem(ACCESS_TOKEN,response.data.access)
                setIsAuthenticated(true);
            }
            else{
                console.log("Invalid Token");
                setIsAuthenticated(false);
            }
        }catch(error){
            console.log(error);
            setIsAuthenticated(false);
        }
    }
    const auth = async()=>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(!token){
            console.log("No token found");
            setIsAuthenticated(false);
            return;
        }
        const decode = jwtDecode(token);
        const tokenExpire = decode.exp;
        const currentTime = Date.now() / 1000;
        if(tokenExpire < currentTime){
            await tokenRefresh();
            console.log("Token Expired");
        }
        else{
            console.log("Token is valid");
            dispatch(loginSuccess(decode.user_id));
            // console.log("Decode",decode.user_id);
            setIsAuthenticated(true);
        }
    }
    // const auth = async()=>{
    // }

    useEffect(()=>{
        console.log("Protected Routes");
        auth();
    },[])
    if(isAuthenticated === null){
        return <div>Loading...</div>
    }
    console.log("Is Authenticated",isAuthenticated);
    return isAuthenticated ? children : <Navigate to='/admin/login' />


}