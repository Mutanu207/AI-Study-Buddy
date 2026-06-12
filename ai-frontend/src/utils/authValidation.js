// authValidation.js

export const validateRegister = (user) => {

    const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.email.trim()) {
        return "Email is required";
    }

   if (!emailRegex.test(user.email.trim())) {
        return "Please enter a valid email";
    }

    if (!user.password) {
        return "Password is required";
    }

    if (user.password.length < 8) {
        return "Password must be at least 8 characters";
    }

    return null;
};

export const validateLogin = (user) => {

    if (!user.email.trim()) {
        return "Email is required";
    }

    if (!user.password) {
        return "Password is required";
    }

    return null;
};