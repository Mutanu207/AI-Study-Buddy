import {saveFeedback} from "./feedback.model.js"
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