import { Box, Button, Checkbox, FormControlLabel, Modal, Stack, TextField, Typography } from "@mui/material"
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const UpdateEventModal = ({
    open,
    onClose,
    updateEvent,
    updateTitle,
    updateEventId,
    updateDescription,
    updateStartDate,
    updateEndDate,
    setUpdateTitle,
    setUpdateDescription,
    setUpdateStartDate,
    setUpdateEndDate,
    updateIsAbsence,
    handleClose,
    setIsAbsence
}) => {

    const changeStartDate = (date) => {
        console.log(date)
        setUpdateStartDate(date.format('YYYY-MM-DDTHH:mm:ssZ'));
        console.log(date.format('YYYY-MM-DDTHH:mm:ssZ'))
    }

    const changeEndDate = (date) => {
        console.log(date)
        setUpdateEndDate(date.format('YYYY-MM-DDTHH:mm:ssZ'));
        console.log(date.format('YYYY-MM-DDTHH:mm:ssZ'))
    }

    const clearCharacter = () => {
        updateStartDate("")
        updateEndDate("")
        updateTitle("")
        updateIsAbsence(false)
        ("")
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
            isCentered
        >
            <Box sx={style}>
                <div style={{margin: "0px", padding: "0px"}}><button onClick={handleClose} style={{ border: "none", color: "#666666", position: "absolute", right: "0px", top: "0px", padding: "0px" }}  ><CloseIcon /></button></div>
                <Typography variant='h7' fontWeight="bold" m="0">タイトル</Typography>
                <TextField
                    value={updateTitle}
                    onChange={(event) => setUpdateTitle(event.target.value) }
                    size="small"
                    name="title"
                    label="タイトル"
                    sx={fieldStyle}
                    margin="normal"
                /> 
                <Typography variant='h7' fontWeight="bold">内容</Typography>
                <TextField
                    value={updateDescription}
                    onChange={(event) => setUpdateDescription(event.target.value) }
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
                            value={updateStartDate ? dayjs(updateStartDate) : null} 
                            onChange={changeStartDate} />
                    </DemoContainer>
                </LocalizationProvider>
                <Typography variant='h7' fontWeight="bold">予定終了日付</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker  
                            sx={DatePickerStyle} 
                            value={updateEndDate ? dayjs(updateEndDate) : null} 
                            onChange={changeEndDate} />
                    </DemoContainer>
                </LocalizationProvider>
                <FormControlLabel control={<Checkbox  onChange={(event) => setIsAbsence(event.target.checked)} />} label="正規連を休む" />
                <Stack marginTop="25px" direction="row" justifyContent="end" >
                    <Button
                        onClick={() => {
                            updateEvent({
                                updateEventId,updateTitle,updateDescription,updateStartDate,updateEndDate
                            })
                            onClose()
                        }}
                        variant="contained" >更新
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}