import { fetchQuestions } from "./questions.service.js";
export const getUserQuestions = async (req, res) => {
    const { sessionId } = req.params; 
   try {
        // Fetch questions from the database based on the sessionId
        const questions = await fetchQuestions(sessionId);
        console.log("Questions fetched successfully:", questions);
        res.status(200).json(questions); //should return an array of questions with id and question text 
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error });
    }
};