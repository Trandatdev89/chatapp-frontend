import { DeleteAttachToken, getAttachToken, patchAttachToken, postAttachToken, putFormDataAttachToken } from "../utils/requestAPIToken";

export const getMyInfo=async(token)=>{
    const res=await getAttachToken(`api/user/my-info`,token);
    return res;
}

export const getUserById=async(id,token)=>{
    const res=await getAttachToken(`api/user/${id}`,token);
    return res;
}


export const updateUser=async(id,data,token)=>{
    const res=await putFormDataAttachToken("api/user",id,data,token);
    return res;
}

export const deleteUser=async(id,token)=>{
    const res=await DeleteAttachToken("api/user",id,token);
    return res;
}


export const getAllUsers=async(token)=>{
    const res=await getAttachToken(`api/user`,token);
    return res;
}

export const searchUserOrGroup=async(data,token)=>{
    const res=await postAttachToken(`api/user/search`,data,token);
    return res;
}

export const getUserByChatRoomId=async(id,token)=>{
    const res=await getAttachToken(`api/user/chatroom/${id}`,token);
    return res;
}


export const leaveRoom=async(data,token)=>{
    const res=await postAttachToken(`api/user/leave`,data,token);
    return res;
}