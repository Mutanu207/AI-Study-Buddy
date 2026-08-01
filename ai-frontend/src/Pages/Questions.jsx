import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PrimaryButton from "../Components/PrimaryButton";
import { useParams } from "react-router-dom";
import { useFetchQuestions } from "../hooks/fetchQuestions.jsx";
import { useState } from "react";
import { saveAnswers } from "../serivce/api.js";
function Questions() {
    const { sessionId } = useParams();
    const {
        questions,
        loading
    } = useFetchQuestions(sessionId)
    const [answers, setAnswers]= useState({});
    const handleAnswerChange = (questionId, answer) => {
    setAnswers((previousAnswers) => ({
        ...previousAnswers,
        [questionId]: answer,
    }));}
    const payload = {
                sessionId,

                answers: questions.map((question) => ({
                    questionId: question.id,
                    userAnswer: answers[question.id] || "",
                })),
            };
            console.log(payload)
    const sendAnswers = async () => {
        try {
            const response= await saveAnswers(payload);
            console.log("Answers saved successfully:", response);

        } catch (error) {
            console.error("Error saving answers:", error);
        }
    }

if (loading) return  <Typography variant="h6" align="center" sx={{ mt: 4 }}>Loading...</Typography>;
    return (
       <Box>
        <Box sx={{
                    m:4,
                    p:3,
                    border: "5px solid #1A1A40",
                    borderRadius: "36px",

        }}>
            <Box>
                <Typography sx={{textAlign:"center",
                                fontSize:"2rem",
                                fontWeight:"bold"}}
                >PRACTICE QUIZ</Typography>
            </Box>
            {questions.map((question, index) => (
            <Box key={question.id} sx={{ mt: 4 }}>
               
                <Typography>{index + 1}. {question.question}</Typography>
            <TextField
                    placeholder="Input answer"
                    multiline
                    rows={4}
                    sx={{
                    width: "500px",
                    "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",

                    "& fieldset": {
                        borderColor: "#1A1A40",
                    },

                    "&:hover fieldset": {
                        borderColor: "#1A1A40",
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
                    justifyContent:"flex-end"
                }}>
                <PrimaryButton color="#fff" background= "#00800" size="large" onClick={sendAnswers}> End Quiz </PrimaryButton>
            </Box>
        </Box>
       </Box>
    );
}
export default Questions;