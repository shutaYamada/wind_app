import { Box, Button, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, signIn } from '../lib/api/auth'
import Cookies from 'js-cookie'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const loginHandler = async () =>{
        try {
            const res = await signIn({ email, password });
            Cookies.set("_access_token", res.headers["access-token"]);
            Cookies.set("_client", res.headers["client"]);
            Cookies.set("_uid", res.headers["uid"]);
            navigate("departure");
          } catch (e) {
            console.log(e);
          }
    }

    useEffect(() => {
        const f = async () => {
          try {
            const res = await getUser();
            if (res.data.isLogin) {
              navigate("departure");
              console.log(res)
            }
          } catch (e) {
            console.log(e);
          }
        };
        f();
      }, [navigate]);

  return (
    <Box>
        <Box>
        <Input placeholder='メールアドレス' onChange={(event) => setEmail(event.target.value)} />
        <Input placeholder='パスワード' onChange={(event) => setPassword(event.target.value)} />
        <Button onClick={loginHandler}>ログインする</Button>
        </Box>
        <Box>
            <Link to="/signUp" >新規登録はこちら</Link>
        </Box>
    </Box>
  )
}

export default Login
