import React, { createContext, useContext, useState } from "react";
import axios from 'axios';

axios.defaults.withCredentials=true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [loginState, setLoginState] = useState(false);
  const[chatState, setChatState] = useState(true);

  const value={
    user, setUser,
    isAdmin, setIsAdmin, 
    cart, setCart,
    loginState, setLoginState,
    chatState, setChatState
  }
  
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
