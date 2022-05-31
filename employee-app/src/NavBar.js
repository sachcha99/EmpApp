import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = ({ user }) => {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true)
    }
  }, [user]);

  return (
    <div>
      <AppBar sx={{ bgcolor: "#61bcc0", zIndex: 10000 }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black' }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              Employee App
            </Typography>
            <div style={{}}>
              <Button onClick={() => { navigate(`/`) }} variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Arial' }}>
                Home
              </Button>
              <Button onClick={() => { navigate(`/employee`) }} variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Arial' }}>
                Employee Details
              </Button>
            </div>
            <Box sx={{ ml: 'auto', flexGrow: 0 }}>
              <div>
                {!isLoggedIn ?
                  <Button onClick={() => { navigate(`login`) }} color="inherit" >Login <LoginIcon /> </Button>
                  :
                  <Button onClick={() => { sessionStorage.removeItem('user'); window.location.reload() }} color="inherit" >Logout <LogoutIcon /> </Button>
                }
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default NavBar