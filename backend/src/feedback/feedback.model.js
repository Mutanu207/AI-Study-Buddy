import  pool  from "../config/dbConfig.js"
export const saveFeedback= async (feedbackData) => {
    const {session_id, feedback} = feedbackData
    for (const item of feedback){
        await pool.query(
            'INSERT INTO feedback (session_id,answer_id,is_correct,concept,feedback,retrieved_context) VALUES ($1,$2,$3,$4,$5,$6)', 
            [session_id, item.answer_id, item.is_correct, item.concept, item.feedback,item.retrieved_context]
        )
    }
}
export const getUserFeedback= async (sessionId) => {
    const result = await pool.query(
        `
        SELECT
            f.id,
            q.question,
            a.user_answer,
            f.feedback,
            f.is_correct,
            f.concept
        FROM feedback f
        JOIN answers a
            ON f.answer_id = a.id
        JOIN questions q
            ON a.question_id = q.id
        WHERE f.session_id = $1
        ORDER BY f.answer_id;
        `,
        [sessionId]
    );

    return result.rows;
};