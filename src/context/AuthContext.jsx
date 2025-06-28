// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { baseUrl } from "../utils/constant";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("ainetToken");

  const [profileData, setProfileData] = useState()
  const [token, setToken] = useState(storedToken);


  const logout = () => {
    localStorage.removeItem("ainetToken");
    setProfileData();
    setToken(null);
  };




  return (
    <AuthContext.Provider
      value={{
        token,
        profileData,
        setProfileData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
