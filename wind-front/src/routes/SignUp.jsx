import Cookies from 'js-cookie'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../lib/api/auth'
import { Controller, useForm } from 'react-hook-form'
import { Avatar, Box, Button, FormControl, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { teal } from '@mui/material/colors'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { UserContext } from './UserContext'
import Header from '../components/Header'



const SignUp = () => {
  const { user, setUser,isSignedIn, setIsSignedIn } = useContext(UserContext)
    const navigate = useNavigate()
    const { control, handleSubmit, formState: { errors } } = useForm()
    const [image, setImage] = useState()
    const [grade, setGrade] = useState("")
    
    

    const onSubmit = async (data) => {
        try {
          const formData = new FormData()
          formData.append("name", data.name)
          formData.append("email", data.email)
          formData.append("password", data.password)
          formData.append("grade", data.grade)
          if(image){
            formData.append("image", image)
          }
          const res = await signUp(formData);
          Cookies.set("_access_token", res.headers["access-token"]);
          Cookies.set("_client", res.headers["client"]);
          Cookies.set("_uid", res.headers["uid"]);
          navigate("/home");
          console.log(res)
          setUser(res.data.data)
          setIsSignedIn(true)
          Cookies.set('user', JSON.stringify(res.data.data));
        } catch (e) {
          console.log(e);
        }
      };

    const selectImage = (e) => {
      const selectImage = e.target.files[0]
      setImage(selectImage)
    }

    const selectGrade = () => {
    }

    console.log(grade)
  return (
    <>
      <Header />
      <Grid
        container
        style={{width: "100%", height: "100vh", backgroundColor:"#F9F9F6"}} 
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
              SignUp
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
                    fullWidth 
                    required={true}
                    inputProps={{style:{backgroundColor: '#fff' }}}
                    variant="outlined" 
                  />
                )}
              />
              <Controller
                name='grade'
                control={control}
                defaultValue=''
                rules={{
                  required: { value: true, message: '学年は必須です' }
                }}
              render={({ field }) => (
              <FormControl fullWidth variant="outlined" error={!!errors.grade} sx={{mt:"10px"}}>
              <Select
              {...field}
              label="学年"
              required
              displayEmpty
              value={field.value}
              onChange={(e) => {
                setGrade(e.target.value);
                field.onChange(e.target.value);
              }}
              style={{marginBottom:"10px", backgroundColor:"#FFF"}}
            >
        <MenuItem value=""><em>学年を選択</em></MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
      <Typography variant="caption" color="error">
        {errors.grade?.message}
      </Typography>
    </FormControl>
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
                    inputProps={{style:{backgroundColor: '#fff' }}}
                    variant="outlined" 
                    fullWidth 
                    required 
                    style={{marginBottom:"10px"}}

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
                    inputProps={{style:{backgroundColor: '#fff' }}}
                    variant="outlined" 
                    fullWidth 
                    required 
                    type="password"
                    style={{marginBottom:"10px"}}

                  />
                )}
              />
              <h4>プロフィール画像</h4>
              <input type="file" onChange={(e) => selectImage(e)} />
              
            <Button type="submit"  variant="contained" fullWidth style={{margin: "15px 0",backgroundColor:"#808080"}}>
                サインアップ
            </Button>
            <Link to="/logIn" >ログインはこちら</Link>
        </form>
      </Box>
    </Grid>
    </>
  )
}

export default SignUp