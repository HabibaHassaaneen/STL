


"use client"; // Required for React Context in Next.js

import { createContext, useContext, useEffect, useState } from "react";

const TokenContext = createContext(null);

export function UserProvider({ children }) {
  const [token, setToken] = useState(null);

  const [user, setUser] = useState(null); // Start with null

  useEffect(() => {
    if (!token) return;
    const fetchToken = async () => {
        try {
          const res = await fetch("/api/auth/get-token");
          const data = await res.json();
          setToken(data.token || null);
        } catch (error) {
          console.error("Failed to fetch token:", error);
        }
      };
  
      fetchToken();
    verifyTokenForPage(token)
      .then((payload) => {
        if (!payload) return;

        console.log("User data:", payload.payload);
        setUser(payload.payload); // Correctly update state
      })
      .catch((err) => console.error("Token verification failed:", err));
  }, []); // Runs only when `token` changes
 

  return (
    <TokenContext.Provider value={{ user }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useUser() {
  return useContext(TokenContext);
}
