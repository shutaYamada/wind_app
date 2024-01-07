import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../lib/api/auth'
import Cookies from 'js-cookie'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Avatar, Box, Button, Card, CardHeader, CssBaseline, Grid, Link, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from '@mui/material'
import { createDeparture, getDeparture } from '../lib/api/departure'
import CreateDepartureModal from '../components/CreateDepartureModal'

import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import FullCalendar from '@fullcalendar/react'
import jaLocale from '@fullcalendar/core/locales/ja';




const Departure = () => {
  const [open, setOpen] = useState(false)
  const [selectDate, setSelectedDate] = useState(null)
  const [departures, setDepartures] = useState(null)
  const [userResources, setUserResources] = useState(null)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const createDep = async (event) => {
    await createDeparture({
      start_time: event.startDateTime,
      end_time: event. endDateTime,
      comment: event.comment
    })
    getEvents()
  }

  const getEvents = async () => {
    try{
    const res = await getDeparture()
    const departureEvents = res.data.map((departureEvent) => {
      return{
        id: departureEvent.id,
        title:departureEvent.user.name,
        start: departureEvent.startTime,
        end: departureEvent.endTime,
        backgroundColor: '#1B76D2',
        resourceId: departureEvent.user.id
      }
    })
    const userInfo = res.data.map((departureEvent) => {
      return {
        id: departureEvent.user.id,
        title: departureEvent.user.name
      };
    });
    setDepartures(departureEvents)
    setUserResources(userInfo)
    console.log(departures)
  } catch (event){
    console.log(event)
  }
  }


  

  useEffect(() => {
    getEvents();
  }, []);

  

  // departuresがnullの場合はローディングメッセージを表示
  if (departures === null) {
    return <div>Loading...</div>;
  }
  

  return (
    <Box  height="100vh">
      <Header />
      <div style={{ height: '60px' }} />
        

      <FullCalendar
        plugins={[ resourceTimelinePlugin ]}
        initialView='resourceTimelineDay'
        locale={jaLocale}
        resourceAreaHeaderContent="出艇者"
        events={departures}
        resources={userResources}
        slotMinTime="06:00:00" 
        slotMaxTime="18:00:00" 
      />
      <Button variant='contained' onClick={()=> handleOpen()}>出艇する</Button>
        

      <Footer />
      <CreateDepartureModal open={open} onClose={handleClose} handleClose={handleClose} createDep={createDep} />
    </Box>
  )
}

export default Departure
