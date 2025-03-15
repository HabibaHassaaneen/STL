"use client";
import Image from "next/image";
import { useContext,useEffect } from "react";
import { Avatar } from "@heroui/react";
import { AuthContext } from "@/store/auth-context.jsx";
const Navbar = () => {
  const { isAuthenticated,isLoading,checkAuth,currentUser} =useContext(AuthContext);
  useEffect(()=>{
    checkAuth(true)


  },[checkAuth])
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return 
  }

  return (
    
    <div className="flex items-center justify-between p-2">
      {/* Icons and User */}
      <div className="flex items-center gap-6 justify-end w-full">
       
      
        {(
          <div className="flex flex-col">
            {/* <span className="text-xs leading-3 font-medium">
              {currentUser.username}
              </span> */}
            {/* <span className="text-[10px] text-gray-500 text-right">
            {currentUser.role }
              </span> */}
          </div>
        )}
       
      </div>
    </div>
  );
};

export default Navbar;
