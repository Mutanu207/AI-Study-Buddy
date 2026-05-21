import bcrypt from "bcrypt";
import {findUserByEmail, createUser} from "./auth.model.js";
export const registerUser = async ({email, password }) => {
    try{
        const editEmail=email.toLowerCase().trim(); //to make sure that email is in a standard format//
        const existingUser = await findUserByEmail(editEmail);//confirm if user exists//
        if(existingUser) throw new Error ("User Exists");
        const hashedPassword = await bcrypt.hash(password, 10);
        //we need to pass email,and password to a model.js function to create new user//
        const user= await createUser(editEmail, hashedPassword);
        return user; //id and email to be returned//
        
    }
    catch(error){
        throw error;  
    }};
    export const loginUser= async ({email,password}) => {
        try{
            const editEmail=email.toLowerCase().trim(); //to make sure that email is in a standard format//
            const loginUsers= await findUserByEmail(editEmail); //fetches the user details//
            if (!loginUsers) throw new Error("User not found"); //if the user details does exist give error so that user registers//
            const isMatch = await bcrypt.compare(password, loginUsers.password_hash);
            if (!isMatch) throw new Error("Invalid credentials");
            return { email: loginUsers.email, id: loginUsers.id }; //we can return email and id //
        }
        catch(error){
            throw error;
        } 
    }