import Cookies from 'js-cookie';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromCookie = Cookies.get('user');
    if (userFromCookie) {
      setUser(JSON.parse(userFromCookie));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};