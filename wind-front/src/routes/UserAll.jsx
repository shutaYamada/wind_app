import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getUserAll } from '../lib/api/user'

const UserAll = () => {
    const [users,setUsers] = useState([])

    const AllUsers = async () => {
        const res = await getUserAll()
        setUsers(res.data)
        console.log(res.data)
    }

    useEffect(() => {
        AllUsers()
    }, [])
    console.log(users)
  return (
    <div>
    <Header/>
    <div style={{ height: '60px' }} />
    <Footer />
    <div>
      {users.map((user, index) => {
        return(
          <div key={index}>
            <h4>{user.name}</h4>
            <h4>{user.id}</h4>
          </div>
        )
      })}
      <button style={{marginTop: "50px"}}>aaa</button>
    </div>
  </div>
  )
}

export default UserAll
