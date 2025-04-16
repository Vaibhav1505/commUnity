// SearchModal.js
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useState } from "react";

export default function SearchModal({ModalHeaderContent,ModalFooterButtonContent, isOpen, onOpenChange }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log("Searching for:", searchTerm);
    };

    return (
        <Modal  size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader>{ModalHeaderContent}</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Search"
                                placeholder="Type to search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                           
                            <Button color="primary" onPress={handleSearch}>
                                {ModalFooterButtonContent}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}