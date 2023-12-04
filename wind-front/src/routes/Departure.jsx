import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../lib/api/auth'
import Cookies from 'js-cookie'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Box } from '@mui/material'

const Departure = () => {
    
  return (
    <Box>
      <Header />
      <Footer />
    </Box>
  )
}

export default Departure
