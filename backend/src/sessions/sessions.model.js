import pool from "../config/dbConfig";
 export const createNewSessions = async (docid,userid)=> {
    const result= await pool.query("INSERT INTO sessions (user_id,doc_id) VALUES ($1, $2 ) RETURNING id", [docid,userid]);
    return result.rows[0];
    }