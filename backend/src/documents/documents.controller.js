import { uploadDocument } from "./documents.service.js"
export const uploadPdf= async(req,res) => {
    try{
        const userId= req.user.id
        const fileName= req.file.originalname
        const filePath=req.file.path
        const docId = await uploadDocument(userId,fileName,filePath)
        res.status(200).json({message:"Document uploaded successfully", docId})
}
    
    catch(error){
        if (error.code === "LIMIT_FILE_SIZE") {

        return res.status(400).json({

        message: "PDF must be smaller than 10 MB."

        });}
        else{
            res.status(500).json({ message: error.message });
        }

}} // the if block error is from multer, if there is an error it wont send req.file to controller it will send the error 