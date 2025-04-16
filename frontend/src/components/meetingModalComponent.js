import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, TimeInput, Chip, Select, SelectItem, User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import DateRangeComponent from "./dateRangeComponent";
import axios from "axios";
import { CREATE_MEETING, FETCH_USER } from "../utils/apiStrings";
import ClockIcon from "../assets/icons/clockIcon";

import axiosInstance from "../helpers/axiosInstance";
import getUsers from "../backendRequest/getUsers";

export default function MeetingModalComponent({ isOpen, onOpenChange }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [venue, setVenue] = useState('Remote');
    const [host, setHost] = useState('')
    const [participants, setParticipants] = useState([]);
    const [timing, setTiming] = useState({ hour: 0, minute: 0 });
    const [subject, setSubject] = useState('');
    const [dateRange, setDateRange] = useState({ start: null, ende: null });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => { fetchUser() }, [])

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

    const handleAddEvent = async () => {
        setErrorMessage('');
        setLoading(true);

        if (!name.trim() || !description.trim()) {
            setErrorMessage('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        const eventData = {
            name,
            description,
            venue,
            timing: `${timing.hour.toString().padStart(2, '0')}:${timing.minute.toString().padStart(2, '0')}`,
            participants: participants,
            host,
            startDate,
            endDate,
        };


        const resetForm = () => {
            setName('');
            setDescription('');
            setVenue('Remote');
            setParticipants([]);
            setTiming({ hour: 0, minute: 0 });
            setStartDate('');
            setEndDate('')
        };

        try {
            const response = await axiosInstance.post(CREATE_MEETING, eventData);
            if (response.status >= 200 && response.status < 300) {
                console.log('Event Created:', response.data);
                resetForm();

            } else {
                throw new Error('Failed to create Event');
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error('Error creating Event:', errorMsg);
            setErrorMessage(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
            onOpenChange(false); // Close modal after handling
        }
    };

    return (
        <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Add Event or Meeting</ModalHeader>
                        <ModalBody className="space-y-3">
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <div>
                                <Input
                                    isRequired
                                    placeholder="Enter Event Name"
                                    label="Event Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    labelPlacement="outside"
                                />
                            </div>
                            <div>
                                <Input
                                    isRequired
                                    placeholder="Enter Event Subject"
                                    label="Subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    labelPlacement="outside"
                                />
                            </div>
                            <div>
                                <Input
                                    isRequired
                                    placeholder="Enter Event Description"
                                    label="Event Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    labelPlacement="outside"
                                />
                            </div>
                            <div className="flex space-x-3">

                                <Input
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
                                {/* <TimeInput
                                    labelPlacement="outside"
                                    label="Event Time"
                                    startContent={<ClockIcon />}
                                    value={formattedTime}
                                    onChange={(time) => {
                                        console.log(time);
                                        const [hour, minute] = time.split(':').map(Number);
                                        setTiming({ hour, minute });
                                    }}
                                /> */}


                            </div>
                            <div>
                                <Input
                                    placeholder="Choose Event Location"
                                    label="Event Location"
                                    value={venue}
                                    onChange={(e) => setVenue(e.target.value)}
                                    labelPlacement="outside"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">Select Participants</label>
                                <Select
                                    selectionMode="multiple"
                                    isMultiline
                                    items={users}
                                    label="Choose participants"
                                    placeholder="Add participants in Meeting "
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


                            <div>
                                <p className="text-small font-semibold">Select Host<span className="text-red-600">*</span></p>
                                <Select
                                    className="text-black"
                                    value={host}
                                    onChange={(e) => setHost(Number(e.target.value))}
                                    label="Choose Host"
                                    placeholder="Select the Host in Existing users"
                                    size="md"
                                >
                                    {users.map((user) => (
                                        <SelectItem key={user.userId} value={user.userId}>
                                            <div className="flex items-center">
                                                <User
                                                    className="text-black font-semibold"
                                                    avatarProps={{
                                                        src: "https://imgs.search.brave.com/zyTAkL7N1vZWYN5uSfz2U55G2WCm-9j12OewD7zKjP4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWxldmVuZm9ydW0u/Y29tL2RhdGEvYXR0/YWNobWVudHMvODIv/ODI2MDEtYjQwMThl/Yzk4MzRkOGVjNTUy/NjEwNjJmMDlkNzlj/ZTUuanBnP2hhc2g9/dEFHT3lZTk5qcw"
                                                    }}
                                                    description={user.email}
                                                    name={user.firstName}
                                                />
                                            </div>
                                        </SelectItem>
                                    ))}
                                </Select>
                                {host && (
                                    <div className="mt-2">
                                        {(() => {
                                            const hostUser = users.find((u) => u.userId === host);
                                            if (!hostUser) return null;

                                            return (
                                                <Chip
                                                    variant="flat"
                                                    color="success"
                                                    size="md"
                                                    onClose={() => setHost("")}
                                                    avatar={
                                                        <img
                                                        
                                                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${hostUser.firstName + hostUser.lastName}`}
                                                            alt="host"
                                                            className="w-6 h-6 rounded-full"
                                                        />
                                                    }
                                                >
                                                    {hostUser.firstName} {hostUser.lastName} (Host)
                                                </Chip>
                                            );
                                        })()}
                                    </div>
                                )}

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
        </Modal>
    );
}


