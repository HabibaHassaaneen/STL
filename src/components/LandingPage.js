"use client";

import React, { useContext } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import BasicNavbar from "./BasicNavbar";
import { AuthContext } from "@/store/auth-context"; // Import AuthContext

export default function LandingPage() {
  const { currentUser, isLoading, isAuthenticated, checkAuth } = useContext(AuthContext);

  // If still loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-background">
      <BasicNavbar user={currentUser} />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center overflow-hidden px-8">
        <section className="z-20 flex flex-col items-center justify-center gap-[18px] sm:gap-6">
          <div className="text-center text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-teal-300 to-green-300 text-transparent bg-clip-text tracking-widest">
                  STL
                </h1>
                <p className="text-xl text-gray-300 tracking-wide mt-2">
                  Digital in Style.
                </p>
              </div>
            </div>
          </div>
          <p className="text-center font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]">
            Digital Planning
          </p>

          {/* Show an error message if the user is not authenticated */}
          {/* {!isAuthenticated && (
            <p className="text-red-500 bg-red-100 p-3 rounded-lg text-sm">
              You are not logged in. Please sign in to continue.
            </p>
          )} */}

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            {isAuthenticated && (
              <Button
                variant="shadow"
                className="h-12 w-[180px] bg-gradient-to-r from-blue-600 via-teal-500 to-green-400 text-white font-semibold text-lg tracking-wide rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-out"
              >
                Get Started
              </Button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
