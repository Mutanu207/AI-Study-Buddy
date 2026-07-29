import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navbar from "../Components/Navbar";
import { useUsername } from "../hooks/useUsername";
function Dashboard(){
        const { username } = useUsername();
    return(
        <>
        <Navbar user={username} />
        <Box>
            <p>
                Hey this is the Dashboard
            </p>
        </Box>
        </>
    )
}
export default Dashboard