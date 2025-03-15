'use client';
import { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Service functions for API calls
const USER_STORAGE_KEY = 'auth_user';

const API_HEADERS = {
  "Cache-Control": "no-store, no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

// Helper functions for localStorage
function persistUserData(userData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  }
}

function getStoredUserData() {
  if (typeof window !== 'undefined') {
    try {
      const userData = localStorage.getItem(USER_STORAGE_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return null;
    }
  }
  return null;
}

function clearStoredUserData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

// Create context
export const AuthContext = createContext({
  currentUser: null,
  isLoading: true,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: () => {},
  checkAuth: () => {}
});

// Context provider
export function AuthContextProvider({ children }) {
  // Initialize with stored values when available
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window !== 'undefined') {
      return getStoredUserData();
    }
    return null;
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!getStoredUserData();
    }
    return false;
  });
  
  const router = useRouter();

  const checkAuth = useCallback(async (redirectOnFailure = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/auth/get-token', {
        headers: API_HEADERS,
      });
      
      if (response.data.user) {
        console.log(response.data.user);
        persistUserData(response.data.user);
        setCurrentUser(response.data.user);
        setIsAuthenticated(true);
        return true;
      } else {
        clearStoredUserData();
        setCurrentUser(null);
        setIsAuthenticated(false);
        if (redirectOnFailure && response.data.redirectUrl) {
          router.push(response.data.redirectUrl);
        }
        return false;
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      clearStoredUserData();
      setCurrentUser(null);
      setIsAuthenticated(false);
      
      if (redirectOnFailure && error.response?.data?.redirectUrl) {
        router.push(error.response.data.redirectUrl);
      } else if (redirectOnFailure) {
        router.push('/signin');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    try {
      await axios.get('/api/auth/logout');
      clearStoredUserData();
      setCurrentUser(null);
      setIsAuthenticated(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      clearStoredUserData();
      setCurrentUser(null);
      setIsAuthenticated(false);
      router.push('/signin');
    }
  }, [router]);

  // Check authentication on initial load - FIXED to prevent infinite loop
  useEffect(() => {
    // Only run once during component initialization
    const initialUser = getStoredUserData();
    if (initialUser) {
      setCurrentUser(initialUser);
      setIsAuthenticated(true);
      setIsLoading(false);
    }
    
    // Still check with the server, but don't depend on currentUser
    checkAuth();
    
    // Empty dependency array means this only runs once on mount
  }, []);

  const contextValue = {
    currentUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    logout,
    checkAuth
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}