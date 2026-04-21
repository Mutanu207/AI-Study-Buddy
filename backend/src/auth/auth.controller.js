import registerUser from "./auth.service.js";
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        } //validation to make sure that email and password has values//
        const userDetails = await registerUser({ email, password });
        res.status(201).json({ message: "User registered successfully", userDetails });
    } catch (error) {
        console.error("Error in register controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};