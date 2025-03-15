"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { verifyTokenForPage } from "@/utils/verifyToken";

const AuthContext = createContext(null);

export const AuthProvider = ({ children, token }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;

    verifyTokenForPage(token)
      .then((data) => {
        if (data) setUser(data);
      })
      .catch((error) => console.error("Failed to verify token:", error));
  }, [token]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
