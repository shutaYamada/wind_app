import { Box, Button, Checkbox, FormControlLabel, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const CreateEventModal = ({open, onClose, handleClose, createCalendar}) => {
    const [title,setTitle] = useState( "")
    const [description, setDescription] = useState("")
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [isAbsence, setIsAbsence] = useState(false)
    

    const changeStartDate = (date) => {
        const startDateWithTime = date.hour(13).minute(59).second(59);
        setStartDate(startDateWithTime.format('YYYY-MM-DDTHH:mm:ssZ'));
        console.log(startDateWithTime.format('YYYY-MM-DDTHH:mm:ssZ'))
    }
    const changeEndDate = (date) => {
      const endDateWithTime =date.hour(13).minute(59).second(59);
      setEndDate(endDateWithTime.format('YYYY-MM-DDTHH:mm:ssZ'));
      console.log(endDateWithTime.format('YYYY-MM-DDTHH:mm:ssZ'))
    }

    console.log(startDate, endDate)
    console.log(isAbsence)

    const clearCharacter = () => {
        setStartDate("")
        setEndDate("")
        setTitle("")
        setIsAbsence(false)
        setDescription("")
    }
    const style =  {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "50%",
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
        borderRadius: '5px'
    }

    const fieldStyle = {
        '& label': {
          color: '#AAAAAA', // 通常時のラベル色 
        },
        '& .MuiInput-underline:before': {
          borderBottomColor: '#000000', // 通常時のボーダー色
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#000000',    // 通常時のボーダー色(アウトライン)
          },
          '&:hover fieldset': {
            borderColor: '#DDDDDD',    // ホバー時のボーダー色(アウトライン)
          },
        },
        display: "flex"
        
    }

    const DatePickerStyle = {
        
        // ここにスタイルを追加します
        '& label': {
            color: '#AAAAAA', // 通常時のラベル色 
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: '#000000', // 通常時のボーダー色
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#000000',    // 通常時のボーダー色(アウトライン)
            },
            '&:hover fieldset': {
              borderColor: '#DDDDDD',    // ホバー時のボーダー色(アウトライン)
            },
          },
          display: "flex"
      
}
  return (
    <Modal
        open={open}
        onClose={onClose}
    >
        <Box sx={style}>
        <div style={{margin: "0px", padding: "0px"}}><button onClick={handleClose} style={{ border: "none", color: "#666666", position: "absolute", right: "0px", top: "0px", padding: "0px" }}  ><CloseIcon /></button></div>
        <Typography variant='h7' fontWeight="bold" m="0">タイトル</Typography>
            <TextField
                value={title}
                onChange={(event) => setTitle(event.target.value) }
                size="small"
                name="title"
                label="タイトル"
                sx={fieldStyle}
                margin="normal"
            />
            <Typography variant='h7' fontWeight="bold">内容</Typography>
            <TextField
                value={description}
                onChange={(event) => setDescription(event.target.value) }
                size="small"
                name="description"
                label="内容"
                sx={fieldStyle}
                margin="normal"
            />
            <Typography variant='h7' fontWeight="bold">予定開始日付</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker  
                            sx={DatePickerStyle} 
                            value={startDate ? dayjs(startDate) : null} 
                            onChange={changeStartDate} />
                </DemoContainer>
            </LocalizationProvider>
            <Typography variant='h7' fontWeight="bold">予定終了日付</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker  
                            sx={DatePickerStyle} 
                            value={endDate ? dayjs(endDate) : null} 
                            onChange={changeEndDate} />
                </DemoContainer>
            </LocalizationProvider>
            <FormControlLabel control={<Checkbox  onChange={(event) => setIsAbsence(event.target.checked)} />} label="正規連を休む" />
            <Stack marginTop="25px" direction="row" justifyContent="end" >
                <Button 
                    onClick={() => {
                        clearCharacter()
                        onClose()
                        createCalendar({title, description, startDate, endDate,isAbsence})
                    }}
                    variant="contained" >追加
                </Button>
            </Stack>
        </Box>
    </Modal>
  )
}

export default CreateEventModal
