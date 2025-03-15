"use client";    
import { useEffect, useState } from "react";
import * as React from "react";
import { AuthContextProvider } from '@/store/auth-context';
import AuthGuard from '@/store/auth-guard';
import { ToastContainer, toast } from 'react-toastify';


// Import providers
import { HeroUIProvider } from "@heroui/system";
import {CasesContextProvider}  from "@/store/cases-context";

export default function Provider({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true); // Ensure the component is mounted

  }, []);

  // Avoid rendering children until mounted to prevent hydration errors
  if (!mounted) return null;
  return (
    <AuthContextProvider>
      {/* <AuthGuard> */}

    <CasesContextProvider>
      <HeroUIProvider>
    
        {children}
   
      </HeroUIProvider>
    </CasesContextProvider>
       {/* </AuthGuard> */}
    </AuthContextProvider>
  );
}
