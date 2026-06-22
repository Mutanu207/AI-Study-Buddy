import {createDocument} from "./documents.model.js"
export const uploadDocument = async (userid,filename,filepath)=> {
    try{
    if (!userid) throw new Error("No user id")
    if (!filename) throw new Error("No file name")
    if(!filepath) throw new Error("No file path")
    const userDetail= await createDocument(userid,filename,filepath)
    return {id:userDetail.id} }
    catch(error){
        throw new Error(error)

    }

}