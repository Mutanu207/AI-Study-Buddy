import { userAnswers } from "./answers.service.js";
export const saveAnswers = async (req, res) => {
    try {
        const { sessionId, answers } = req.body;
        console.log(sessionId, answers);
        if(!sessionId || !answers) {
            return res.status(400).json({ message: "Please answer all questions" });
        }
        await userAnswers(sessionId, answers);
        res.status(200).json({ message: "Answers saved successfully", sessionId });
    } catch (error) {
        res.status(500).json({ message: "Error saving answers", error });
    }}