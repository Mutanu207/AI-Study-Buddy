import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
function AuthSuccess() {
    const navigate = useNavigate();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (token) {
            localStorage.setItem("token", token);
                navigate("/starter");} 
                else {
            navigate("/login");
        };
    },[navigate]);
    return (
        <div><h2>Signing you in...</h2></div>)}
export default AuthSuccess;