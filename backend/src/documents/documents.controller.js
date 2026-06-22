import { uploadDocument } from "./documents.service.js"
export const uploadPdf= async(req,res) => {
    try{
        const userId= req.user.id
        const fileName= req.file.originalname
        const filePath=req.file.path
        const docId = await uploadDocument(userId,fileName,filePath)
        res.status(200).json(docId)
    } 
    catch(error){
        res.json({ message: error.message });
        console.error(error)
    }

}