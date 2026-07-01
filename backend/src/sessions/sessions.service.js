import { createNewSessions,fetchFilePath } from "./sessions.model.js"
import { generateQuestions } from "../ai/ai.service.js"
export const newSessions = async (docid,userid) => {
    try{
        //call model db thats saves documentid and userid and returns session id//
        const session= await createNewSessions(docid,userid)
        console.log(session)
        //session contains session id//
        if(!session){
            throw new Error("No session id found")
        }
        //get file path to send to ai folder//
        const pdf_path = await fetchFilePath(docid)
        if(!pdf_path){   
            throw new Error("Make sure you have uploaded the PDF")
        }
        console.log(pdf_path)
        const sessionId= session.id 
        const file_path= pdf_path.file_path
        //send req to the ai folder which is the bridge between the express and rag-python//
        const questions= await generateQuestions(sessionId, file_path)
        console.log(questions)
        return {id:session.id}
    }
    catch(error){
        console.error(
            "session service error", error)
    }
}

