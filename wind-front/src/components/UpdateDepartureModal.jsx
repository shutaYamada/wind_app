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
  const [departureId, setDepartureId] = useState(null)
  const [formerDate, setFormerDate] = useState(null)
  const [comment, setComment] = useState("")
    console.log(departureId)
  useEffect(() => {
    if (departure) {
        const start = dayjs(departure.start)
        const end = dayjs(departure.end)
        setStartDateTime(start)
        setEndDateTime(end)

        setDepartureId(departure.id)
        

        const departureDate = dayjs(departure.startStr);
        const today = dayjs();
        const isToday = departureDate.isSame(today, 'day');
        // setFormerDate(isToday ? 'today' : 'tomorrow');
        setDate(isToday ? today : today.add(1, 'day'));

        setComment(departure.comment)
    }
  }, [departure]);
   
  
  const handleRadio = (event) => {
    const selectedDate = event.target.value;
    setFormerDate(selectedDate); // 'today' または 'tomorrow' を設定
  
    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');
    setDate(selectedDate === "today" ? today : tomorrow); // 日付オブジェクトを更新
  };

  const handleStartTime = (timeStart) => {
    // 開始時間の処理
    const timeOnly = dayjs(timeStart).set('year', dayjs(date).year()).set('month', dayjs(date).month()).set('date', dayjs(date).date());
    setStartDateTime(timeOnly.format());
  };
  
  const handleEndTime = (timeEnd) => {
    // 終了時間の処理
    const timeOnly = dayjs(timeEnd).set('year', dayjs(date).year()).set('month', dayjs(date).month()).set('date', dayjs(date).date());
    setEndDateTime(timeOnly.format());
  };

  const clearCharacter = () => {
    setStartDateTime(null)
    setEndDateTime(null)
    setComment("")
  }

  console.log(endDateTime)

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

  console.log(date)

  
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