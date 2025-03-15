'use client'
import React from "react";
import {Form, Input, Button, Spinner, Alert} from "@heroui/react";
import {useActionState} from 'react';

export default function CaseDefinitionForm({ endpoint,onCaseDefinitionAdded }) {
  const [submitted, setSubmitted] = React.useState(false);
  const title = "Success Notification";
  const description = `${endpoint}has been added successfully.`;
  
  async function addCaseDefinitionAction(prevState, fd) { 

    let errors = [];
    const data = Object.fromEntries(fd); 
    console.log(data);
    
    // Here you would add the case definition to your database
    // For example: await addCaseDefinition(data.caseDefinitionName);
    
    if(onCaseDefinitionAdded) {
      onCaseDefinitionAdded({
        id: Math.random().toString(36).substr(2, 9),
        name: data.caseDefinitionName
      });
    }
    
    setSubmitted(true);
    
    // Optional: Reset form after some time
    // setTimeout(() => {
    //   setSubmitted(false);
    // }, 3000);
    
    return {errors: null}; //reset form
  }
  
  const [formState, formAction, pending] = useActionState(addCaseDefinitionAction, {errors: null});
  
  return (
    <div className="py-4">
      <h2 className="text-xl font-semibold mb-4">Add New {endpoint}</h2>
      
      {!submitted ? (
        <Form validationBehavior="native" action={formAction}>
          {/* Case Definition Name Input */}
          <Input
            isRequired
            errorMessage="Please enter case definition name"
            label="Case Definition Name"
            name="caseDefinitionName"
            defaultValue={formState.enteredValues?.caseDefinitionName}
            type="text"
            variant="bordered"
            autoFocus
          />
          
          {/* Submit Button */}
          {!pending ? (
            <Button type="submit" variant="solid" color="primary" className="w-full mt-4" disabled={pending}>
              Add {endpoint}
            </Button>
          ) : (
            <div className="flex justify-center mx-auto gap-4 mt-4">
              <Spinner size="md" />
            </div>
          )}
        </Form>
      ) : (
        <Alert
          color="primary"
          description={description}
          title={title}
          variant="faded"
        />
      )}
    </div>
  );
}