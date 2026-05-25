import axios from "axios";
export const GOOGLE_AUTH_URL = "/api/auth/google";
//sending a req to the backend to register a user//
export const registerUser = (userData) => {
    try{
    const result=axios.post("/api/auth/register", userData);
    return result} // return response from backend//
    catch(error){
        console.error("Error registering user:", error);     
    }
}
    export const loginUser = (userData) => {
        try{
            const result = axios.post("/api/auth/login", userData);
            return result; //output we get ftom the backend api//
        }
        catch(error){
            console.error("Error logging in user:", error);
        }
    }
    