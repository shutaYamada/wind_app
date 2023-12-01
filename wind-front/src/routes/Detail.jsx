import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { deleteWindNote, showWindNote } from '../lib/api/windNote'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { UserContext } from './UserContext'
const Detail = () => {
    const [data, setData] = useState()    
    let { id } = useParams()
    const navigate = useNavigate()
    const { user } = useContext(UserContext)

    const handleGetDetail = async () =>{
        try {
            const res = await showWindNote(id);
            setData(res.data);
        } catch (error) {
            console.error("Failed to fetch wind note detail:", error);
        }
    }
    useEffect(() =>{
        handleGetDetail()
    }, [])

    const deleteHandler = async () => {
        try {
            await deleteWindNote(id)
            navigate("/windNote")
        } catch(error){
            console.log(error)
        }

    }
    
  return (
    <div>
      <h1>Detail</h1>
      <h3>WindNote ID : {id}</h3>
      {data && (
        <>
            <h3>WindNote タイトル: {data.title}</h3>
            <h3>WindNote 内容: {data.description}</h3>
            <h3>WindNote 日付: {data.date}</h3>
            {user.id === data.userId && <Button onClick={deleteHandler}>削除</Button>}
        </>
      )}
    </div>
  )
}

export default Detail
