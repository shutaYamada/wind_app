import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUserAll } from '../lib/api/user'
import { Link } from 'react-router-dom'

const MemberList = () => {
    const [users,setUsers] = useState([])

    const AllUsers = async () => {
        const res = await getUserAll()
        setUsers(res.data)
    }

    useEffect(() => {
        AllUsers()
    }, [])
    console.log(users)
    return (
        <Box display="flex" justifyContent="center">
            <List>
                {users.map((user, index) => {
                    return(
                        <ListItem alignItems='flex-start' key={index} component={Link} to={`/user/${user.id}`}>
                        <ListItemAvatar>
                          <Avatar src={`http://localhost:3001${user.image.url}`} />
                        </ListItemAvatar>
                        <ListItemText primary={user.name} secondary={user.email} />
                      </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}

export default MemberList
