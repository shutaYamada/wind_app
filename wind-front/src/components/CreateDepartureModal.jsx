import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';

const CreateDepartureModal = ({open, onClose, handleClose, createDep}) => {
  const [startDateTime, setstartDateTime] = useState(null)
  const [endDateTime, setEndDateTime] = useState(null)
  const [date, setDate] = useState()
  const [comment, setComment] = useState("")

    // 今日の月と日にち
    let today = dayjs()
    // 明日の月と日にち
    let tomorrow = dayjs().add(1, 'day');
   
  
    const handleRadio = (event) => {
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
    setstartDateTime(combinedStartTime.format());
    
  };

  const handleEndTime = (timeEnd )=> {
    console.log(timeEnd)
    const timeOnly2 = dayjs(timeEnd).set('year', 1970).set('month', 0).set('date', 1);
    const combinedEndTime = dayjs(date).set('hour', timeOnly2.hour()).set('minute', timeOnly2.minute());
    setEndDateTime(combinedEndTime.format());
  }

  const clearCharacter = () => {
    setstartDateTime(null)
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
        open={open}
        onClose={onClose}
    >
        <Box sx={style} >
          <div style={{margin: "0px", padding: "0px"}}><button onClick={handleClose} style={{ border: "none", color: "#666666", position: "absolute", right: "0px", top: "0px", padding: "0px" }}  ><CloseIcon /></button></div>
          <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography variant='h4' >{dayjs(date).format("M月D日")}</Typography>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"flex-start",width:"100%",my:"20px"}}>
              <RadioGroup 
                row
                onChange={(event)=> handleRadio(event)}
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
                <TextField sx={{width:"100%"}} onChange={(event) => setComment(event.target.value)} />
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
                createDep({startDateTime, endDateTime, comment})
              }}
            >
              出艇
            </Button>
          </Box>
        </Box>
    </Modal>
  )
}

export default CreateDepartureModal
