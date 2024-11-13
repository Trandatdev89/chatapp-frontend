import { jwtDecode } from "jwt-decode";

export const isValidToken=()=>{
    const token=localStorage.getItem("token");
    if(!token){
        return false;
    }
    const tokenDecode=jwtDecode(token);
    const expiryTimeSeconds = tokenDecode.exp;
    const currentTimeSeconds = Math.floor(new Date().getTime() / 1000);

    if (currentTimeSeconds > expiryTimeSeconds) {
        localStorage.removeItem("token");
        return false;
    } 
    return true;
}