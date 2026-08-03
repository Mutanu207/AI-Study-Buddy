import pool from "../config/dbConfig.js";
export const saveUserAnswers = async ({ sessionId, questionId, userAnswer }) => {
    try {
        //we return the question id
        //build query to insert the answers into the database
         const query = ` 
        INSERT INTO answers (
            session_id,
            question_id,
            user_answer
        )
        VALUES ($1, $2, $3)
        RETURNING id AS answer_id, user_answer;
    `;

    const values = [
        sessionId,
        questionId,
        userAnswer,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];

    } catch (error) {
        console.error("Error saving user answers:", error);
        throw error;
    }
};

export const getAnswerContext = async (questionId) => {
    try {
        const query = `
        SELECT question, reference_answer, chunk_index
        FROM questions
        WHERE id = $1;
    `;

    const values = [questionId];

    const result = await pool.query(query, values);

    return result.rows[0];

    } catch (error) {
        console.error("Error fetching answer context:", error);
        throw error;
    }
};
