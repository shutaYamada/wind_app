import { Box, Link } from '@mui/material'
import React from 'react';
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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    // <div style={{backgroundColor: "#081146", padding: "20px 40px 20px"}}>
    //     <ul style={{listStyle: "none", display: "flex", margin: "0", padding: "0", justifyContent: "space-between", flexDirection: "row"}} >
    //         <li><HomeOutlinedIcon  /><Link>ホーム</Link></li>
    //         <li><Link>出艇</Link></li>
    //         <li><Link>カレンダー</Link></li>
    //         <li><Link>ノート</Link></li>
    //     </ul>
    // </div>
  <>
     
    <Box style={{position: "fixed", width: "100%",zIndex:9999}  }>
    <AppBar position="sticky" style={{backgroundColor:"#DDB786"}}>
        <Toolbar variant="dense">
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={() => setIsOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
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
