import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PrimaryButton from "../Components/PrimaryButton"; 
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { GOOGLE_AUTH_URL,loginUser} from "../serivce/api";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { validateLogin } from "../utils/authValidation";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
function Login() {
    const brandColor = "#1A1A40"; // Deep blue for the brand color//
    const navigate= useNavigate();
    const[user, setUser] = useState({
        email: "",
        password: "",
    })
    const [notification, setNotification] =useState({
        open: false,
        message: "",
        severity: "success"
    })
    const [showPassword, setShowPassword] = useState(false);
    const handleGoogleLogin = () => {
        window.location.href = GOOGLE_AUTH_URL;
    };
    const handleLogin= async ()=>{
        try{
        const validationError = validateLogin(user);
        if (validationError) {
            setNotification({
                open: true,
                message: validationError,
                severity: "error"
            });
            return;
        }
        const response= await loginUser(user);
        localStorage.setItem(
        "token",
        response.token);
        setNotification({
            open: true,
            message: response.message,
            severity: "success"
        });
        setTimeout(() => {
            navigate("/starter");
        }, 1500);
        }
        catch(error){
            setNotification({
                open: true,
                message: error.response?.data?.message || "Login failed. Please try again.",
                severity: "error"
            });
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        }
    }
    
    return (
       <Box sx={{
                   minHeight: '100vh',
                   display: 'flex',
                   flexDirection: 'column',
                   bgcolor: '#F8F9FA',
                  }}>
                   <Box sx={{
                       flexGrow: 1,
                       justifyContent: 'center',
                       alignItems: 'center',
                       display: 'flex',
                       my:6,
                       p:3,
                   }}>
        <Container maxWidth="sm"  
                    sx={{
                        bgcolor: 'white',
                        boxShadow: '0px 20px 40px rgba(26, 26, 64, 0.05)', // Subtle shadow using brand color
                        borderRadius: "24px",
                        padding: 6,
                        border: `1px solid #E5E7EB` // Light border instead of heavy brand border
                    }}>
            <Typography variant="h2" align="center" gutterBottom 
                        sx={{color: brandColor, 
                            fontWeight: 800, 
                            fontFamily: 'Playfair Display, serif',
                            mb: 1 }}>
                Login Page
            </Typography>
            <Typography variant="body1" align="center" sx={{color: '#6B7280', mb: 4}} >
                Login and continue your learning journey with <br />
                <Box component="span" sx={{ color: brandColor, fontWeight: 'bold' }}>AI Study Buddy!</Box>
            </Typography>
            <Box display="flex" justifyContent="center" mt={4}>
                <PrimaryButton color="#fff" background="#ff0000" size="large" onClick={handleGoogleLogin}
                    sx={{
                        width: '100%', 
                        textTransform: 'none',
                        mb: 3
                    }}>
                    <img src="https://www.google.com/favicon.ico" alt="G" style={{ width: 18, marginRight: 10 }} />
                        Continue with Google
                </PrimaryButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt:3 }}>
            <Box sx={{ flex: 1, height: '1px', bgcolor: '#E5E7EB' }} />
            <Typography variant="caption" sx={{ px: 2, color: '#9CA3AF', fontWeight: 600 }}>OR</Typography>
             <Box sx={{ flex: 1, height: '1px', bgcolor: '#E5E7EB' }} />
             </Box>
            <Box component="form" noValidate autoComplete="off">
                <TextField label="Email" variant="outlined" fullWidth margin="normal" placeholder="Enter your email"
                    value={user.email}
                    onChange={(event)=>{setUser(prevValue => ({...prevValue, email: event.target.value}))}}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "#1A1A40",
                            },
                            "&:hover fieldset": {
                                borderColor: "#1A1A40",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#1A1A40",
                            },
                        }
                    }} />
                <TextField label="Password" variant="outlined" fullWidth margin="normal" type={showPassword ? "text" : "password"} placeholder="Enter your password" 
                    value={user.password}
                    onChange={(event)=>{setUser(prevValue => ({...prevValue, password: event.target.value}))}}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: brandColor,
                            },
                            "&:hover fieldset": {
                                borderColor: brandColor,
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: brandColor,
                            },
                        }
                    }} />
                <Box display="flex" justifyContent="center" mt={2}>
                    <PrimaryButton color="#fff" background= {brandColor} size="large" onClick={handleLogin}
                    sx={{ width: '100%', 
                            py: 1.5, 
                            fontSize: '1rem',
                            boxShadow: `0 8px 16px -4px rgba(26, 26, 64, 0.3) `}}>
                        Login
                    </PrimaryButton>
                </Box>
                <Box>
                    <Typography variant="body2" align="right" sx={{ mt: 2, color: '#6B7280' }}>
                        <Box component="span" sx={{ color: brandColor, fontWeight: 'bold', cursor: 'pointer' }}>Forgot Password?</Box>
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ mt: 2, color: '#6B7280' }}>
                       <Link component={RouterLink} to="/register" underline="none" sx={{ color: brandColor, fontWeight: "bold" }}>
                  Don't have an account? <Box component="span" sx={{ ml: 0.5 }}>Sign Up</Box>
                </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
       </Box>
       <Snackbar
           open={notification.open}
           autoHideDuration={3000}
           onClose={() => setNotification(prev => ({ ...prev, open: false }))}
           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
       >
           <Alert
               severity={
                   notification.severity
               }
               variant="filled">
           
               {notification.message} 
           </Alert>
       </Snackbar>
         </Box>
    );
}

export default Login;