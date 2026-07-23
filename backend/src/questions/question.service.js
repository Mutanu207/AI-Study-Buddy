import { createQuestion } from "./questions.model.js";
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