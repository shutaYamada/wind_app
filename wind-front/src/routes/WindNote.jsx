import React, { useEffect, useState } from 'react'
import { createWindNote, getWindNotes } from '../lib/api/windNote'
import { Link, useNavigate } from 'react-router-dom'
import Note from '../components/Note'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { UserContext } from './UserContext'
import { Button } from '@mui/material'
import CreateNoteModal from '../components/CreateNoteModal'



const WindNote = () => {
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    console.log(user)

    const createNote = async (event) => {
        await createWindNote({
            title: event.title,
            description: event.description,
            date: event.date
        })
        allWindNote()

    }


    const allWindNote = async () => {
        const res = await getWindNotes()  
        setNotes(res.data)
        console.log(res.data)
    }

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
    <div>
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
                    <div key={index}>
                        <Link to={`/windNote/${note.id}`}>{note.title}</Link> 
                        <p>{note.description}</p>
                        <p>{formattedDate}</p>
                        <p>{note.user.name}</p>
                    </div>
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
