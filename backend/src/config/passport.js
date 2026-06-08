import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI
}, (accessToken, refreshToken, profile, done) => {
    // Here you would typically find or create a user in your database
    // For simplicity, we'll just return the profile information
    return done(null, profile, {session: false});
}));
export default passport;
