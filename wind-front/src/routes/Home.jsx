import React, { useContext } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UserContext  } from './UserContext'
import { Box } from '@mui/material'
const Home = () => {
    const { user } = useContext(UserContext)
    console.log(user)
  return (
    <Box>
        <Header />
        <Footer />
        <h1>出艇数</h1>
        {user && <p>Logged in as: {user.id}</p>}
        {}
    </Box>
  )
}

export default Home
