import { post } from "../utils/requestAPI";



export const login=async(data)=>{
    const res=await post("auth/login",data);
    return res;
}

export const resfreshTokenService=async(token)=>{
    const res=await post("auth/resfresh-token",token);
    return res;
}

export const register=async(data)=>{
    const res=await post("auth/register",data);
    return res;
}

export const logoutServices=async(token)=>{
    const res=await post("auth/logout",token);
    return res;
}
