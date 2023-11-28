import { Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import { createContext, useState } from 'react';
import { getUser } from './lib/api/auth';

function App() {
 
  



  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
