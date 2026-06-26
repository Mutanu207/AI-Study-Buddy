import { useState, useEffect } from "react";
import { fetchUser } from "../serivce/api";

export function useUsername() {
    const [username, setUsername] = useState("");
    const [userEmail, setUserEmail]= useState("")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const data = await fetchUser();
                setUsername(data.username);
                setUserEmail(data.email)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsername();
    }, []);
    return { username, loading, error, userEmail, setUsername};
}
