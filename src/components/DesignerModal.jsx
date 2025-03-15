'use client'
import React from "react";
import {Form, Input, Button, Spinner, Alert, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@heroui/react";
import {useActionState} from 'react';
import { useState } from "react";

export default function DesignerModal({isOpen, onClose, onDesignerAdded}) {
  const [submitted, setSubmitted] = React.useState(false);
  const title = "Success Notification";
  const description = "Designer has been added successfully.";
  
  async function addDesignerAction(prevState, fd) { 
    let errors = [];
    const data = Object.fromEntries(fd); 
    console.log(data);
    
    // Here you would add the designer to your database
    // For example: await addDesigner(data.designerName);
    
    if(onDesignerAdded) {
      onDesignerAdded({
        id: Math.random().toString(36).substr(2, 9),
        name: data.designerName
      });
    }
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
    
    return {errors: null}; //reset form
  }
  
  const [formState, formAction, pending] = useActionState(addDesignerAction, {errors: null});
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add New Designer</ModalHeader>
        <ModalBody>
          {!submitted ? (
            <Form validationBehavior="native" action={formAction}>
              {/* Designer Name Input */}
              <Input
                isRequired
                errorMessage="Please enter designer name"
                label="Designer Name"
                name="designerName"
                defaultValue={formState.enteredValues?.designerName}
                type="text"
                variant="bordered"
                autoFocus
              />
              
              {/* Submit Button */}
              {!pending ? (
                <Button type="submit" variant="solid" color="primary" className="w-full mt-4" disabled={pending}>
                  Add Designer
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
        </ModalBody>
        {!submitted && (
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}