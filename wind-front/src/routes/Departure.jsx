import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../lib/api/auth'
import Cookies from 'js-cookie'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Avatar, Box, Button, Card, CardHeader, CssBaseline, Grid, Link, ListItem, ListItemAvatar, ListItemText, Modal, Typography,Menu,MenuItem } from '@mui/material'
import { createDeparture, deleteDeparture, getDeparture, updateDeparture } from '../lib/api/departure'
import CreateDepartureModal from '../components/CreateDepartureModal'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import FullCalendar from '@fullcalendar/react'
import jaLocale from '@fullcalendar/core/locales/ja';
import { UserContext } from './UserContext'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateDeparturetModal from '../components/UpdateDepartureModal'



const Departure = () => {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [selectDate, setSelectedDate] = useState(null)
  const [departures, setDepartures] = useState(null)
  const [userResources, setUserResources] = useState(null)
  const { user, setUser,isSignedIn, setIsSignedIn } = useContext(UserContext)
  const [selectedEventUserId, setSelectedEventUserId] = useState(null)
  const [selectedDeparture, setSelectedDeparture] = useState(null)
  const [menuAnchorEI, setMenuAnchorEI] = useState(null)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setOpenEdit(false)
  }
  const handleMenuClose =() => {
    setMenuAnchorEI(null)
    setSelectedDeparture(null)
  }
  console.log(departures)
  console.log(userResources)
  console.log(selectedDeparture)

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
        comment: departureEvent.comment,
        backgroundColor: '#3EA8FF',
        resourceId: departureEvent.user.id,
        extendedProps: {
          userId: departureEvent.user.id 
        }
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

  const editHandler = async (departure) => {
    setOpenEdit(true)
    setSelectedDeparture(departure)
  }

  const deleteHandler = async (departureId) => {
    try {
      console.log(departureId)
      await deleteDeparture(departureId)
    } catch(err){
      console.log(err)
    }
    getEvents()
  }

  useEffect(() => {
    getEvents();
  }, []);

  const updateDep = async (event) => {
    console.log(event)
    await updateDeparture({
      start_time: event.startDateTime,
      end_time: event. endDateTime,
      comment: event.comment,
      id: event.departureId
    })
    getEvents()
  }

  // departuresがnullの場合はローディングメッセージを表示
  if (departures === null) {
    return <div>Loading...</div>;
  }

  const  showMenu = () => {
    if(selectedEventUserId === user.id){
      return(
        <Menu
          anchorEl={menuAnchorEI}
          open={Boolean(menuAnchorEI) && selectedDeparture}
          onClose={handleMenuClose}
        >
          <MenuItem key="edit" onClick={()=> editHandler(selectedDeparture)}>
          <EditIcon />
            編集
          </MenuItem>
          <MenuItem key="delte" onClick={()=> deleteHandler(selectedDeparture.id)} >
            <DeleteIcon />
            削除
          </MenuItem>
        </Menu>
      )
    }
  }
  

  return (
    <Box  height="100vh" bgcolor="#F9F9F6"> 
      <Header />
      <div style={{ height: '60px' }} />
      <Box display="flex" justifyContent="center">
        <Box width="100%">
          <FullCalendar
            plugins={[ resourceTimelinePlugin ]}
            initialView='resourceTimelineDay'
            locale={jaLocale}
            resourceAreaHeaderContent="出艇者"
            events={departures}
            resources={userResources}
            slotMinTime="06:00:00" 
            slotMaxTime="18:00:00" 
            eventClick={(info) => {
              const userId = info.event.extendedProps.userId;
              const departure = info.event
              setSelectedEventUserId(userId)
              setSelectedDeparture(departure)
              setMenuAnchorEI(info.el)
              
            }}
          />
        </Box>
      </Box>
      <Box textAlign="center" marginTop="20px">
        <Button variant='contained' style={{ backgroundColor: "gray" }} onClick={handleOpen}>
          出艇する
        </Button>
      </Box>
      <Box>
        {showMenu()}
      </Box>

      <Footer />
      <CreateDepartureModal open={open} onClose={handleClose} handleClose={handleClose} createDep={createDep} />
      <UpdateDeparturetModal openEdit={openEdit} handleClose={handleClose} onClose={handleClose} updateDep={updateDep} departure={selectedDeparture} />
    </Box>
  )
}

export default Departure
