import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useUsername } from "../hooks/useUsername";
import Navbar from "../Components/Navbar";
function Sessions(){
        const { username } = useUsername();
    return(
        <>
        <Navbar user={username} />
        <Box>
            <p>
                Hey this is the Sessions page
            </p>
        </Box>
        </>
    )
}
export default Sessions