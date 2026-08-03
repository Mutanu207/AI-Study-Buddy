import { preDocumentValiadtion,postQuestionValidation, preAnswersValidation, postFeedbackValidation } from "./ai.validation.js"
import { sendDocumentToFastApi,sendAnswersToFastApi } from "./ai.client.js"
//function called by session service,this function returns the question which are received in service session folder//
export const generateQuestions= async(session_id,file_path) => {
    try{
        preDocumentValiadtion(session_id,file_path)
    //send data to this function in ai client.js, this file is the one that calls the pyhton rag server and send over the details//
    const response= await sendDocumentToFastApi(session_id,file_path)
    postQuestionValidation(response)
    return response
}
catch(error){
    console.error("Error generating questions:", error);
    throw error;
}}
export const evaluateAnswers= async(payload) => {
    try{
        preAnswersValidation(payload)
        const response= await sendAnswersToFastApi(payload)
        postFeedbackValidation(response)
        return response
    } catch(error){
        console.error("Error evaluating answers:", error);
        throw error;
    }
}