import { get } from "../utils/requestAPI"

export const loginGoogle=async()=>{
    const res=await get("auth/google");
    return res;
}
