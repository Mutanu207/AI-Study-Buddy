import { newSessions, displaySessionsService, fetchSessionDetails} from "./sessions.service.js"
export const userSessions= async (req,res) => {
    try{
    const {docId} = req.body
    const userId= req.user.id
    if (!docId) {
        return res.json({message:"Please upload the pdf to start the session"})  
    }
    if(!userId) {
        return res.json({message:"User not verified"})
    }
    //Call the service function, send over the inputs according to the postions in the service funstion to avoid mismatch//
    //we are only seinding session id to frontend via redirect//
    const sessionId = await newSessions(docId,userId)
    console.log(sessionId)
    res.status(200).json({message:"Session has started", sessionId})
    }

    catch(error){
        console.error(error)
        res.status(500).json({ message: error.message });
    }
}

export const displaySessions = async (req,res) => {
    try{
        const userId = req.user.id
        if(!userId) {
            return res.json({message:"User not verified"})
        }
        const sessions = await displaySessionsService(userId)
        res.status(200).json(sessions)
    } catch(error){
        console.error(error)
        res.status(500).json({ message: error.message });
    }}

export const fetchUserSession = async (req,res) => {
    try{
        const userId= req.user.id
        const {sessionId} = req.params;
        if (!userId && !sessionId){
            return res.json({message:"No session"})
        }
        const sessionDetails= await fetchSessionDetails(userId, sessionId)
        res.status(200).json({ message: "Session details retrieved",sessionDetails})
    }
    catch(error){
        console.error(error)
        res.status(500).json({ message: error.message });
    }
}