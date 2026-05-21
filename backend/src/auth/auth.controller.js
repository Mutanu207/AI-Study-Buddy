import {loginUser,registerUser} from "./auth.service.js";
import generateToken from "../../utils/generateToken.js";
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        } //validation to make sure that email and password has values//
        const userDetails = await registerUser({ email, password }); //What we get back is user id and email//
        res.status(201).json({ message: "User registered successfully", userDetails });
    } catch (error) {
        console.error("Error in register controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
console.log(process.env.JWT_SECRET)
export const login= async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        } //validation to make sure that email and password has values//
        const user = await loginUser({email, password }); //we get back the email and id of the user that logged in//
        const token = generateToken(user); //we need to generate a token for the user that logged in//
        res.status(200).json({ message: "User logged in successfully", user, token });
        console.log(user)
        console.log(token)
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}