import { Box, Button, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import interaction from '@fullcalendar/interaction'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import CreateEventModal from '../components/CreateEventModal'
import { createCalendarEvent, deleteCalendarEvent, getCalendarEvents, showCalendarEvent, updateCalendarEvent } from '../lib/api/calendarEvent'
import { getUser } from '../lib/api/auth'
import { useNavigate } from 'react-router-dom'
import { UpdateEventModal } from '../components/UpdateEventModal'
import CheckIcon from '@mui/icons-material/Check';
import { UserContext } from './UserContext'

const Calendar = () => {
  const [eventId, setEventId] = useState("")
  const [events, setEvents] = useState()
  const [updateTitle, setUpdateTitle] = useState("")
  const [updateDescription,setUpdateDescription] = useState("")
  const [updateStartDate,setUpdateStartDate] = useState("")
  const [updateEndDate, setUpdateEndDate] = useState("")
  const [updateIsAbsence,setUpdateIsAbsence] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [date, setDate] = useState("")
  const { user } = useContext(UserContext)


  const navigate = useNavigate();

  
  
  const handleDateSelect = async (selectInfo) => {
    console.log(selectInfo.start)
    setDate(selectInfo.start)
    const selectedDate = new Date(selectInfo.startStr);
    const eventOnSelectedDate = events.find(event => {
      const eventStartDate = new Date(event.start);
      const eventEndDate = new Date(event.end);
      return selectedDate.setHours(0,0,0,0) >= eventStartDate.setHours(0,0,0,0) && selectedDate.setHours(0,0,0,0) <= eventEndDate.setHours(0,0,0,0);
    });
    console.log(eventOnSelectedDate)
    if (eventOnSelectedDate) {
      const res = await handleGetDetail(eventOnSelectedDate.eventId);
      setSelectedEvent(res);
    } else {
      setSelectedEvent({ title: '予定はありません' });
    }
}
  const [open, setOpen] = useState(false)

  const handleOpen = () =>{
    setOpen(true)
  }

  const handleClose = ( ) => {
    setOpen(false)
  }

  const createCalendar = async (event) => {
    await createCalendarEvent({
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        isAbsence: event.isAbsence,
    })
    await getEvents()
  }

  const getEvents = async () =>  {
    try {
      const res = await getCalendarEvents()
      const calendarEvents = res.data.map((calendarEvent) => {
        return{
          eventId: calendarEvent.id,
          title: calendarEvent.title,
          description: calendarEvent.description,
          start: calendarEvent.startDate,
          end: calendarEvent.endDate,
          isAbsence: calendarEvent.isAbsence,
          backgroundColor: calendarEvent  .isAbsence ? '#FF8FA3' : '#3888D8', // Add this line

        }
      })
      setEvents(calendarEvents)
      
    } catch (event){
      console.log(event)
    }
  }

  

  useEffect(() => {
    const f = async () => {
      try {
        const today = new Date();
        const todayEvent = events.find(event => {
          const eventStartDate = new Date(event.start);
          const eventEndDate = new Date(event.end);
          return today >= eventStartDate && today <= eventEndDate;

        });
        if (todayEvent) {
          const res = await handleGetDetail(todayEvent.eventId);
          setSelectedEvent(res);
        } else {
          setSelectedEvent({ title: '予定はありません' });
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (events) {
      f();
    }
  }, [events]);
  

  const updateEvent = async (event) => {
    await updateCalendarEvent({
      calendarEventId: event.updateEventId,
      title: event.updateTitle,
      description: event.updateDescription,
      startDate: event.updateStartDate,
      endDate: event.updateEndDate,
      isAbsence: event.isAbsence,
    });
    await getEvents();
  };

  const handleGetDetail = async (id) => {
    try {
      const res = await showCalendarEvent(id);
      if (res && res.data) {
        console.log(res.data)
        return res.data;
      } else {
        console.error("Failed to fetch event detail");

      }
    } catch (error) {
      console.error("Failed to fetch event detail:", error);
    }
  }


  useEffect(() => {
    const f = async () => {
      try {
        const getUserRes = await getUser();
        
        if (!getUserRes.data.isLogin) {
          navigate("/");
        }
        if (!events) {
          await getEvents();
        }
        const today = new Date();
        setDate((today.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })));
        const todayEvent = events.find(event => {
          const eventStartDate = new Date(event.start);
          const eventEndDate = new Date(event.end);
          return today.setHours(23,59,59,999) >= eventStartDate.setHours(0,0,0,0) && today.setHours(23,59,59,999) <= eventEndDate.setHours(23,59,59,999);
        });
        if (todayEvent) {
          const res = await handleGetDetail(todayEvent.eventId);
          setSelectedEvent(res);
        } else {
          setSelectedEvent({ title: '予定はありません' });
        }
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, []);

  const deleteHandler = async () => {
    try {
      await deleteCalendarEvent(selectedEvent.id)
      await getEvents()
  } catch(error){
      console.log(error)
  }
  
  }

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b style={{ color: eventInfo.event.backgroundColor, fontSize:"10px"  }}>●</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  return (
    <Box>
      <Header />
      <Box>
        <div style={{ height: '60px' }} />
        <FullCalendar
            plugins={[dayGridPlugin, interaction]}
            initialView="dayGridMonth"
            locales={[jaLocale]}
            selectable={true}
            locale="ja"
            select={handleDateSelect}
            editable={true}
            height="50vh"
            events={events} 
            eventContent={renderEventContent}
          />
          
      </Box>
      
      <Box height="50vh">
        <Typography variant='h6' bgcolor="#EEF5FF" border="1px solid #F0F0F0" >{new Date(date).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}</Typography>
        <Typography variant='h5'  border="1px solid #F0F0F0">{selectedEvent && selectedEvent.title ? `Title: ${selectedEvent.title}` : ''}</Typography>
        <Typography variant='h5'  border="1px solid #F0F0F0">{selectedEvent && selectedEvent.description ? `Description: ${selectedEvent.description}` : ''}</Typography>
        <Typography variant='h5'  border="1px solid #F0F0F0" >
          {selectedEvent && selectedEvent.isAbsence ?  <><CheckIcon />欠席連絡</> : ''}
        </Typography>
        {selectedEvent && user.id === selectedEvent.userId && <Button variant="contained" color='error' onClick={deleteHandler}>予定を削除する</Button>}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt:"20px" }}>
      <Button variant="contained" onClick={handleOpen}>予定を追加</Button>
      </Box>
      {/* <Footer /> */}
      <CreateEventModal open={open} onClose={handleClose} handleClose={handleClose} createCalendar={createCalendar} />
      <UpdateEventModal
        onClose={onclose}
        updateEvent={updateEvent}
        setUpdateTitle={setUpdateTitle}
        setUpdateDescription={setUpdateDescription}
        setUpdateStartDate={setUpdateStartDate}
        setUpdateEndDate={setUpdateEndDate}
        updateEventId={eventId}
        updateTitle={updateTitle}
        updateDescription={updateDescription}
        updateStartDate={updateStartDate}
        updateEndDate={updateEndDate}
      />

    </Box>
  )
}

export default Calendar;