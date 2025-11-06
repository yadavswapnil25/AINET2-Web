// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { baseUrl } from "../utils/constant";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("ainetToken");

  const [profileData, setProfileData] = useState(null);
  const [token, setToken] = useState(storedToken);
  const [isAuthenticating, setIsAuthenticating] = useState(!!storedToken);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle token expiration
  const handleTokenExpiration = useCallback(() => {
    localStorage.removeItem("ainetToken");
    setProfileData(null);
    setToken(null);
    setIsAuthenticated(false);
    // Redirect to login with a parameter to show it was due to expiration
    if (window.location.pathname !== "/login") {
      window.location.href = "/login?from=profile&expired=true";
    }
  }, []);

  // Function to check authentication status
  const checkAuthentication = useCallback(async () => {
    const currentToken = localStorage.getItem("ainetToken");
    
    if (!currentToken) {
      setToken(null);
      setProfileData(null);
      setIsAuthenticated(false);
      setIsAuthenticating(false);
      return;
    }

    try {
      setIsAuthenticating(true);
      const res = await fetch(`${baseUrl}client/auth/profile`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
          Accept: "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.data?.user) {
          setProfileData(data.data.user);
          setToken(currentToken);
          setIsAuthenticated(true);
        } else {
          // Invalid response format
          handleTokenExpiration();
        }
      } else if (res.status === 401 || res.status === 403) {
        // Token is expired or invalid
        handleTokenExpiration();
      } else {
        // Other error
        handleTokenExpiration();
      }
    } catch (err) {
      console.error("Authentication check error:", err);
      // On network error, we'll keep the token but mark as not authenticated
      // This prevents logout on temporary network issues
      setToken(currentToken);
      setIsAuthenticated(false);
    } finally {
      setIsAuthenticating(false);
    }
  }, [handleTokenExpiration]);

  // Check authentication on mount
  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  // Update token state when localStorage changes (e.g., from login)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "ainetToken") {
        const newToken = e.newValue;
        setToken(newToken);
        if (newToken) {
          checkAuthentication();
        } else {
          setProfileData(null);
          setIsAuthenticated(false);
        }
      }
    };

    // Handle custom event for same-tab token changes
    const handleAuthTokenChanged = () => {
      const newToken = localStorage.getItem("ainetToken");
      setToken(newToken);
      if (newToken) {
        checkAuthentication();
      } else {
        setProfileData(null);
        setIsAuthenticated(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authTokenChanged", handleAuthTokenChanged);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authTokenChanged", handleAuthTokenChanged);
    };
  }, [checkAuthentication]);

  const logout = () => {
    localStorage.removeItem("ainetToken");
    setProfileData(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // Function to refresh profile data
  const refreshProfile = useCallback(async () => {
    const currentToken = localStorage.getItem("ainetToken");
    if (!currentToken) {
      return;
    }

    try {
      const res = await fetch(`${baseUrl}client/auth/profile`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
          Accept: "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.data?.user) {
          setProfileData(data.data.user);
        }
      } else if (res.status === 401 || res.status === 403) {
        handleTokenExpiration();
      }
    } catch (err) {
      console.error("Profile refresh error:", err);
    }
  }, [handleTokenExpiration]);

  return (
    <AuthContext.Provider
      value={{
        token,
        profileData,
        setProfileData,
        logout,
        handleTokenExpiration,
        isAuthenticating,
        isAuthenticated,
        refreshProfile,
        checkAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
