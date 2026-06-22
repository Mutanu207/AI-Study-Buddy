import Typography from "@mui/material/Typography";
import  Navbar  from "../Components/Navbar";
import {useState} from "react";
import { useDropzone } from 'react-dropzone';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PrimaryButton from "../Components/PrimaryButton";
import { useUsername } from "../hooks/useUsername";
import { uploadPdf } from "../serivce/api";

function StarterPage() {
    const [files, setFiles] = useState(null);
    const [docId, setDocId]= useState(null)
    const { username, loading } = useUsername();
    const onDrop = (acceptedFiles) => {
        setFiles(acceptedFiles[0]);
    }

    const {getRootProps, getInputProps, isDragActive} = 
    useDropzone({onDrop,
                    accept:{'application/pdf': ['.pdf']},
                    multiple: false});
    
    const handlePdfSubmit= async ()=> {
        if(!files) {
            return alert("Input PDF")
        }
        try{
        const response= await uploadPdf(files)     
        setDocId(response.id)   
        if(docId) setFiles(null)}
       catch(error){
        console.error(error)
    }}

    if (loading) return  <Typography variant="h6" align="center" sx={{ mt: 4 }}>Loading...</Typography>;
   
    return(
        <> 
        <Navbar user={username} /> 
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
            {!docId &&(
                <>
        <Button variant="contained" 
                color="error" 
                disabled={!files}
                sx={{ mt: 4, mb: 2 }}  
                onClick={() => setFiles(null)}>
            Remove File
        </Button>
        <PrimaryButton size="large" background="#1A1A40" color="#fff" 
                        sx={{ mt: 4 }} 
                        disabled={!files}
                        onClick={handlePdfSubmit}>
            Upload PDF
        </PrimaryButton>
        </>
        )}
        { docId && (
            <>
                <PrimaryButton size="large" background="#1A1A40" color="#fff" 
                        sx={{ mt: 10 }} 
                        disabled={!docId}
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

