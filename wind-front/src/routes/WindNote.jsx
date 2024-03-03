import React, { useEffect, useState } from 'react'
import { createFavorite, createWindNote, deleteFavorite, deleteWindNote, getWindNotes, updateWindNote } from '../lib/api/windNote'
import { Link, useNavigate } from 'react-router-dom'
import Note from '../components/Note'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { UserContext } from './UserContext'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Paper, TextField, Typography } from '@mui/material'
import CreateNoteModal from '../components/CreateNoteModal'
import { Center } from '@chakra-ui/react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios'
import UserAll from './UserAll'
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCalendarEvent } from '../lib/api/calendarEvent'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import UpdateNoteModal from '../components/updateNoteModal'
const WindNote = () => {
    const [notes, setNotes] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const { user, setUser,isSignedIn, setIsSignedIn } = useContext(UserContext)
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [currentNote, setCurrentNote] = useState(null);
    const createNote = async (event) => {
        await createWindNote({
            title: event.title,
            description: event.description,
            date: event.date
        })
        allWindNote()
    }

    const updateNote = async(event) => {
        console.log(event)
        await updateWindNote({
            title: event.title,
            description: event.description,
            date: event.date,
            id: event.noteId
        })
        allWindNote()

    }

    const allWindNote = async () => {
        const res = await getWindNotes();
        setNotes(res.data);
    };

    const deleteHandler = async (noteId) => {
        try {
            console.log(noteId)
            await deleteWindNote(noteId)
            allWindNote()
        } catch(error){
            console.log(error)
        } 
    }

    useEffect(() => {
        allWindNote()
    }, [])

    const handleOpen = () => {
        setOpen(true)
    }


    const handleClose = () => {
        setOpen(false)
        setOpenEdit(false)
    }

    const edithandler = (note) => {
        handleMenuClose()
        setOpenEdit(true)
        setCurrentNote(note)
        console.log(note)
    }

    // メニューを開く関数
  const handleMenuClick = (event, note) => {
    setMenuAnchorEl(event.currentTarget);
    console.log(event.currentTarget)
    setCurrentNote(note);
    event.stopPropagation();
    
  };

  // メニューを閉じる関数
  const handleMenuClose = (event) => {
    if (event) event.stopPropagation();
    setMenuAnchorEl(null);
    setCurrentNote(null);
  };
  
  const destroyHandler = (noteId) => {
    handleMenuClose(); // ここでイベントオブジェクトを渡す必要はありません
    deleteHandler(noteId);
  };

    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const toggleFavorite = async (noteId, isFavorite,e) => {
        if(isFavorite){
            await createFavorite(noteId)
        } else{
            await deleteFavorite(noteId)
        }
        allWindNote()
    }
  return (
    <Box bgcolor="#F9F9F6" height="100vh">
        <Header />
        <Footer />    
        <div style={{height:"60px"}} />
        <Box>
            <Box display="flex" alignItems="center" justifyContent="space-around">
                <TextField  
                    label="検索" 
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    inputProps={{style:{backgroundColor: '#fff'}}}
                />
                <Button variant="contained" onClick={handleOpen} style={{background:"gray", height:"5vh"}}>ノートを追加</Button>
            </Box>
            <List > 
            {filteredNotes.map((note, index) => {
                    console.log(note)
                
                const dateObject = new Date(note.date);
                const formattedDate = dateObject.toLocaleDateString('ja-JP', {
                    month: 'long',
                    day: 'numeric',
                })
                return (
                    <Accordion key={index}  style={{backgroundColor:"white", width:"100vw"}}  >
                        <AccordionSummary style={{ padding:"0"}} >
                            <div style={{ margin: "0px", padding: "0px" }}>
                                <button
                                    onClick={(event) => handleMenuClick(event, note)}
                                    style={{ border: "none", color: "#666666", position: "absolute", right: "0px", top: "5px", padding: "0px" }}
                                >
                                    <MoreVertIcon />
                                </button>   
                                <Menu
                                    anchorEl={menuAnchorEl}
                                    open={Boolean(menuAnchorEl) && currentNote?.id === note.id}
                                    onClose={handleMenuClose}
                                >
                                {note.isFavorite ? (
                                <MenuItem onClick={() => toggleFavorite(note.id, false)}>
                                    <TurnedInIcon />
                                    保存済み
                                </MenuItem>
                                ) : (
                                <MenuItem onClick={() => toggleFavorite(note.id, true)}>
                                    <TurnedInNotIcon />
                                </MenuItem>
                                )}
                                {note.user.id === user.id && (
                                    <div>
                                        <MenuItem key="edit" onClick={() => edithandler(note)}>
                                            <EditIcon />
                                            編集
                                        </MenuItem>
                                        <MenuItem key="delete" onClick={()=> deleteHandler(note.id) }>
                                            <DeleteIcon />
                                            削除
                                        </MenuItem>
                                    </div>
                                )}
                                {console.log(note.isFavorite)}
                                 
                                </Menu>
                            </div>
                            <ListItem style={{margin:"0px", padding:"0px 5px", width:"40%"}}>
                                <ListItemAvatar>
                                    <Avatar src={`http://localhost:3001${note.user.image.url}`} />
                                </ListItemAvatar>
                                <ListItemText primary={note.user.name} secondary={formattedDate} />
                            </ListItem>
                            <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
                                <Typography>{note.title}</Typography>
                            </Box>
                        </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant='p' style={{whiteSpace:"pre-wrap"}}>{note.description}</Typography>
                            </AccordionDetails>
                    </Accordion>
                );
            })}
            </List>
        </Box>
        <CreateNoteModal open={open} onClose={handleClose} handleClose={handleClose} createNote={createNote} />
        <UpdateNoteModal key={currentNote ? currentNote.id : 'new-note'} openEdit={openEdit} onClose={handleClose} handleClose={handleClose} updateNote={updateNote} note={currentNote} />
    </Box>
    )
}

export default WindNote
