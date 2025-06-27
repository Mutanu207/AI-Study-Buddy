import axios from "axios";
export const sendToFastApi = async (session_id,document_id,file_path) => {
    try {

        const response = await axios.post(
            "http://localhost:8000/generate",
            {session_id,document_id,file_path}
        );

        return response.data;

    } catch (error) {

        throw new Error(error.response?.data?.detail || error.message);

    }
};
    
