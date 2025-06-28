// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { baseUrl } from "../utils/constant";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState();
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState();

  // Fetch user profile when token exists
  useEffect(() => {
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    await fetchProfile();
  };
  // Logout function

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${baseUrl}client/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const profileData = await res.json();
      setLoggedIn(profileData?.data?.user);
      setUserLoggedIn(profileData?.data)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserLoggedIn(null);
    setToken(null);

    // fetchProfile();
  };

  return (
    <AuthContext.Provider
      value={{
        userLoggedIn,
        token,
        loading,
        loggedIn,
        setLoggedIn,
        setUserLoggedIn,
        logout,
        fetchProfile,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
