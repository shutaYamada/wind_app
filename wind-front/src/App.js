import { Box } from '@mui/material';
import './App.css';
import Login from './routes/Login';
import Header from './components/Header';
import { getUser } from './lib/api/auth';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './routes/UserContext';

function App() {
  const { user, setUser,isSignedIn, setIsSignedIn } = useContext(UserContext)
  console.log(user)
  console.log(isSignedIn)
  
  return (
    <Box>
      <Link to="/signUp">新規登録はこちら</Link>
      <Link to="/logIn">ログインはこちら</Link>
    </Box>
  );
}

export default App;
