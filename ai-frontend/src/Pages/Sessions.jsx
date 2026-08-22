import Box from "@mui/material/Box";
import React from "react";
import Typography from "@mui/material/Typography";
import { useUsername } from "../hooks/useUsername";
import Navbar from "../Components/Navbar";
import PrimaryButton from "../Components/PrimaryButton";
import { useFetchSession } from "../hooks/fetchSessions.jsx";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { sessionFeedback } from "../service/api.js";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Sessions(){
    // state that handles if the popup screen is open or not when on false its closed 
        const [open, setOpen] = React.useState(false);
        //State that holds the selected session id
        const [fileName, setFileName] = React.useState("");
        const [userSessionDetails, setUserSessionDetails] = React.useState([]);
        const handleClickOpen = async (sessionId) => {
        try {
            // Use sessionId parameter directly, not selectedSessionId
            const response = await sessionFeedback(sessionId);
            console.log(response);
            
            // Set the data to state
            setFileName(response.sessionDetails.fileName.file_name);
            setUserSessionDetails(response.sessionDetails.userSessionDetails);
            setOpen(true);
        } catch(error) {
            console.error(error);
        }
    }; //this function is called when button is clicked and the pop up opnens

        const handleClose = () => {
            setOpen(false);
            setFileName("");
            setUserSessionDetails([]);
         }; //pop up closes
        const { username } = useUsername();
        const { session, loading, error } = useFetchSession();
        if (loading) {
            return <Typography>Loading...</Typography>;
        }``
        if (error) {
            return <Typography>Error: {error.message}</Typography>;
        }
    return(
        <>
         <Navbar user={username} />
        <Box
             sx={{
                background: "linear-gradient(180deg,#F8F5FF 0%, #EEF4FF 100%)" ,
                minHeight: "100vh",
                py: 6,
            }}>
            <Box
                  sx={{
                    maxWidth: "1000px",
                    mx: "auto",
                    my: 5,
                    px: 5,
                    py: 5,
                    bgcolor: "#FFFFFF",
                    borderRadius: "24px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"}}>
            <Box>
                <Typography
                    variant="h3" fontWeight="bold" sx={{color:"#1A1A40"}}>User Sessions</Typography>
                <Typography color="text.secondary">View your past sessions and their details</Typography>
                </Box>
                
                {session.map((item,index) => (
                    <Box key={item.id} sx={{ border: "1px solid #ECECEC",
                                        borderRadius: "18px",
                                        p: 3,
                                        mb: 4,
                                        gap:3,
                                        boxShadow: "0 2px 6px rgba(0,0,0,.05)"}}> 
                            <Typography sx={{mb:3}}>
                            <span style={{fontSize: "1.05rem",fontWeight: "bold",color: "#1A1A40",}}>Session: </span>
                            {index + 1}
                            </Typography>
                            <Typography sx={{mb:3}}> 
                            <span style={{fontSize: "1.05rem",fontWeight: "bold",color: "#1A1A40",}}>Score: </span>  
                            {item.score} 
                            </Typography>
                            <Typography sx={{mb:3}}>
                            <span style={{fontSize: "1.05rem",fontWeight: "bold",color: "#1A1A40",}}>Time Taken: </span>
                            {item.time_taken} </Typography>
                            <Box>
                                <PrimaryButton color="#fff" background= "#5B21B6" size="large" px={6}  onClick={() => handleClickOpen(item.id)}
                                sx={{height: "50px", width: "200px"}}>View Details</PrimaryButton></Box> </Box>))}

                            <Dialog
                            fullScreen
                            open={open}
                            onClose={handleClose}
                            slots={{
                            transition: Transition,
                            }}
                        >
                            <AppBar sx={{ position: 'relative', backgroundColor:"#1A1A40" }}>
                            <Toolbar>
                                <IconButton
                                edge="end"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                                >
                                <CloseIcon />
                                </IconButton>
                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                               Session Details
                                </Typography>
                            </Toolbar>
                            </AppBar>
                             <Box
                                sx={{
                                    maxWidth: "1000px",
                                    mx: "auto",
                                    my: 5,
                                    px: 5,
                                    py: 5,
                                    bgcolor: "#FFFFFF",
                                    borderRadius: "24px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"}}>
            <Box>
                <Typography
                    variant="h3" fontWeight="bold" sx={{color:"#1A1A40"}}>User Session</Typography>
                <Typography color="text.secondary">PDF Name: {fileName} </Typography>
                </Box>
                {userSessionDetails.map((item,index) => (
                    <Box key={item.id} sx={{ border: "1px solid #ECECEC",
                                        borderRadius: "18px",
                                        p: 3,
                                        mb: 4,
                                        gap:3,
                                        boxShadow: "0 2px 6px rgba(0,0,0,.05)"}}> 
                                      
                        <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    bgcolor: "#EDE9FE",
                                    color: "#5B21B6",

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    fontWeight: "bold",

                                    flexShrink: 0,
                                }}
                            >
                                {index + 1}
                            </Box>
                            <Typography sx={{mb:3}}>
                                                         <span style={{fontSize: "1.05rem",fontWeight: "bold",color: "#1A1A40",}}>Question: </span>
                                                         {item.question}
                                                        </Typography>
                                                         <Typography sx={{mb:3}}>
                                                         <span style={{fontSize: "1.05rem",fontWeight: "bold",color: "#1A1A40",}}>Answer: </span>
                                                         {item.user_answer}
                                                        </Typography>
                                                         <Typography sx={{mb:3}}>
                                                         <span style={{fontSize: "1.05rem",fontWeight: "bold",color: "#1A1A40",}}>Feedback: </span>
                                                         {item.feedback}
                                                        </Typography> 
                                                        <Typography sx={{mb:3}}>
                                                         <span style={{fontSize: "1.05rem",fontWeight: "bold",color: "#1A1A40",}}>Reference Answer: </span>
                                                         {item.reference_answer}
                                                        </Typography> 
                                                        <Typography
                                                         sx={{fontSize: "1.05rem",fontWeight: "bold",mb:3, color:item.is_correct ? "#15803D" : "#B91C1C"}}>
                                                            Mark: {item.is_correct ? "Correct" : "Incorrect"}
                                                        </Typography>
                                                         <Typography sx={{mb:3}}>
                                                         <span style={{fontSize: "1.05rem",fontWeight: "bold",color: "#1A1A40",}}>Concept: </span>
                                                         {item.concept}
                                                        </Typography></Box>))}
                                                        </Box>
                          
                        </Dialog>
        </Box>
        </Box>
       </> 
    )
}
export default Sessions