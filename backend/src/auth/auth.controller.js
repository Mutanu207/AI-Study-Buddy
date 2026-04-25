import registerUser from "./auth.service.js";
import loginUser from "./auth.service.js";
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
export const login= async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        } //validation to make sure that email and password has values//
        const userEmail = await loginUser({ email, password }); //we get back the email of the user that logged in//
        res.status(200).json({ message: "User logged in successfully", userEmail });

    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}