export const fetchUserDetails = async (userId) => {
    try{
   const userProfile =  await fetchUserFromDatabase(userId);
   if (!userProfile) {
       throw new Error('User not found');
   }
   return userProfile;}
   catch (error) {
       console.error('Error fetching user details:', error);
       throw error;
   }
}