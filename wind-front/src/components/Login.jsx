import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUser, signIn } from '../lib/api/auth'
import Cookies from 'js-cookie'
import { Controller, useForm } from 'react-hook-form'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';
import { UserContext } from '../routes/UserContext'
import { background } from '@chakra-ui/react'

const Login = () => {
    const navigate = useNavigate()
    const { control, handleSubmit, formState: { errors }, setError } = useForm()
    const { setUser } = useContext(UserContext)
    const { user } = useContext(UserContext)
    const onSubmit = async (data) => {
        try {
            const res = await signIn(data);
            if (res.error) {
                setError("email", {
                    type: "manual",
                    message: "メールアドレスまたはパスワードが間違っています"
                });
                setError("password", {
                    type: "manual",
                    message: "メールアドレスまたはパスワードが間違っています"
                });
                return;
            }
            Cookies.set("_access_token", res.headers["access-token"]);
            Cookies.set("_client", res.headers["client"]);
            Cookies.set("_uid", res.headers["uid"]);
            navigate("/home");
            console.log("Successed LogIn")
            console.log(res.data.data)
            Cookies.set('user', JSON.stringify(res.data.data));
            setUser(res.data.data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const f = async () => {
          try {
            const res = await getUser();
            if (res.data.isLogin) {
              navigate("/home");
              console.log(res)
            }
          } catch (e) {
            console.log(e);
          }
        };
        f();
      }, [navigate]);

  return (
    <Grid 
      container
      style={{width: "100%", height: "100vh"}} 
      justifyContent="center"
      alignItems="center"
    >
      <Box
        p="10vw"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Avatar sx={{ bgcolor: teal[500] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant={"h5"} sx={{ m: "30px" }}>
              Sign In
            </Typography>
          </Grid>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            rules={{
              required: { value: true, message: 'メールアドレスは必須です' }
            }}
            render={({ field }) => (
              <TextField 
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
                label="メールアドレス" 
                variant="outlined" 
                fullWidth 
                required 
                inputProps={{style:{backgroundColor: '#fff' }}}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            defaultValue=''
            rules={{
              required: { value: true, message: 'パスワードは必須です' }
            }}
            render={({ field }) => (
              <TextField 
                {...field}
                error={!!errors.password}
                helperText={errors.password?.message}
                label="パスワード" 
                variant="outlined" 
                fullWidth 
                required 
                type="password"
                inputProps={{style:{backgroundColor: '#fff'}}}
                style={{marginTop:"10px"}}
              />
            )}
          />
          <Button type="submit" variant="contained" fullWidth style={{margin: "15px 0", backgroundColor:"#FE9158"}}>
              サインイン
          </Button>
          <Link style={{marginTop:"10px"}} to="/signUp" >新規登録はこちら</Link>
        </form>
      </Box>
    </Grid>
  )
}

export default Login