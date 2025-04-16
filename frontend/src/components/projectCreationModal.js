import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState } from 'react';

export default function ProjectCreationModal() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <div>
      <Button onPress={onOpen}>Add Project</Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="center">
        <ModalHeader className="text-xl">Test Modal</ModalHeader>
        <ModalBody>
          <p className="text-gray-700">This is just a test modal to see if it renders properly.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
