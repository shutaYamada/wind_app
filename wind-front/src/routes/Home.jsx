import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UserContext  } from './UserContext'
import { Box, Typography } from '@mui/material'
import { getDeparture } from '../lib/api/departure'
const Home = () => {
  const { user, setUser,isSignedIn, setIsSignedIn } = useContext(UserContext)
  const [departures, setDepartures] = useState([])
  console.log(user)
  console.log(isSignedIn)
  
  const getEvents = async () => {
    try {
      const res = await getDeparture();
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 日付のみを比較するために時刻をリセット
  
      const departureEvents = res.data
        .filter((departureEvent) => {
          const eventDate = new Date(departureEvent.startTime);
          eventDate.setHours(0, 0, 0, 0); // 時刻をリセット
          return eventDate.getTime() === today.getTime(); // 今日の日付と同じかどうかをチェック
        })
        .map((departureEvent) => {
          return {
            id: departureEvent.id,
            title: departureEvent.user.name,
            start: departureEvent.startTime,
            end: departureEvent.endTime,
          };
        });
  
      setDepartures(departureEvents);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getEvents();
  }, []);

  console.log(departures)
  return (
    <Box bgcolor="#F9F9F6" height="100vh">
        <Header />
        <Footer />
        <div style={{height:"60px"}} />
      <Box textAlign="center">
        <Typography variant='h4' color="#666666">本日の出艇者</Typography>
        {departures.map((departure, index) => {
            return(
              <>
                <Typography variant='p' >{departure.title}</Typography>
              </>
            )
        })}
      </Box>
    </Box>
  )
}

export default Home
