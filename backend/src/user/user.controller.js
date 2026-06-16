import { fetchUserDetails } from "./user.service.js"; // Import your service function to fetch the username
export const fetchUsername = async (req, res) => {
    try {
        const userDetails = await fetchUserDetails(req.user.id); // Replace with your logic to fetch the username from the database
        res.status(200).json({ userDetails });
    } catch (error) {
        console.error('Error fetching username:', error);
        res.status(500).json({ error: error.message });
    }
};