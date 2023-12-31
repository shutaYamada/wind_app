import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../lib/api/auth'
import Cookies from 'js-cookie'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Box, Button, Card, CardHeader, CssBaseline, Grid, Link, Modal, Typography } from '@mui/material'
import { createDeparture, getDeparture } from '../lib/api/departure'
import CreateDepartureModal from '../components/CreateDepartureModal'
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs'


const Departure = () => {
  const [open, setOpen] = useState(false)
  const [selectDate, setSelectedDate] = useState(null)
  // 今日の月と日にち
  let today = dayjs()
  let todayMonth = today.month() + 1; 
  let todayDate = today.date()

  // 明日の月と日にち
  let tomorrow = dayjs().add(1, 'day');
  let tomorrowMonth = tomorrow.month() + 1;
  let tomorrowDate = tomorrow.date();

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Box bgcolor="#F5F5F5" height="100vh">
    
      
      <Header />
      <div style={{ height: '60px' }} />
        <Grid>
          <Box textAlign="center" bgcolor="white" width="50%" marginX="auto" mb="20px" p="15px">
            <Box display="flex" justifyContent="center" alignItems="center" >
              <Typography variant='h5'>{todayMonth}月{todayDate}日</Typography>
              <Button 
                variant="contained" sx={{marginLeft:3}} 
                onClick={() => {handleOpen(); setSelectedDate(today); console.log(selectDate)}}
              >
                出艇する
              </Button>
            </Box>
            <Box>
              <p>出艇者はいません</p>
            </Box>
          </Box>
          <Box textAlign="center" bgcolor="white" width="50%" marginX="auto"mb="20px"p="15px" >
            <Box display="flex" justifyContent="center" alignItems="center" >
              <Typography variant='h5'>{tomorrowMonth}月{tomorrowDate}日</Typography>
              <Button 
                variant="contained" sx={{marginLeft:3}}
                onClick={() => {handleOpen(); setSelectedDate(tomorrow); console.log(selectDate)}}
              > 
                出艇する
              </Button>
            </Box>
            <Box>
              <p>出艇者はいません</p>
            </Box>
          </Box>
        </Grid>
        

      <Footer />
      <CreateDepartureModal open={open} onClose={handleClose} handleClose={handleClose} selectDate={selectDate} />
    </Box>
  )
}

export default Departure
