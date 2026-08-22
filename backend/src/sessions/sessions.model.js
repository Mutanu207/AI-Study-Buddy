import pool from "../config/dbConfig.js";
 export const createNewSessions = async (docid,userid)=> {
    const result= await pool.query("INSERT INTO sessions (document_id,user_id) VALUES ($1, $2 ) RETURNING id", [docid,userid]);
    return result.rows[0];
    }

   export const fetchFilePath= async (docid) => {
      const result= await pool.query("SELECT file_path FROM documents WHERE id=$1", [docid])
      return result.rows[0]
   }
  export const fetchSessions = async (userId) => {
  const result = await pool.query(
    "SELECT id, score, EXTRACT(EPOCH FROM (completed_at - started_at)) AS time_taken FROM sessions WHERE user_id = $1", 
    [userId]
  )
  console.log(result.rows)
  return result.rows
}

  export const fetchUserDetails = async (userId, sessionId) => {
  const result = await pool.query(
    `SELECT 
       q.question,
       a.user_answer,
       q.reference_answer,
       f.feedback,
       f.is_correct,
       f.concept
     FROM feedback f
     JOIN answers a 
       ON f.answer_id = a.id
     JOIN questions q 
       ON a.question_id = q.id
     JOIN sessions s
       ON a.session_id = s.id
     WHERE f.session_id = $1
       AND s.user_id = $2
     ORDER BY f.answer_id;`,
    [sessionId, userId]
  );
  return result.rows;
};

export const fetchFileName = async (sessionId) => {
   const result= await pool.query(
      `SELECT 
         d.file_name
         FROM documents d
         JOIN sessions s
            ON s.document_id= d.id
         WHERE s.id= $1;`,
         [sessionId]
   );
   return result.rows[0]
}