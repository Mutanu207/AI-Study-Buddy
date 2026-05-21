import pkg from "pg";
 const { Pool } = pkg;
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
}); 
pool.on("connect", () => {
    console.log("Connected to the database");
});
pool.on("error", (err) => {
    console.error("Database connection error:", err);
});
export default pool;