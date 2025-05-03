import { Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Select, SelectItem, User, Chip, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axiosInstance from "../helpers/axiosInstance";
import CreateTean from "../backendRequest/createTeam";
import { CREATE_TEAM, FETCH_USER } from "../utils/apiStrings";
import getUsers from "../backendRequest/getUsers";

export default function TeamCreationModal({ isOpen, onOpenChange }) {

    const [errorMessage, setErrorMessage] = useState('');
    const [host, setHost] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [participants, setParticipants] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => { fetchUser() }, [])

    const fetchUser = async () => {
        try {
            const response = await getUsers(FETCH_USER)
            setUsers(response.data.User);
        } catch (error) {
            console.error('Failed to fetch users:', error.message);

        }
    }





    const handleAddEvent = async () => {
        setErrorMessage('')
        setLoading(true)

        if (!name.trim() || !description.trim()) {
            setErrorMessage('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        try {
            const teamData = {
                name,
                description,
                host,
                members: participants,
            }

            const response = await CreateTean(CREATE_TEAM, teamData);
            setLoading(false)
            setName('')
            setDescription('')
        } catch (error) {
            console.log("Unable to create Team")
            setErrorMessage(error.message);
            setLoading(false)
        }
    }

    const handleRemoveParticipant = () => {

    }




    return <Modal size="2xl" onOpenChange={onOpenChange} isOpen={isOpen}>
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">
                        Add Event or Meeting
                    </ModalHeader>
                    <ModalBody className="space-y-3">
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                        <div>
                            <Input
                                isRequired
                                placeholder="Enter Team Name"
                                label="Team Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                labelPlacement="outside"
                            />
                        </div>

                        <div>
                            <Input
                                isRequired
                                placeholder="Enter Team Description"
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                labelPlacement="outside"
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button
                            color="primary"
                            onPress={handleAddEvent}
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Event'}
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal >
};
