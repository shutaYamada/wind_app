import React, { useContext } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { UserContext  } from './UserContext'
const Home = () => {
    const { user } = useContext(UserContext)
    console.log(user)
  return (
    <>
        <Header />
        <Footer />
        <h1>出艇数</h1>
        {user && <p>Logged in as: {user.id}</p>}
        {}
    </>
  )
}

export default Home
