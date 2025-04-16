import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from "@nextui-org/react";

export default function DeleteModal({ isOpen, onOpenChange, modalHeader, modalDescription, onConfirmDelete, isDeleting }) {
    return <Modal
        size="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description">
        <ModalContent>
            <ModalHeader id="confirm-modal-title">
                {modalHeader}
            </ModalHeader>
            <ModalBody
                id="confirm-modal-description">
                <p className="text-black">{modalDescription}</p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="solid" onPress={onConfirmDelete} disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Yes"}
                </Button>
                <Button onPress={() => onOpenChange(false)}>
                    No
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}