import pool from "../config/dbConfig.js";
//find if a user exists
export const findUserByEmail = async (email) => {
    const result= await pool.query("SELECT * FROM users WHERE email = $1", [email]);    
    return result.rows[0];
};
//add user to DB
export const createUser= async (email,hashedPassword) => {
    const result= await pool.query("INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id,email", [email, hashedPassword]);
    return result.rows[0];
}
