import Typography from "@mui/material/Typography";
import  Navbar  from "../Components/Navbar";
import {useState} from "react";
import { useDropzone } from 'react-dropzone';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PrimaryButton from "../Components/PrimaryButton";
import { useUsername } from "../hooks/useUsername";
import { uploadPdf, createSessions } from "../serivce/api";


function StarterPage() {
    const [files, setFiles] = useState(null);
    const [docId, setDocId]= useState(null)
    const [sessionsId, setUserSessions]= useState(null);
    const { username, loading,userEmail, setUsername} = useUsername();
    const onDrop = (acceptedFiles) => {
        setFiles(acceptedFiles[0]);
    }

    const {getRootProps, getInputProps, isDragActive} = 
    useDropzone({onDrop,
                    accept:{'application/pdf': ['.pdf']}, //accept pdf only//
                    multiple: false}); //not multiple pdfs//
    
    //send the pdf to the backend by sending post req to nbackend api using function uploadpdf//
    const handlePdfSubmit= async ()=> {
        if(!files) {
            return alert("Input PDF")
        }//add notification//
        try{
        const response= await uploadPdf(files)     
        setDocId(response.id)   
        if(docId) setFiles(null)}
       catch(error){
        console.error(error)
    }}

    const handleSessions= async () => {
        if (!docId){
            return alert("Make sure you have uploaded the pdf")
        }
        try{
            const response= await createSessions(docId)
            setUserSessions(response.id)
            console.log(sessionsId)// send over the message//
        }
        catch(error){
            console.error(error)
        }
    }

    if (loading) return  <Typography variant="h6" align="center" sx={{ mt: 4 }}>Loading...</Typography>;
   
    return(
        <> 
        <Navbar user={username} email={userEmail} updateUsername={setUsername}/> 
        <Box sx={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                my:6
            }}>
        <Typography variant="h4" align="center" sx={{ mt: 4, fontWeight: 'bold', fontFamily: 'Playfair Display, serif' }}>
            
            Hey There {username}!
        </Typography>
        <Paper {...getRootProps()}
            elevation={0}
            sx={{ 
                border: '2px dashed #1A1A40',
                borderRadius: 4,
                mt: 4, 
                p: 6, 
                textAlign: 'center', 
                cursor: 'pointer', 
                backgroundColor: isDragActive ? '#fsfsff' : '#fff' }}>
            <input {...getInputProps()} />
            {files ? (<><Typography variant="h6">Selected File:</Typography>
            <Typography variant="body1">{files.name}</Typography></>):
            isDragActive ? (
                <Typography variant="h6">Drop the PDF here ...</Typography>
            ) : (
                <Typography variant="h6">Drag 'n' drop a PDF file here, or click to select a file</Typography>
            )} </Paper>
            {!docId &&(// if doc id is not there it means the pdf has not been uploaded so show the delete and upload pdf buttons//
                <>
        <Button variant="contained" 
                color="error" 
                disabled={!files} //buttons is disabled if the user has not uploaded pdf//
                sx={{ mt: 4, mb: 2 }}  
                onClick={() => setFiles(null)}>
            Remove File
        </Button>
        <PrimaryButton size="large" background="#1A1A40" color="#fff" 
                        sx={{ mt: 4 }} 
                        disabled={!files} //buttons is disabled if the user has not uploaded pdf//
                        onClick={handlePdfSubmit}>
            Upload PDF
        </PrimaryButton>
        </>
        )}
        { docId && ( //if the doc id is there it means user has uploaded pdf and it has been stored in the db//
            <>
                <PrimaryButton size="large" background="#1A1A40" color="#fff" 
                        sx={{ mt: 10 }} 
                        disabled={!docId}
                        onClick={handleSessions}
                        >
            Start Session
        </PrimaryButton>
        </>
        )}
    
        </Box>
        </>

    )
}
export default StarterPage;

