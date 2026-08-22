import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PrimaryButton from "../Components/PrimaryButton";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchFeedback } from "../hooks/fetchfeedback";
function Feedback () {
    const navigate= useNavigate();
    const {sessionId}= useParams();
    //send session id to hook function which uses it to grab questions and get feedback back
    const{ feedback,loading}= useFetchFeedback(sessionId)
    console.log("from jsx", feedback)
    if (loading) return  <Typography variant="h6" align="center" sx={{ mt: 4 }}> Loading...</Typography>;
    return (
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
                         variant="h3" fontWeight="bold" sx={{color:"#1A1A40"}}>Feedback Review </Typography>
                    <Typography color="text.secondary">Review your answers and feedback given</Typography>
                </Box>
                {feedback.map((item,index) =>(
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
                            <Typography
                             sx={{fontSize: "1.05rem",fontWeight: "bold",mb:3, color:item.is_correct ? "#15803D" : "#B91C1C"}}>
                                Mark: {item.is_correct ? "Correct" : "Incorrect"}
                            </Typography>
                             <Typography sx={{mb:3}}>
                             <span style={{fontSize: "1.05rem",fontWeight: "bold",color: "#1A1A40",}}>Concept: </span>
                             {item.concept}
                            </Typography>
                    </Box>))} 
                       <Box sx={{
                                display:"flex",
                                flexDirection:"column",
                                alignItems:"center",
                                mt:4 }}>
                                <PrimaryButton color="#fff" background= "#5B21B6" size="large" px={6} onClick={() => { navigate("/starter")}} 
                                sx={{height: "50px", width: "200px"}}> End Review </PrimaryButton></Box>
             </Box>                   
        </Box>)}
export default Feedback