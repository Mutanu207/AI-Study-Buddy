 import pool from "../config/dbConfig.js";
 export const createDocument = async (userid,filename,filepath)=> {
    const result= await pool.query("INSERT INTO documents (user_id,file_name,file_path) VALUES ($1, $2,$3 ) RETURNING id", [userid,filename,filepath]);
    return result.rows[0];
    }