import { fetchUserFeedback } from "./feedback.service.js";
export const fetchFeedback = async (req,res) => {
    try{
    const {sessionId} = useParams();
    if (!sessionId){
        return res.status(400).json({ message: "No session id" });
    }
    const userFeedback = await fetchUserFeedback(sessionId)
    console.log(userFeedback)
    res.status(200).json(userFeedback); //should returns questions with id and question text 
    } catch (error) {
        res.status(500).json({ message: "Error fetching feedback", error });
    }
}