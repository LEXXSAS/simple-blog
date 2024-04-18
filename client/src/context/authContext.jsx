import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const login = async(inputs) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,
    inputs,
    {withCredentials: true});
    setCurrentUser(res.data);
  }
  const logout = async(inputs) => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
    setCurrentUser(null);
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{currentUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
