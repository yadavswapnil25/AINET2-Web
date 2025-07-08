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

  // Function to handle token expiration
  const handleTokenExpiration = () => {
    localStorage.removeItem("ainetToken");
    setProfileData(null);
    setToken(null);
    // Redirect to login with a parameter to show it was due to expiration
    window.location.href = '/login?from=profile&expired=true';
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        profileData,
        setProfileData,
        logout,
        handleTokenExpiration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
