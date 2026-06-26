import { fetchUserFromDatabase, updateUser } from  './user.model.js';
export const fetchUserDetails = async (userId) => {
    try{
   const userProfile =  await fetchUserFromDatabase(userId);
   if (!userProfile) {
       throw new Error('User not found');
   }
   return {email: userProfile.email, username: userProfile.user_name} }
   catch (error) {
       console.error('Error fetching user details:', error);
       throw error;
   }
}

export const profileUpdate = async(userId, username) => {
    try{
        const updatedUsername = await updateUser(userId,username)
        return {newUsername:updatedUsername.user_name}
    }
    catch (error) {
       console.error('Error fetching user details:', error);
       throw error;
   }
   
}