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