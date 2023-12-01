import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../lib/api/auth'
import Cookies from 'js-cookie'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Departure = () => {
    const navigate = useNavigate()

    const logOut = async () => {
        try {
            const res = await signOut()
      
            if (res.data.success === true) {
              // サインアウト時には各Cookieを削除
              Cookies.remove("_access_token")
              Cookies.remove("_client")
              Cookies.remove("_uid")
            
              navigate("/")
      
              console.log("Succeeded in sign out")
            } else {
              console.log("Failed in sign out")
            }
          } catch (err) {
            console.log(err)
          }
    }
  return (
    <div>
      <Header />
      <Footer />
      <button onClick={logOut}>ログアウト</button>
      <button onClick={() => navigate("/windNote")}>ウィンドノート</button>
    </div>
  )
}

export default Departure
