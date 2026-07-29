import axios from "axios";
export const sendToFastApi = async (session_id,file_path) => {
    try {

        const response = await axios.post(
            "http://localhost:8000/generate",
            {session_id,file_path}
        );
        console.log(response.data);
        return response.data;

    } catch (error) {

    console.log("============== AXIOS ERROR ==============");

    console.log("Message:", error.message);

    console.log("Code:", error.code);

    console.log("Status:", error.response?.status);

    console.log("Response:", error.response?.data);

    console.log("Full Error:", error);

    throw error;

        //throw new Error(error.response?.data?.detail || error.message);

    }
};
    
