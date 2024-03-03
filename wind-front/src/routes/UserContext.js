import Cookies from 'js-cookie';
import React, { createContext, useEffect, useState } from 'react';
import { getUser } from '../lib/api/auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  const [user, setUser] = useState(null);

 const handleGetCurrentUser = async () => {
  try {
    const res = await getUser(); // ここを修正しました

    if (res?.data.isLogin === true) {
      setIsSignedIn(true);
      setUser(res?.data.data);

      console.log(res?.data.data);
    } else {
      console.log("No current user");
      setIsSignedIn(false);
    }
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  handleGetCurrentUser();
}, []);


  

  return (
    <UserContext.Provider value={{ user, setUser,isSignedIn, setIsSignedIn }}>
      {children}
    </UserContext.Provider>
  );
};