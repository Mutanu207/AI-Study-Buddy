import { useEffect, useState } from "react";
import { fetchSession } from "../service/api.js";

export function useFetchSession() {
    const [session, setSession] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const sessionPage = async () => {
            try {
                const data = await fetchSession();
                console.log("Fetched session data:", data);
                setSession(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        sessionPage();
    }, []); //when session id changes the questions are fetched again

    return {
        session,
        loading,
        error
    };
}