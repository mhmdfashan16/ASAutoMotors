import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("asauto_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });


  const [cart, setCart] = useState([]);
  const [loginState, setLoginState] = useState(false);
  const [chatState, setChatState] = useState(false);

  // Persist user and admin info to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("asauto_user", JSON.stringify(user));
      } else {
      localStorage.removeItem("asauto_user");
    }
    // setLoginState(!!user);
  }, [user]);

const value = useMemo(() => ({
  user, setUser,
  cart, setCart,
  loginState, setLoginState,
  chatState, setChatState
}), [user, cart, loginState, chatState]); 


  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
