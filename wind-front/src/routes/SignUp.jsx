import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../lib/api/auth'
import { Box, Button, Input } from '@chakra-ui/react'

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate("")


    const register = async () => {
        try {
          const res = await signUp({ email, password });
          Cookies.set("_access_token", res.headers["access-token"]);
          Cookies.set("_client", res.headers["client"]);
          Cookies.set("_uid", res.headers["uid"]);
          navigate("/departure");
        } catch (e) {
          console.log(e);
        }
      };
    

  return (
    <Box>
        <Box>
        <Input placeholder='メールアドレス' value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input placeholder='パスワード' value={password} onChange={(event) => setPassword(event.target.value)} />
        <Button onClick={register}>登録</Button>
        </Box>
        <Box>
            <Link to="/" >ログインはこちら</Link>
        </Box>
    </Box>
  )
}

export default SignUp
