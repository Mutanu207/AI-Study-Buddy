import { newSessions } from "./sessions.service.js"
export const userSessions= async (req,res) => {
    try{
    const {docId} = req.body
    const userId= req.user.id
    if (!docId) {
        res.json({message:"Please upload the pdf to start the session"})  
    }
    if(!userId) {
        res.json({message:"User not verified"})
    }
    //Call the service function, send over the inputs according to the postions in the service funstion to avoid mismatch//
    //we are only seinding session id to frontend via redirect//
    const sessionId = await newSessions(docId,userId)
    console.log(sessionId)
    res.json({message:"Session has started", sessionId})}

    catch(error){
        console.error(error)
        res.status(500).json({ message: error.message });
    }
}