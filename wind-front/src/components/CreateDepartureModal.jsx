import { Box, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';

const CreateDepartureModal = ({open, onClose, handleClose,selectDate}) => {
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [date, setDate] = useState(null)
  const [comment, setComment] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  
  useEffect(() => {
    console.log(dayjs(selectDate).format())
    setDate(selectDate)
  }, [selectDate]);
  const style =  {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: '5px'
  }
    console.log(startTime,endTime)
  return (
    <Modal
        open={open}
        onClose={onClose}
    >
        <Box sx={style} >
          <div style={{margin: "0px", padding: "0px"}}><button onClick={handleClose} style={{ border: "none", color: "#666666", position: "absolute", right: "0px", top: "0px", padding: "0px" }}  ><CloseIcon /></button></div>
          <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Typography variant='h4' >{dayjs(date).format("M月D日")}</Typography>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
              <Typography variant='h7' fontWeight="bold" mb="10px">出艇開始時間</Typography>
              <Box sx={{display:"flex",  alignItems:"center"}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    value={startTime ? dayjs(startTime).format('HH:mm') : null} 
                    onChange={(newTime) => setStartTime(dayjs(newTime).format('HH:mm'))}
                    ampm={false} 
                  />
                  <Typography variant='h7' sx={{mx:"10px"}}>~</Typography>
                  <TimePicker
                    value={endTime ? dayjs(endTime).format('HH:mm') : null} 
                    onChange={(newTime) => setEndTime(dayjs(newTime).format('HH:mm'))}
                    ampm={false} 
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"flex-start",width:"100%",mt:"20px"}}>
              <Typography variant='h7' fontWeight="bold" mb="10px">コメント</Typography>
              <Box width="100%">
                <TextField sx={{width:"100%"}} />
              </Box>
            </Box>
          </Box>
        </Box>
    </Modal>
  )
}

export default CreateDepartureModal
