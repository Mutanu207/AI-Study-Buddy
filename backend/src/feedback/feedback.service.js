import {saveFeedback, getUserFeedback} from "./feedback.model.js"
export const receiveFeedback = async (feedbackData) => {
        try{
            if(!feedbackData) {
                throw new Error ("No feedback provided")
            }
            await saveFeedback (feedbackData)
        }
        catch(error){
            throw new Error ("No feedback to store")
        }
}
export const fetchUserFeedback = async (sessionId) => {
    try{
        const feedback= await getUserFeedback(sessionId)
        if(!feedback){
            throw new Error ("No feedback provided for displaying")
        }
        return feedback
    }
     catch(error){
            throw new Error ("No feedback to display")
        }
}