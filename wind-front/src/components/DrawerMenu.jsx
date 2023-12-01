import React from 'react'
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
  } from '@mui/material'
import Cookies from 'js-cookie'
import { useNavigate, Link } from 'react-router-dom'
import { signOut } from '../lib/api/auth'

const DrawerMenu = () => {
    const navigate = useNavigate()
    const logOut = async () => {
        try {
            const res = await signOut()
      
            if (res.data.success === true) {
              // サインアウト時には各Cookieを削除
              Cookies.remove("_access_token")
              Cookies.remove("_client")
              Cookies.remove("_uid")
            
              navigate("/")
      
              console.log("Succeeded in sign out")
            } else {
              console.log("Failed in sign out")
            }
          } catch (err) {
            console.log(err)
          }
    }

    const menuList = [ 
      { text: 'ホーム', path: '/home' }, 
      { text: 'マイペ', path: '/mypage' }, 
      { text: '出艇', path: '/departure' }, 
      { text: 'ノート', path: '/windNote' }, 
      { text: 'カレンダー', path: '/calendar' }, 
      { text: 'ログアウト', path: '/', action: logOut }
    ]

  return (
    <Box
      role='presentation'
      onClick={() => {}}
      onKeyDown={() => {}}
    >
      <List>
        {menuList.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path} onClick={item.action ? item.action : undefined}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default DrawerMenu