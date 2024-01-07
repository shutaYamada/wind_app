import { Box } from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MemberList from '../components/MemberList'

const UserAll = () => {
    return(
      <Box>
        <Header/>
        <div style={{ height: '60px' }} />
        <Footer />
        <MemberList />
      </Box>
    )
}

export default UserAll
