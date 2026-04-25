import bcrypt from "bcrypt";
import findUserByEmail from "./auth.model.js";
import createUser from "./auth.model.js"
import findExistingUser from "./auth.model.js";
export const registerUser = async ({ email, password }) => {
    try{
        const existingUser = await findUserByEmail(email);
        if(existingUser) throw new error ("User Exists");
        const hashedPassword = await bcrypt.hash(password, 10);
        //we need to pass email,and password to a model.js function to create new user//
        const user= await createUser(email, hashedPassword);
        return user; //id and email to be returned//
    }
    catch{
        throw new error("Error registering user");  
    }};
    export const loginUser= async ({email,password}) => {
        try{
            const loginUser= await findExistingUser(email); //fetches the user details//
            if (!loginUser) throw new error("User not found"); //if the user details does exist give error so that user registers//
            const isMatch = await bcrypt.compare(password, loginUser.password_hash);
            if (!isMatch) throw new error("Invalid credentials");
            return loginUser.email; //we can return email //
        }
        catch(error){
            throw new error("Error logging in user");
        }
    }