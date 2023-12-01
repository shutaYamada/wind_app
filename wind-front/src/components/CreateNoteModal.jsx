import { Box, Button, Input, Modal, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { CloseButton, color } from '@chakra-ui/react';
import { DatePicker } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const CreateNoteModal = ({ open, onClose,  handleClose, createNote}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")

    const changeDate = (date) => {
        console.log(date)
        setDate(date)
    }

    const clearCharacter = () => {
        setTitle("")
        setDescription("")
        setDate("")
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
        <Box sx={style} >
            <Typography variant='h6' fontWeight="bold" mb="5px">ノートを追加</Typography>
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
            <Typography variant='h7' fontWeight="bold">日付</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker  
                            sx={DatePickerStyle} 
                            value={date} 
                            onChange={changeDate} />
                </DemoContainer>
            </LocalizationProvider>
            <Stack marginTop="25px" direction="row" justifyContent="end" >
                <Button 
                    onClick={() => {
                        clearCharacter()
                        onClose()
                        createNote({title, description, date})
                    }}
                    variant="contained" >追加
                </Button>
            </Stack>
        </Box>
    </Modal>
  )
}

export default CreateNoteModal
