import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES
        }
    );
};

export default generateToken;
 
export const generateRefreshToken = (user) => {
    return jwt.sign(
        {id: user.id }, //we only need the user id to generate a refresh token, we dont need the email because we will use the refresh token to get a new access token and the access token will have the email in it//
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES
        }
    );
};

          