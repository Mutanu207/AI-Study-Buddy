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
export const createGoogleUser =  async(google_id,email,username) => {
    const result = await pool.query("INSERT INTO users (google_id, email, user_name) VALUES ($1, $2, $3) RETURNING id, email", [google_id, email, username]);
    return result.rows[0];
}
export const findUserByGoogleId = async (google_id) => {
    const result = await pool.query("SELECT * FROM users WHERE google_id = $1", [google_id]);
    return result.rows[0];
}