 import pool from "../config/dbConfig.js";

export const createQuestion = async (
    sessionId,
    question,
    referenceAnswer,
    chunkIndex,
    topic,
    difficulty
) => {

    const query = `
        INSERT INTO questions (

            session_id,

            question,

            reference_answer,

            chunk_index,
            
            topic,

            difficulty

        )

        VALUES (

            $1,

            $2,

            $3,

            $4,

            $5,

            $6

        );
    `;

    const values = [

        sessionId,

        question,

        referenceAnswer,

        chunkIndex,

        topic,

        difficulty

    ];

    await pool.query(query, values);

};

export const getQuestionsBySessionId = async (sessionId) => {
    const result = await pool.query("SELECT id, question FROM questions WHERE session_id = $1", [sessionId]);
    console.log("Fetched questions:", result.rows); //should return an array of questions with id and question text
    return result.rows;
}