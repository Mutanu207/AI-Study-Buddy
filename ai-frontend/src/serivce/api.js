import axios from "axios";
export const GOOGLE_AUTH_URL = "/api/auth/google";
//sending a req to the backend to register a user//
export const registerUser = (userData) => {
    try{
    const result=axios.post("/api/auth/register", userData);
    return result.data } // return response from backend//
    catch(error){
        console.error("Error registering user:", error);     
    }
}