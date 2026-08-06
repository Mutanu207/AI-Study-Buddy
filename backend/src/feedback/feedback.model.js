export const saveFeedback= async (feedbackData) => {
    const {session_id, feedback} = feedbackData
    for (const item of feedback){
        await pool.query(
            'INSERT INTO feedback (session_id,answer_id,is_correct,concept,feedback,retrieved_context) VALUES ($1,$2,$3,$4,$5,$6)', 
            [session_id, item.answer_id, item.is_correct, item.concept, item.feedback,item.retrieved_context]
        )
    }
}