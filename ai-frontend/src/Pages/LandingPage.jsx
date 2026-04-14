import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PrimaryButton from "../Components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";
function LandingPage(){
    const navigate = useNavigate();
    const containerVariant = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { 
            staggerChildren: 0.6,
            delayChildren: 0.3,
         }}
    };
    const itemVariants = {
        hidden: { opacity: 0, y:30 },
        visible: { opacity: 1,
                    y:0, 
                    transition: { duration: 0.6, ease: "easeOut" }     
         }
    };
    return(
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor:"#1A1A40"}}>
            <Box sx={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                my:6
            }}>
                <Container maxWidth="md"
                            component={motion.div}
                            variants={containerVariant}
                            initial="hidden"
                            animate="visible">
                    <Typography variant="h2" 
                                align="center" 
                                gutterBottom 
                                sx={{color:"#fff", fontWeight: 'bold' ,fontFamily: 'Playfair Display, serif' }}
                                component={motion.div}
                                variants={itemVariants}>
                        Welcome to AI Study Buddy
                    </Typography>
                    <Typography variant="h5" 
                                align="center" 
                                color="textSecondary" 
                                sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 'medium', fontFamily: 'Roboto, sans-serif' }}
                                component={motion.div}
                                variants={itemVariants}>
                        Your personalized AI assistant for effective studying and learning.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
                        component={motion.div}
                        variants={itemVariants}>
                        <PrimaryButton size="large" background="#8239F7" color="#fff" 
                        onClick={() => navigate("/login")}
                        sx={{ '&:hover': { backgroundColor: "#6626D0"}, padding: "10px 20px" }}>
                            Get Started
                        </PrimaryButton>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
} export default LandingPage;