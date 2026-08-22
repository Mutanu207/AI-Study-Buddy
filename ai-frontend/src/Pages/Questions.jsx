import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PrimaryButton from "../Components/PrimaryButton";
import { useParams } from "react-router-dom";
import { useFetchQuestions } from "../hooks/fetchQuestions.jsx";
import { useState } from "react";
import { saveAnswers } from "../service/api.js";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function Questions() {
    const navigate= useNavigate();
    const { sessionId } = useParams();
    const {questions,loading} = useFetchQuestions(sessionId)
    const [answers, setAnswers]= useState({});
     //setting up notifications
    const [notification, setNotification] =useState({
                open: false,
                message: "",
                severity: "success"
            })
    const [loadingSession, setLoadingSession]= useState(false)
    //functions        
    const handleAnswerChange = (questionId, answer) => {
    setAnswers((previousAnswers) => ({
        ...previousAnswers,
        [questionId]: answer, //Bound the answer to the questionId
    }));}
    const payload = {
                sessionId,

                answers: questions.map((question) => ({
                    questionId: question.id,
                    userAnswer: answers[question.id] || "",//grab the answer from the answers state, if not present, default to an empty string grab using the questionId as the key                        
                })),
            };
            console.log(payload)
    const sendAnswers = async () => {
        // if its true it means user has pressed it the first time already, for the first time its false so the function will execute
        if(loadingSession){
            return;
        }
        setLoadingSession(true)
        try {
            const response= await saveAnswers(payload);
            setNotification({
            open: true,
            message: response.message,
            severity: "success"
             });
            setTimeout(() => {
            navigate(`/feedback/${response.sessionId}`);
        }, 1500); 
            console.log("Answers saved successfully:", response);
        } catch (error) {
            setNotification({
            open: true,
            message: error.response?.data?.message || "Failed to start session",
            severity: "error"
            })
            setLoadingSession(false);
        }
    }

    if (loading) return  <Typography variant="h6" align="center" sx={{ mt: 4 }}>Loading...</Typography>;
    return (
       <Box sx={{ background: "linear-gradient(180deg,#F8F5FF 0%, #EEF4FF 100%)" ,
                    minHeight: "100vh",
                     py: 6,

       }}>
        <Box sx={{
                    maxWidth: "1000px",
                    mx: "auto",
                    my: 5,
                    px: 5,
                    py: 5,
                    bgcolor: "#FFFFFF",
                    borderRadius: "24px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"}}>
            <Box sx={{ mb: 5 }}>
                <Typography
                    variant="h3"
                    fontWeight="bold"
                    fontColor="#1A1A40"
                >
                    Practice Quiz
                </Typography>

                <Typography
                    color="text.secondary"
                >
                    Answer all questions to the best of your ability.
                </Typography>
            </Box>
            {questions.map((question, index) => (
            <Box key={question.id} sx={{ border: "1px solid #ECECEC",
                                        borderRadius: "18px",
                                        p: 3,
                                        mb: 4,
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

                            <Typography
                                sx={{
                                    fontSize: "1.05rem",
                                    fontWeight: "bold",
                                    color: "#1A1A40",
                                    
                                }}
                            >
                                {question.question}
                            </Typography>
            <TextField
                    placeholder="Input answer"
                    multiline
                    rows={4}
                    sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        border: "1px solid #CBD5E1",
                        backgroundColor: "#FAFAFC",
                        padding: "10px",
                        transition: "0.2s",
                    "& fieldset": {
                        borderColor: "#1A1A40",
                    },

                    "&:hover fieldset": {
                        borderColor: "#1A1A40",
                    },
                     "&.Mui-focused fieldset": {
                        borderColor: "#7C3AED",
                        borderWidth: "2px",
            },
                        },
                    }}
                        onChange={(event) =>
                                handleAnswerChange(
                                    question.id,
                                    event.target.value
                                )
                            }
                />
            </Box>))}
            <Box 
                sx={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    mt:4
                }}>
                <PrimaryButton color="#fff" background= "#5B21B6" size="large" px={6} onClick={sendAnswers} disabled={loadingSession}
                       sx={{height: "50px", width: "200px"}}> Submit Quiz </PrimaryButton>
                <Typography color="text.secondary" align="center" sx={{mt:2}} >
                Your answers will be submitted for AI evaluation.</Typography>
            </Box>
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
export default Questions;