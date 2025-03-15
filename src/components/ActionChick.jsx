import { useActionState } from 'react';
import { use } from "react";
import { Button, Form } from "@heroui/react";
import { CasesContext } from "@/store/cases-context.jsx";
import React, { useEffect,useState,useTransition,startTransition } from 'react';
import { Checkbox,Chip } from "@heroui/react";
import { useTransform } from 'framer-motion';

export default function ActionChick({act,id,isSelect,entryDate}) {
  const [isConfirmed, setIsConfirmed] = useState(isSelect);
  const [isSelected, setIsSelected] = useState(isSelect);
  const { updateCase } = use(CasesContext);
  const [isPending, setIsPending] = useState(false);

  const handleCheckboxChange = async (e) => {
    const newSelection = !isSelect; // Toggle selection
    setIsSelected(newSelection); // Update local state
    setIsPending(true); // Indicate that the operation is in progress
  
    let payload;
     payload = {
      [act]: newSelection, // Dynamically set the key with the action name
    };
  
    // Check if the action is "redesign"
     
     if (act === "redesign"&&isSelect===false)
       {
      const entryDateu= new Date()
      payload = {

        confirmed_date:null,
        entryDate: [...entryDate, new Date(entryDateu.getTime()-entryDateu.getTimezoneOffset()*60000) ], // Add the current timestamp to the entryDate array
confirmed: false, // Reset "confirmed" to false
designed: false,  // Reset "designed" to false
Try_in: false,    // Reset "Try_in" to false
        [act]: newSelection, // Dynamically set the key "redesign" with the value of newSelection
      };
    }else if (act === "confirmed") {
      console.log(isSelect)
   
      const entryDateu= new Date()
      payload = {
     redesign:false,
     
     confirmed_date:!newSelection?null:new Date(entryDateu.getTime()-entryDateu.getTimezoneOffset()*60000) ,
     [act]: newSelection, // Dynamically set the key with the action name
   };
 };
  console.log("oops",JSON.stringify(payload))
    try {
      // Ensure updateCase is asynchronous
      await updateCase(id, JSON.stringify(payload));
    } catch (error) {
      console.error("Error updating the case:", error);
    } finally {
      setIsPending(false); // Always unset the pending state
    }
  };
  const chipStyles = {
    danger: "bg-red-100 text-red-700 border-red-300",
    success: "bg-green-100 text-green-700 border-green-300",
  };
  
  return (
   
         <Checkbox
            isSelected={isSelect}
        onValueChange={handleCheckboxChange}
        className="text-blue-600"
        isDisabled={isPending}
        defaultSelected= {isSelect}
        />
 
    

      
    
    
        
  );
}
