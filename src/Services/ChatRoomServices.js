import { getAttachToken, postAttachToken, postFormDataAttachToken } from "../utils/requestAPIToken"

export const getChatRoomByUser=async(id,token)=>{
    const res=await getAttachToken(`api/chatroom/${id}`,token);
    return res;
}

export const getChatRoomAll=async(token)=>{
    const res=await getAttachToken(`api/chatroom`,token);
    return res;
}

export const getChatRoomById=async(id,token)=>{
    const res=await getAttachToken(`api/chatroom/${id}`,token);
    return res;
}

export const createChatRoom=async(data,token)=>{
    const res=await postFormDataAttachToken(`api/chatroom`,data,token);
    return res;
}

export const addUserToGroup=async(data,token)=>{
    const res=await postAttachToken(`api/chatroom/user`,data,token);
    return res;
}

export const blockUser=async(data,token)=>{
    const res=await postAttachToken(`api/chatroom/block`,data,token);
    return res;
}



