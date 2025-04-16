import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { useState } from 'react';
import AddUserIcon from "../assets/icons/userAddIcon";

export default function AddParticipantModal() {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <>
           <Button isIconOnly className="bg-primary" onClick={onOpen}><AddUserIcon /></Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalHeader>
                    Add Participant
                </ModalHeader>
                <ModalBody>
                    {/* Add your form elements here */}
                    <p>Modal body content goes here.</p>
                </ModalBody>
                <ModalFooter>
                    <Button className="bg-primary font-semibold" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
