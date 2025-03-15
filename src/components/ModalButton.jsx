import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function ModalButton({endContent,children}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
       
          <Button
          endContent={endContent}
            className="capitalize"
            color="primary"
            variant="flat"
            onPress={() => handleOpen("blur")}
          >
            Add New
          </Button>
           </div>
      <Modal size={'2xl'} backdrop={backdrop} isOpen={isOpen} className="p-8" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
          
              <ModalBody>
         {children }
         <Button    color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalBody>
        
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

