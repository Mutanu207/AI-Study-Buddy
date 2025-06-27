import { preValiadtion,postValidation } from "./ai.validation.js"
import { sendToFastApi } from "./ai.client.js"
//function called by session service,this function returns the question which are received in service session folder//
export const generateQuestions= async(session_id,document_id,file_path) => {
    preValiadtion(session_id,document_id,file_path)
    //send data to this function in ai client.js, this file is the one that calls the pyhton rag server and send over the details//
    const response= await sendToFastApi(session_id,document_id,file_path)
    postValidation(response)
    return response
}