import React, { useEffect } from 'react'
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
import { UserContext } from '../routes/UserContext'
import { useContext } from 'react'

const DrawerMenu = () => {
  const { user, setUser,isSignedIn, setIsSignedIn } = useContext(UserContext)
  console.log(user)
    const navigate = useNavigate()
    const logOut = async () => {
        try {
            const res = await signOut()
      
            if (res.data.success === true) {
              // サインアウト時には各Cookieを削除
              Cookies.remove("_access_token")
              Cookies.remove("_client")
              Cookies.remove("_uid")

              setUser(null)
              setIsSignedIn(false)
              navigate("/")
      
              console.log("Succeeded in sign out")
            } else {
              console.log("Failed in sign out")
            }
          } catch (err) {
            console.log(err)
          }
    }

    let menuList =  [ 
      { text: 'メンバー一覧', path: '/userAll' }, 
      { text: 'マイペ', path: '/mypage' }, 
      { text: '出艇', path: '/departure' }, 
      { text: 'ノート', path: '/windNote' }, 
      { text: 'カレンダー', path: '/calendar' }, 
      { text: 'メンバー一覧', path: '/userAll' }, 
    ]
    if (isSignedIn) {
      menuList.push({ text: 'ログアウト', path: '/', action: logOut });
    } else {
      menuList.push({ text: 'ログイン', path: '/login' });
      menuList.push({ text: 'ユーザー登録', path: '/signUp' });
    }
    
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