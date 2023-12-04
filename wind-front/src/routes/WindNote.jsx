import React, { useEffect, useState } from 'react'
import { createFavorite, createWindNote, deleteFavorite, getWindNotes } from '../lib/api/windNote'
import { Link, useNavigate } from 'react-router-dom'
import Note from '../components/Note'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { UserContext } from './UserContext'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import CreateNoteModal from '../components/CreateNoteModal'
import { Center } from '@chakra-ui/react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const WindNote = () => {
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const [isFavorited, setIsFavorited] = useState(false)

    const toggleFavorite = async (noteId) => {
        const note = notes.find(note => note.id === noteId);
    if (note.isFavorited) {
        await deleteFavorite(noteId);
    } else {
        await createFavorite(noteId);
    }
    allWindNote();
    };
    const createNote = async (event) => {
        await createWindNote({
            title: event.title,
            description: event.description,
            date: event.date
        })
        allWindNote()

    }

    console.log(isFavorited)


    const allWindNote = async () => {
        const res = await getWindNotes();
        setNotes(res.data);
      };
      

    useEffect(() => {
        allWindNote()
    }, [])

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    

  return (
    <div style={{backgroundColor: "#F5F6F6", margin:"0px"}} >
        <Header />
        <Footer />
       <div>
            <h1>ノート一覧</h1>
            {notes.map((note, index) => {
                const dateObject = new Date(note.date);
                // 日付を "月日" 形式に変換します
                const formattedDate = dateObject.toLocaleDateString('ja-JP', {
                  month: 'long',
                  day: 'numeric',
                });

                
                return(
                    <Box mt="20px">
                        <Grid container key={index} width="93%" margin="0 auto" alignItems="center" mb="20px" bgcolor="white" borderRadius="10px" pt="10px" pr="10px" style={{ display: 'flex', alignItems: 'stretch' }} >
                            <Grid item xs="2"  style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Link to="">
                                <img 
                                    src={`http://localhost:3001${note.user?.image?.url}`} 
                                    style={{ 
                                        width: '50px', 
                                        height: '50px', 
                                        objectFit: 'cover', 
                                        borderRadius:"50%", 
                                    }} 
                                />
                                </Link>
                                <Link to=""  style={{color: "black", textDecoration:"none"}}>
                                <p style={{margin: 0}}>{note.user.name}</p>
                                </Link>
                            </Grid>
                            <Grid xs="8">
                                <Link to={`/windNote/${note.id}`} style={{color:"black", textDecoration:"none"}}><Typography variant='h5' fontWeight="bold">{note.title}</Typography></Link> 
                                <p style={{ 
                                        whiteSpace: 'nowrap', 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis' 
                                    }}>
                                    {note.description}
                                </p>
                            </Grid>
                           
                            <Grid xs="2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems:"flex-end" }}>
                                <Typography>
                                    {`${dateObject.getMonth() + 1}月${dateObject.getDate()}日 `}
                                </Typography>
                                <Button onClick={() => toggleFavorite(note.id)}>
                                    {note.isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )
            })}
       </div>
        
        <Note />
        <Button onClick={handleOpen}>ノートを追加</Button>
        <CreateNoteModal open={open} onClose={handleClose} handleClose={handleClose} createNote={createNote} />
    </div>
    
  )
}

export default WindNote
