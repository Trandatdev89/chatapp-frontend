import { getAttachToken, postAttachToken } from "../utils/requestAPIToken"

export const getMessageBySenderAndRecieved=async(content,token)=>{
    const res=await postAttachToken("api/message",content,token);
    return res;
}