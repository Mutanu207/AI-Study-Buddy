import pool from "../config/dbConfig.js";
export const fetchUserFromDatabase = async (userId) => {
   const result= await pool.query("SELECT email,user_name FROM users WHERE id = $1", [userId]);    
       return result.rows[0];}
export const updateUser = async (userId, username) => {
    const result = await pool.query("UPDATE users SET user_name=$1 WHERE id=$2 RETURNING user_name", [username,userId]);
    return result.rows[0]
}