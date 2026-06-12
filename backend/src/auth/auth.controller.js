import jwt from "jsonwebtoken";
import {googleLogin, loginUser,registerUser} from "./auth.service.js";
import generateToken from "../utils/generateToken.js";
import { generateRefreshToken} from "../utils/generateToken.js";
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
        res.status(500).json({ message: error.message });
    }
};
export const login= async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        } //validation to make sure that email and password has values//
        const user = await loginUser({email, password }); //we get back the email and id of the user that logged in//
        const token = generateToken(user); //we need to generate a token for the user that logged in//
        const refreshToken = generateRefreshToken(user); //we need to generate a refresh token for the user that logged in//
        res.cookie(
            "refreshToken",
            refreshToken,
            {
                httpOnly: true,
                secure: false,
                sameSite: "strict",

                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        );
        res.status(200).json({ message: "User logged in successfully", user, token});
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(401).json({ message: error.message });
    }
}
export const refreshAccessToken = (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }
        const decoded= jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const accessToken = generateToken({ id: decoded.id});
        res.status(200).json({ accessToken });}
        catch(error){
            console.error("Error refreshing access token:", error);
            res.status(401).json({ message: "Invalid refresh token" });
        }}
    export const logout = (req, res) => {
        try{
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
            });
            res.status(200).json({ message: "User logged out successfully" });}
            catch(error){
                console.error("Logout in error route:", error)
                 return res.status(500).json({ message: "Internal server error" });

        }}

export const googleCallback = async (req, res) => {
    try {
        const googleUser=req.user;
        console.log(googleUser)
        if(!googleUser){
            return res.status(400).json({message: "No details provided"})
        }
        const user= await googleLogin({
            google_id:googleUser.id,
            email: googleUser.emails[0].value,
            username: googleUser.displayName})
        const token= generateToken(user)
        const googleRefreshToken=generateRefreshToken(user)
        res.cookie(
            "refreshToken",
            googleRefreshToken,
            {
                httpOnly: true,
                secure: false,
                sameSite: "strict",

                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        );
        res.redirect("http://localhost:5173/auth-success?token=${token}");

    } catch (error) {
        console.error("Error in Google callback:", error);
        res.status(500).json({ message: "Google login failed" });
    }}