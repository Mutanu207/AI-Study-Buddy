
export const userSessions= async (req,res) => {
    const {docId} = req.body
    if (!docId) {
        res.json({message:"Please upload the pdf to start the session"})  
    }
    try{
    const userId= req.user.id
    const sessionId = await newSessions(docId,userId)
    console.log(sessionId)
    res.json({message:"Session has started", sessionId})}
    catch(error){
        console.error(error)
    }
}