import Navbar from "../Components/Navbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useUsername } from "../hooks/useUsername";

  function About(){
     const { username } = useUsername();
  return(
    <>
    <Navbar user={username} />
  <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor:"#fff"}}>
            <Box sx={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                my:6
            }}>
                <Container maxWidth="md" >
<Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold', align:"center"}}>
  About AI Study Buddy
</Typography>

<Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 2 }}>
  AI Study Buddy is an AI-powered learning platform designed
  to help students study smarter and understand concepts
  more effectively.
</Typography>

<Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 2 }}>
  Users can upload learning materials such as PDFs,
  generate study sessions, answer questions, and receive
  personalized feedback based on their responses.
</Typography>

<Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 2 }}>
  The platform uses Retrieval-Augmented Generation (RAG)
  to ensure that questions and feedback are grounded in
  the uploaded learning content.
</Typography>

<Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 2 }}>
  Our goal is to make learning more interactive,
  personalized, and engaging while encouraging critical
  thinking and deeper understanding.
</Typography> 
</Container>
</Box>
</Box> 
</>
  );
}
export default About;
