import { createNewSessions,fetchFilePath, fetchSessions, fetchUserDetails, fetchFileName} from "./sessions.model.js"
import { generateQuestions } from "../ai/ai.service.js"
import { saveQuestions } from "../questions/questions.service.js"
import path from "path";
export const newSessions = async (document_id,userid) => {
    try{
        //call model db thats saves documentid and userid and returns session id//
        const session= await createNewSessions(document_id,userid)
        console.log(session)
        //session contains session id//
        if(!session){
            throw new Error("No session id found")
        }
        //get file path to send to ai folder//
        const pdf_path = await fetchFilePath(document_id)
        if(!pdf_path){   
            throw new Error("Make sure you have uploaded the PDF")
        }
        const sessionId= session.id 
        const file_path= pdf_path.file_path
        const absolutePath = path.resolve(file_path);
      
        //send req to the ai folder which is the bridge between the express and rag-python//
        const questions= await generateQuestions(sessionId,absolutePath)
        console.log(questions)
        //after getting questions back send the to the questions folder,for them to be saved
        await saveQuestions(sessionId,questions)
        return {id:sessionId}
    }
    catch(error){
        console.error(error)
        throw new Error(error.message)
    }
}

export const displaySessionsService = async (userId) => {
    try{
        const sessions = await fetchSessions(userId)
        if(!sessions){
            throw new Error("No sessions found")
        }
        console.log(sessions) 
        //return an array of all the user session with the ids,score and timetaken  
        return sessions
    }
    catch(error){
        console.error(error)
        throw new Error(error.message)
    }
}
export const fetchSessionDetails = async (userId,sessionId) => {
    try{
        const userSession= await fetchUserDetails (userId, sessionId)
        if (!userSession){
            throw new Error("No details found")
        }
        const fileName= await fetchFileName(sessionId)
        const payload= {
            fileName,
            userSessionDetails: userSession

        }
        return payload

    }
     catch(error){
        console.error(error)
        throw new Error(error.message)
    }
}
