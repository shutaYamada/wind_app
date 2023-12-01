import Cookies from 'js-cookie'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../lib/api/auth'
import { Controller, useForm } from 'react-hook-form'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { teal } from '@mui/material/colors'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { UserContext } from './UserContext'


const SignUp = () => {
  const { setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const { control, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        try {
          const res = await signUp(data);
          Cookies.set("_access_token", res.headers["access-token"]);
          Cookies.set("_client", res.headers["client"]);
          Cookies.set("_uid", res.headers["uid"]);
          navigate("/home");
          console.log(res)
          setUser(res.data.data)
          Cookies.set('user', JSON.stringify(res.data.data));
        } catch (e) {
          console.log(e);
        }
      };

  return (
    <Grid
      container
      style={{width: "100%", height: "100vh"}} 
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          height: "55vh",
          width: "280px",
          m: "auto"
        }}
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
                name='name'
                control={control}
                defaultValue=''
                rules={{
                  required: { value: true, message: '名前は必須です' }
                }}
                render={({ field }) => (
                  <TextField 
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    label="名前" 
                    variant="standard" 
                    fullWidth 
                    required 
                  />
                )}
              />
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
                    variant="standard" 
                    fullWidth 
                    required 
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
                    variant="standard" 
                    fullWidth 
                    required 
                    type="password"
                  />
                )}
              />
              {/* <Controller
                name='passwordConfirmation'
                control={control}
                defaultValue=''
                rules={{
                  required: { value: true, message: 'パスワード確認は必須です' }
                }}
                render={({ field }) => (
                  <TextField 
                    {...field}
                    error={!!errors.passwordConfirmation}
                    helperText={errors.passwordConfirmation?.message}
                    label="パスワード確認" 
                    variant="standard" 
                    fullWidth 
                    required 
                    type="password"
                  />
                )}
              /> */}
            <Button type="submit" color="primary" variant="contained" fullWidth style={{marginTop: "15px"}}>
                登録
            </Button>
            <Link to="/" >ログインはこちら</Link>
        </form>
      </Paper>
    </Grid>
  )
}

export default SignUp
