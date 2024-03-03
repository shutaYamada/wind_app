import { Avatar, Box, Button, Link } from '@mui/material'
import React, { useContext } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import DrawerMenu from './DrawerMenu';
import { UserContext } from '../routes/UserContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, setUser,isSignedIn, setIsSignedIn } = useContext(UserContext)
  return (
    <>
    <Box style={{ position: "fixed", width: "100%", zIndex: 9999 }}>
      <AppBar position="sticky" style={{ backgroundColor: "#FFF" }}>
        <Toolbar variant="dense">
          <IconButton
            size='large'
            edge='start'
            aria-label='menu'
            onClick={() => setIsOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Button><NotificationsIcon style={{color:"gray"}} /></Button>
          <Drawer anchor='left' open={isOpen} onClose={() => setIsOpen(false)}>
            <DrawerMenu />
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  </>
  )
}

export default Header
