'use client'
import React from "react";

import {Form, Input, Button,Spinner,Alert} from "@heroui/react";
import {useActionState} from 'react'
import StatusInput from "./StatusInput";
import ConfirmationRadio from "./ConfirmationRadio";
import mongoose from 'mongoose';
import List from "./List";
import DatePickers from "./DatePickers.jsx";
import { use,useRef,useState } from "react";
import {CasesContext} from "./../store/cases-context.jsx";
export default function ReuseForm() {
 const inputDoctorRef=useRef();
 const inputDesignerRef=useRef();
 const inputCaseDefinitionRef=useRef();
 const inputStatusRef=useRef(); 
 const inputConfirmedRef=useRef();
 const inputDatedRef=useRef();


const {addCase}=use(CasesContext)
const [designer_Id, setdesignerid] = useState({});
const [doctor_Id, setdoctorid] = useState({});
const [case_definition_Id, setdefinitionid] = useState({});

     const [submitted, setSubmitted] = React.useState(false);
     const title = "Success Notification";
     const description =/**
 * Asynchronously shares a case by processing form data.
 *
 * @param {Object} prevState - The previous state of the form.
 * @param {FormData} fd - The form data to be processed.
 * @returns {Promise<Object>} - An object containing an errors property. 
 *                              The errors property will be null if no errors occurred.
 */

/*************  ✨ Codeium Command ⭐  *************/
/******  9c5407b5-32f6-4ed0-89c6-606814b6e4e7  *******/
       "Your action has been completed successfully. We'll notify you when updates are available.";
   async function shareCaseAction(prevState,fd){ 

   let errors=[];
      const data = Object.fromEntries(fd); 
  console.log(data );
    // data.confirmed=data.confirmed.split(',').sort();
     addCase(data);
    setSubmitted(true)
//const dateString = "2025-01-14T14:48:42.25+02:00[Africa/Cairo]";
return{errors:null}//reset form


  




   


   };
   const [formState,formAction,pending]=useActionState(shareCaseAction,{errors:null})
  

  return (!submitted?
    <Form   validationBehavior="native"
    action={formAction}>
    <div  className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Doctor Selection */}
      <List name="doctor_id" setId={setdoctorid}  ref={inputDoctorRef}  endpoint="doctors" label="Doctor" />

      {/* Patient's Name Input */}
      <Input
     
        isRequired
        errorMessage="Please enter patient Name"
        label="Patient's Name"
        name="patientName"
     defaultValue={formState.enteredValues?.patientName}
        type="text"
       
        variant="bordered"
      />

      {/* Date Input */}
     


         <DatePickers ref={inputDatedRef}   /> 
      
  

         <List name="designer_id" setId={setdesignerid}  endpoint="designers" label="Designer"  
ref={ inputDesignerRef}
/>

{/* Case Definition Selection */}
<List name="case_definition_id"

 ref= {inputCaseDefinitionRef}
 setId={setdefinitionid}  endpoint="case-definition" label="Case Definition" />

{/* Status Input */}
<StatusInput  
 ref={inputStatusRef}
 name="status"  />

{/* Confirmed Input */}
{/* <ConfirmationRadio/> */}

</div>

{/* Submit Button */}
{!pending?
<Button type="submit" variant="solid" color="primary" className="w-full mt-4" disabled={pending}>
Submit
</Button>:<div className="flex justify-between mx-auto gap-4">
     
      <Spinner size="md" />
     
    </div>}
</Form>:<Alert
          color="primary"
          description={description}
        
          title={title}
          variant="faded"
          
        />

);
}

