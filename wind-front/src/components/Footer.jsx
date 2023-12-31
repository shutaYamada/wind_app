import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import React from 'react'
import { Box, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import NoteIcon from '@mui/icons-material/Note';

const Footer = () => {
    const [value, setValue] = React.useState(0);
    return (
        <Paper sx={{ position:"fixed", bottom: 0, left: 0, right: 0,zIndex:9999 }} elevation={3} >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
            <BottomNavigationAction href='/' label="ホーム"  icon={<HomeIcon />} />
            <BottomNavigationAction href='/departure' label="出艇" icon={<TripOriginIcon />} />
            <BottomNavigationAction href='/windNote' label="ノート" icon={<NoteIcon />} />
            </BottomNavigation>
        </Paper>
    )
}

export default Footer
