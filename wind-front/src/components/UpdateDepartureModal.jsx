import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';

const UpdateDepartureModal = ({openEdit, onClose, handleClose, updateDep, departure}) => {
  const [startDateTime, setStartDateTime] = useState(null)
  const [endDateTime, setEndDateTime] = useState(null)
  const [date, setDate] = useState(null)
  const [departureId, setDepartureId] = useState(departure?.id)
  const [formerDate, setFormerDate] = useState(null)
  const [comment, setComment] = useState("")
    console.log(departure?.comment)
  useEffect(() => {
    if (departure) {
        const start = dayjs(departure.start)
        const end = dayjs(departure.end)
        setStartDateTime(start)
        setEndDateTime(end)

        const departureDate = dayjs(departure.startStr);
        const today = dayjs();
        const isToday = departureDate.isSame(today, 'day');
        setFormerDate(isToday ? 'today' : 'tomorrow');
        setDate(isToday ? today : today.add(1, 'day'));

        setComment(departure.comment)
    }
  }, [departure]);
   
  
    const handleRadio = (event) => {
        let today = dayjs()
        let tomorrow = dayjs().add(1, 'day')
      if(event.target.value === "today"){
        setDate(today)
      }
      else{
        setDate(tomorrow)
      }
    }

  const handleStartTime = (timeStart) => {
    console.log(timeStart)
    const timeOnly1 = dayjs(timeStart).set('year', 1970).set('month', 0).set('date', 1);
    const combinedStartTime = dayjs(date).set('hour', timeOnly1.hour()).set('minute', timeOnly1.minute());
    setStartDateTime(combinedStartTime.format());
    
  };

  const handleEndTime = (timeEnd )=> {
    console.log(timeEnd)
    const timeOnly2 = dayjs(timeEnd).set('year', 1970).set('month', 0).set('date', 1);
    const combinedEndTime = dayjs(date).set('hour', timeOnly2.hour()).set('minute', timeOnly2.minute());
    setEndDateTime(combinedEndTime.format());
  }

  const clearCharacter = () => {
    setStartDateTime(null)
    setEndDateTime(null)
    setComment("")
  }

  const style =  {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: '5px',
    width:"80%"
  }

  
  return (
    <Modal
        open={openEdit}
        onClose={onClose}
    >
        <Box sx={style} >
          <div style={{margin: "0px", padding: "0px"}}><button onClick={handleClose} style={{ border: "none", color: "#666666", position: "absolute", right: "0px", top: "0px", padding: "0px" }}  ><CloseIcon /></button></div>
          <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography variant='h4' >{dayjs(date).format("M月D日")}</Typography>
            <Typography variant='h6' >編集</Typography>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"flex-start",width:"100%",my:"20px"}}>
              <RadioGroup 
                row
                onChange={(event)=> handleRadio(event)}
                value={formerDate}
              >
                <FormControlLabel value="today" control={<Radio />} label="今日" />
                <FormControlLabel value="tomorrow" control={<Radio />} label="明日" />
              </RadioGroup>
            </Box>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
              <Typography variant='h7' fontWeight="bold" mb="10px">出艇開始時間</Typography>
              <Box sx={{display:"flex",  alignItems:"center"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    value={dayjs(startDateTime)}
                    onChange={(timeStart) => handleStartTime(timeStart)}
                    ampm={false} 
                  />
                  <Typography variant='h7' sx={{mx:"10px"}}>~</Typography>
                  <TimePicker
                    value={dayjs(endDateTime)} 
                    onChange={(timeEnd) => handleEndTime(timeEnd)}
                    ampm={false} 
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"flex-start",width:"100%",mt:"20px"}}>
              <Typography variant='h7' fontWeight="bold" mb="10px">コメント</Typography>
              <Box width="100%">
                <TextField sx={{width:"100%"}} value={comment} onChange={(event) => setComment(event.target.value)} />
              </Box>
            </Box >
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"flex-start",width:"100%",my:"20px"}}>
              <Typography variant='h7' fontWeight="bold" mb="10px" >イントラ</Typography>
            </Box>
            <Button 
              variant="contained"
              onClick={() => {
                onClose()
                clearCharacter()
                updateDep({startDateTime, endDateTime, comment, departureId})
              }}
            >
              出艇
            </Button>
          </Box>
        </Box>
    </Modal>
  )
}
export default UpdateDepartureModal