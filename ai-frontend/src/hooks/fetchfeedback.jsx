import { useEffect, useState } from "react";
import { fetchFeedback } from "../service/api.js";

export function useFetchFeedback(sessionId) {
    const [feedback, setfeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const sessionFeedback = async () => {
            try {
                const data = await fetchFeedback(sessionId);
                console.log(data)
                setfeedback(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        sessionFeedback();
    }, [sessionId]); //when session id changes the questions are fetched again

    return {
        feedback,
        loading,
        error
    };
}