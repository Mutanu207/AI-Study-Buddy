import pool from "../config/dbConfig.js";
export const fetchUserFromDatabase = async (userId) => {
   const result= await pool.query("SELECT email,user_name FROM users WHERE id = $1", [userId]);    
       return result.rows[0];}