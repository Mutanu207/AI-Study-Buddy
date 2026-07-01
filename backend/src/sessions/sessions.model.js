import pool from "../config/dbConfig.js";
 export const createNewSessions = async (docid,userid)=> {
    const result= await pool.query("INSERT INTO sessions (document_id,user_id) VALUES ($1, $2 ) RETURNING id", [docid,userid]);
    return result.rows[0];
    }

   export const fetchFilePath= async (docid) => {
      const result= await pool.query("SELECT file_path FROM documents WHERE id=$1", [docid])
      console.log(result.rows[0])
      return result.rows[0]
   }