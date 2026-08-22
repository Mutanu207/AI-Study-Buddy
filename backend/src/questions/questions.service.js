import { createQuestion, getQuestionsBySessionId } from "./questions.model.js";
export const saveQuestions = async (sessionId, questions) => {

    for (const question of questions) {

        await createQuestion(

            sessionId,

            question.question,

            question.reference_answer,

            question.chunk_index,

            question.topic,

            question.difficulty

        );

    }

};

export const fetchQuestions = async (sessionId) => {
    if(!sessionId) {
        throw new Error("Session ID is required to fetch questions.");
    }
    const questions = await getQuestionsBySessionId(sessionId);
    if (!questions || questions.length === 0) {
        throw new Error("No questions found for the given session ID.");
    }
    console.log("Questions fetched successfully:", questions);
    return questions;
    // Fetch questions from the database based on the sessionId
}