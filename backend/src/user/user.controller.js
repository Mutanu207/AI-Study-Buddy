import { fetchUserDetails,profileUpdate } from "./user.service.js"; // Import your service function to fetch the username
export const fetchUsername = async (req, res) => {
    try {
        const userDetails = await fetchUserDetails(req.user.id); // Replace with your logic to fetch the username from the database
        res.status(200).json( userDetails );
    } catch (error) {
        console.error('Error fetching username:', error);
        res.status(500).json({ error: error.message });
    }
};
export const updateProfile = async (req,res) => {
    try{
        const userid= req.user.id
        const {editUsername}= req.body
        const normalizedUsername=editUsername.trim()
       if(!normalizedUsername){
        return res.status(400).json({message:"Username can not be empty"})}
        const updatedName= await profileUpdate(userid,normalizedUsername)
        res.status(200).json({message:"Username updated succesfully", updatedName})
       }
    
    catch (error) {
        console.error('Error fetching username:', error);
        res.status(500).json({ error: error.message });
    }
}