export const preValiadtion = async (session_id, document_id, file_path) => {
    if(!session_id){
        throw new Error("No session id provided")
    }
    if(!document_id){
        throw new Error("No document id provided")
    }
    if(!file_path){
        throw new Error("No file path provided")
    }
}
export const postValidation = async (response) => {
    if(!response){
        throw new Error("No data received")
    }
}