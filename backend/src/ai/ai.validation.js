export const preValiadtion = async (id, file_path) => {
    if(!id){
        throw new Error("No sessionid provided")
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