import { useEffect, useState } from "react";
import { userQuestions } from "../serivce/api.js";

export function useFetchQuestions(sessionId) {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const sessionQuestions = async () => {
            try {
                const data = await userQuestions(sessionId);
                setQuestions(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        sessionQuestions();
    }, [sessionId]); //when session id changes the questions are fetched again

    return {
        questions,
        loading,
        error
    };
}