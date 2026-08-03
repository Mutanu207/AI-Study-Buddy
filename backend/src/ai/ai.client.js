import axios from "axios";
export const sendDocumentToFastApi = async (session_id,file_path) => {
    try {

        const response = await axios.post(
            "http://localhost:8000/generate",
            {session_id,file_path}
        );
        console.log(response.data);
        return response.data;

    } catch (error) {
        throw new Error(error.response?.data?.detail || error.message);

    }
};
export const sendAnswersToFastApi = async (payload) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/evaluate",
            payload //Send request to this api route to python server we receive the feedback from the python server and send it back to the answers controller
        );
        console.log(response.data);
        return response.data; //return feedback
    } catch (error) {
        throw new Error(error.response?.data?.detail || error.message);
    }
}
    
