// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { getValidToken, isTokenExpired } from "../utils/utility";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize token state and check validity
  useEffect(() => {
    const validToken = getValidToken();
    setToken(validToken);
    setLoading(false);
    
    // If no valid token, clear profile data
    if (!validToken) {
      setProfileData(null);
    }
  }, []);

  const login = (newToken) => {
    // Validate token before setting
    if (newToken && !isTokenExpired(newToken)) {
      localStorage.setItem("ainetToken", newToken);
      setToken(newToken);
    } else {
      console.error("Invalid or expired token provided to login");
    }
  };

  const logout = () => {
    localStorage.removeItem("ainetToken");
    setProfileData(null);
    setToken(null);
  };

  const handleTokenExpired = () => {
    console.log("Token expired, logging out user");
    logout();
  };

  const isAuthenticated = () => {
    return token && !isTokenExpired(token);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        profileData,
        setProfileData,
        login,
        logout,
        handleTokenExpired,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
