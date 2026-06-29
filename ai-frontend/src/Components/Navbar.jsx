import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { updateUsername, logoutCurrentUser } from '../serivce/api';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const pages = [
  { name: "Home", path: "/starter" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Sessions", path: "/sessions" },
  { name: "About", path: "/about" }
];
const settings = ['Profile', 'Logout' , 'Delete Account'];

function Navbar(props) {
  //use states
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen]= React.useState(false)
  const [deleteText, setDeleteText]= useState("")
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [editUsername, setEditUsername] = React.useState("");
  const [notification, setNotification] = useState({
    open:false,
    message:"",
    severity:"sucess"
  })
  
  
  //functions
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handleSettingClick = (setting) => {
  handleCloseUserMenu();
  if (setting === "Logout") {
    setLogoutOpen(true);
  }
  if(setting == "Delete Account"){
    setDeleteOpen(true) // this state when true opens the delete dialog box, set it at false first//
  }
  if (setting === "Profile") {
    setEditUsername(props.user || "");
    setProfileOpen(true);
}};
 
const handleProfileUpdate = async () => {
  try{
    const response = await updateUsername(editUsername)
    props.updateUsername(response.updatedName.newUsername)// name was not appering because i was not picking the json data correctly//
     setProfileOpen(false);
    setNotification({
        open:true,
        message:response.message,
        severity:"success"
      });
  }
  catch(error){
    setNotification({
        open:true, 
        message:error.response?.data?.message || "Username update failed",
        severity:"error"
      })
    console.error(error)
  } }
//function to call the api that logs out the user
  const logoutUser = async () => {
    try{
      const result = await logoutCurrentUser()
      localStorage.removeItem("token");
      setNotification({
        open:true,
        message:result.message,
        severity:"success"
      });
      setTimeout(()=>{
        navigate("/login")
      },1000)
    }
     catch(error){
      setNotification({
        open:true, 
        message:error.response?.data?.message || "Logout Failed",
        severity:"error"
      })
    console.error(error)
  }
  }

  return (
    <>
    <AppBar position="static" sx={{ backgroundColor: '#1A1A40' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Playfair Display, serif',
              fontWeight: 'bold',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AI STUDY BUDDY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
             {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => {
                                          navigate(page.path);
                                          handleCloseNavMenu();
                                                            }}>
                  <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AI STUDY BUDDY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                          navigate(page.path);
                          handleCloseNavMenu();
                            }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>{props.user?.charAt(0) || "U"}</Avatar>  
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem  key={setting}
                            onClick={() => handleSettingClick(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Dialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
      >
    <DialogTitle>
    Logout
    </DialogTitle>

    <DialogContent>
    Are you sure you want to logout?
    </DialogContent>

    <DialogActions>

    <Button
      onClick={() => setLogoutOpen(false)}
    >
      Cancel
    </Button>

    <Button
      color="error"
      onClick= {logoutUser}
    >
      Logout
    </Button>

  </DialogActions>
  </Dialog>
  
  <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      >
    <DialogTitle>
    Delete Account
    </DialogTitle>

    <DialogContent>
      <Typography color="error"> Are you sure you want to Delete your account? All progress will be lost.</Typography>
    
    </DialogContent>

    <DialogActions>
      <label>Type <span style={{fontWeight: "bold"}}>Delete</span> in the textbox</label>
      <TextField id="outlined-basic" label=" Account Delete Confirmation" variant="outlined" value={deleteText}
      fullWidth margin="normal" placeholder="Delete"
                    onChange={(event)=>{setDeleteText(event.target.value)}}
                    />

    <Button
      onClick={() => setDeleteOpen(false)}
    >
      Cancel
    </Button>
    <Button
  color="error"
  disabled={deleteText !== "Delete"}
    >
  Delete
  </Button>
  </DialogActions>
  </Dialog>

  <Dialog
  open={profileOpen}
  onClose={() => setProfileOpen(false)}
>
  <DialogTitle>
    Update Profile
  </DialogTitle>

  <DialogContent>
    <Typography>Email: {props.email} </Typography>

    <TextField
      label="Username"
      fullWidth
      margin="normal"
      value={editUsername}
      onChange={(event) => {
        setEditUsername(event.target.value);
      }}
    />

  </DialogContent>

  <DialogActions>

    <Button
      onClick={() => setProfileOpen(false)}
    >
      Cancel
    </Button>

    <Button
      disabled={!editUsername.trim()}
      onClick={handleProfileUpdate}
    >
      Update
    </Button>

  </DialogActions>

</Dialog>

<Snackbar
           open={notification.open}
           autoHideDuration={3000}
           onClose={() => setNotification(prev => ({ ...prev, open: false }))}
           anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
       >
           <Alert
               severity={
                   notification.severity
               }
               variant="filled">
           
               {notification.message} 
           </Alert>
       </Snackbar>
</>
  );
}
export default Navbar;
