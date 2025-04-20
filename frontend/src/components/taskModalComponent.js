import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Chip, SelectItem, Select, User } from "@nextui-org/react";
import AddIcon from "../assets/icons/addIcon";
import SearchModal from "./searchModal";
import { useEffect, useState } from "react";
import axios from 'axios';
import { CREATE_TASK, FETCH_USER } from "../utils/apiStrings";
import CalenderIcon from "../assets/icons/calenderIcons";
import DeleteIcon from "../assets/icons/deleteIcon";
import axiosInstance from "../helpers/axiosInstance";
import getUsers from "../backendRequest/getUsers";
import createTask from "../backendRequest/createTask";


export default function TaskModalComponent({ isOpen, onOpenChange }) {
    const [users, setUsers] = useState([])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [participants, setParticipants] = useState([]);
    const [newParticipant, setNewParticipant] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    useEffect(() => { fetchUser() }, [])

    const handleAddTask = async () => {
        setErrorMessage('');
        setLoading(true);
        if (!title.trim() || !description.trim() || participants.length === 0 || !startDate || !endDate) {
            setErrorMessage('Please fill in all fields and select valid dates.');
            setLoading(false);
            return;
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start) || isNaN(end)) {
            setErrorMessage('Invalid dates.');
            setLoading(false);
            return;
        }

        const taskData = {
            title,
            description,
            assignedTo: participants,
            startDate: start.toISOString(),
            lastDate: end.toISOString()
        };

        try {
            const response = await createTask(CREATE_TASK, taskData);
            if (response.status >= 200 && response.status < 300) {
                console.log("Task Created:", response.data);
                resetForm();
            } else {
                throw new Error('Failed to create task. Please try again.');
            }
        } catch (error) {
            console.error('Error creating task:', error.response ? error.response.data : error.message);
            setErrorMessage('Error creating task: ' + (error.response ? error.response.data.message : error.message));
        } finally {
            setLoading(false);
            onOpenChange(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setParticipants([]);
        setNewParticipant('');
        setStartDate('');
        setEndDate('');
    };

    const fetchUser = async () => {
        try {
            const response = await getUsers(FETCH_USER)
            setUsers(response.data.User);
        } catch (error) {
            console.error('Failed to fetch users:', error.message);

        }
    }
    const handleRemoveParticipant = (participant) => {
        setParticipants(participants.filter(p => p !== participant));
    };

    return (
        <>
            <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Task</ModalHeader>
                            <ModalBody>
                                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                                <Input
                                    isRequired
                                    autoFocus
                                    label="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Task Title"
                                    type="text"
                                    variant="bordered"
                                />
                                <Input
                                    isRequired
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    label="Description"
                                    placeholder="Task Description"
                                    type="text"
                                    variant="bordered"
                                />
                                <div className="flex flex-col gap-2">

                                    <Select
                                        selectionMode="multiple"
                                        isMultiline
                                        items={users}
                                        label="Choose participants"
                                        placeholder="Add participants in Tasks "
                                        selectedKeys={new Set(participants.map((id) => id.toString()))}
                                        onSelectionChange={(selected) => {
                                            const selectedArray = Array.from(selected).map((id) => id.toString());
                                            setParticipants(selectedArray);
                                        }}
                                        className="max-w-full"
                                    >
                                        {(user) => (
                                            <SelectItem key={user.userId} textValue={user.email}>
                                                <div className="flex items-center gap-2 ">
                                                    <User
                                                        className="text-black font-semibold"
                                                        avatarProps={{
                                                            src: `https://api.dicebear.com/6.x/initials/svg?seed=${user.firstName + user.lastName}`
                                                        }}

                                                        name={user.firstName + " " + user.lastName}
                                                        description={user.email}
                                                    />
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {participants.map((id) => {
                                            const user = users.find((u) => u.userId.toString() === id);
                                            if (!user) return null;
                                            return (
                                                <Chip
                                                    key={id}
                                                    variant="flat"
                                                    size="md"
                                                    color="primary"
                                                    onClose={() => handleRemoveParticipant(id)}
                                                    avatar={
                                                        <img
                                                            src="https://imgs.search.brave.com/zyTAkL7N1vZWYN5uSfz2U55G2WCm-9j12OewD7zKjP4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWxldmVuZm9ydW0u/Y29tL2RhdGEvYXR0/YWNobWVudHMvODIv/ODI2MDEtYjQwMThl/Yzk4MzRkOGVjNTUy/NjEwNjJmMDlkNzlj/ZTUuanBnP2hhc2g9/dEFHT3lZTk5qcw"
                                                            className="w-6 h-6 rounded-full"
                                                            alt="avatar"
                                                        />
                                                    }
                                                >
                                                    {user.firstName} {user.lastName}
                                                </Chip>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="flex space-x-3">
                                    <Input
                                        isRequired
                                        label="Start Date"
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        variant="bordered"
                                    />
                                    <Input
                                        label="End Date"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        variant="bordered"
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={() => onOpenChange(false)}>
                                    Close
                                </Button>
                                <Button
                                    endContent={<AddIcon />}
                                    color="primary"
                                    onPress={handleAddTask}
                                    disabled={loading}
                                >
                                    {loading ? 'Adding...' : 'Add'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <SearchModal isOpen={isSearchModalOpen} onOpenChange={setIsSearchModalOpen} />
        </>
    );
}
