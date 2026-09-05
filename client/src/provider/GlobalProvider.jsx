import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (item) => setCart([...cart, item]);
  const loginUser = (userData) => setUser(userData);
  const logoutUser = () => setUser(null);

  return (
    <GlobalContext.Provider value={{ cart, addToCart, user, loginUser, logoutUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);