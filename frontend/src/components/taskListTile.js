import {
    Card,
    Chip,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import { User as UserTag } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";

import ClockIcon from "../assets/icons/clockIcon";
import DeleteIcon from "../assets/icons/deleteIcon";
import PencilIcon from "../assets/icons/pencilIcon";
import InformationIcon from "../assets/icons/informationIcon";
import DownChevron from "../assets/icons/downChevron";
import CheckIcon from "../assets/icons/checkIcon";
import ArrowIconUp from "../assets/icons/arrowIconUp";

import DropdownComponent from "./dropdownComponent";
import ToolTipIconButtonComponent from "./tooltipButtonComponent";
import DeleteModal from "../globalComponent/deleteModal";

import { DELETE_TASK, FETCH_USER_BY_ID, FETCH_USERS_BULK, UPDATE_TASK_STATUS } from "../utils/apiStrings";
import axiosInstance from "../helpers/axiosInstance";
import DeleteTask from "../backendRequest/deleteTask";
import getParticipants from "../backendRequest/getParticipants";

export default function TaskListTile({
    taskID,
    title,
    description,
    startDate,
    lastDate,
    participants,
    taskStatus,
}) {

    const statusColorMap = {
        completed: "success",
        pending: "warning",
        inprogress: "warning",
    };

    const [participantsList, setParticipantsList] = useState([]);
    const [status, setStatus] = useState(taskStatus || "Pending");
    const [isDeleting, setIsDeleting] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const { isOpen: isDetailsOpen, onOpenChange: onDetailsOpenChange } = useDisclosure();
    const { isOpen: isConfirmOpen, onOpenChange: setConfirmOpen } = useDisclosure();

    useEffect(() => {
        if (participants?.length > 0) {
            fetchParticipantsList();
        }
    }, [participants]);

    const fetchParticipantsList = async () => {
        try {
            const users = await getParticipants(FETCH_USERS_BULK, participants);
            const mappedUsers = users.map(user => ({
                ...user,
                firstName: user.firstname,
                lastName: user.lastname,
                imageSrc: user.imageURL || `https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}`
            }));

            setParticipantsList(mappedUsers);
            setParticipantsList(users);
        } catch (error) {
            console.log("Error fetching participants:", error.message);
        }
    };


    const updateTaskStatus = async (newStatus) => {
        setUpdatingStatus(true);
        try {
            const response = await axiosInstance.put(`${UPDATE_TASK_STATUS}/${taskID}`, { status: newStatus });
            if (response.status >= 200 && response.status < 300) {
                setStatus(newStatus);
                console.log("Task updated successfully.");
            }
        } catch (error) {
            console.error("Error updating task status:", error.message);
        } finally {
            setUpdatingStatus(false);
        }
    };

    const deleteTask = async () => {
        setIsDeleting(true);
        try {
            const response = await DeleteTask(DELETE_TASK, { taskId: taskID });
            if (response.status >= 200 && response.status < 300) {
                console.log("Task deleted.");
            }
        } catch (error) {
            console.error("Error deleting task:", error.message);
        } finally {
            setIsDeleting(false);
            setConfirmOpen(false);
        }
    };

    return (
        <>
            <Card
                isPressable
                className="bg-black w-full shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-200 rounded-lg border border-gray-700"
                onPress={() => onDetailsOpenChange(true)}
            >
                <div className="flex justify-between items-center px-6 py-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                            <p className="text-lg font-semibold text-white truncate">{title}</p>
                            <div className="text-sm text-white">
                                <span className="font-medium">{startDate || "No Start Date"}</span> -{" "}
                                <span className="font-medium">{lastDate || "No End Date"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="ml-4 space-x-3 flex items-center">
                        <DropdownComponent
                            dropDownTriggerButtonTitle={"Status"}
                            dropDownTriggerButtonEndContent={<DownChevron color={"white"} />}
                            firstButtonText={"Complete"}
                            firstButtonStartContent={<CheckIcon />}
                            secondButtonText={"Pending"}
                            secondButtonStartContent={<ClockIcon />}
                            thirdButtonText={"InProgress"}
                            thirdButtonStartContent={<ArrowIconUp />}
                            firstButtonOnClick={() => updateTaskStatus("Completed")}
                            secondButtonOnClick={() => updateTaskStatus("Pending")}
                            thirdButtonOnClick={() => updateTaskStatus("In Progress")}
                            disabled={updatingStatus}
                        />

                        <ToolTipIconButtonComponent
                            className="bg-transparent hover:bg-primary"
                            icon={<PencilIcon />}
                            placement="top"
                            tooltipContent={"Edit"}
                        />

                        <ToolTipIconButtonComponent
                            className="bg-transparent hover:bg-primary"
                            icon={<InformationIcon />}
                            tooltipContent={"Task Details"}
                            placement="top"
                            onClick={() => onDetailsOpenChange(true)}
                        />

                        <ToolTipIconButtonComponent
                            className="bg-transparent hover:bg-danger"
                            icon={<DeleteIcon color="white" />}
                            placement="top"
                            tooltipContent={"Delete"}
                            onClick={() => setConfirmOpen(true)}
                        />
                    </div>
                </div>
            </Card>

            {/* Details Modal */}
            <Modal size="xl" isOpen={isDetailsOpen} onOpenChange={onDetailsOpenChange}>
                <ModalContent className="overflow-y-auto max-h-[80vh]">
                    <ModalHeader>
                        <div className=" flex space-x-3 text-gray-900">
                            <p>Task Details</p>
                            <Chip className="font-semibold" color={statusColorMap[status.toLowerCase()]}>{status}</Chip>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <p><strong>Title:</strong> {title}</p>
                        <p><strong>Description:</strong> {description}</p>
                        <p><strong>Start Date:</strong> {startDate}</p>
                        <p><strong>End Date:</strong> {lastDate}</p>
                        <p><strong>Participants:</strong></p>
                        <div className="flex flex-wrap gap-2">
                            <div className="flex flex-wrap gap-2">
                                {participantsList.length > 0 ? (
                                    participantsList.map((participant, idx) => (
                                        <UserTag
                                            key={idx}
                                            className="border-1 p-2 text-white rounded-full bg-black"
                                            name={`${participant.firstname} ${participant.lastname}`}
                                            description={participant.email}
                                            avatarProps={{ src: participant.imageSrc, size: "sm", isBordered: true }}
                                        />

                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No participants assigned</p>
                                )}
                            </div>


                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => onDetailsOpenChange(false)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Confirm Deletion Modal */}
            <DeleteModal
                isOpen={isConfirmOpen}
                onOpenChange={setConfirmOpen}
                modalHeader="Confirm Deletion"
                modalSubTitle={`Are you sure you want to delete the task "${title}"?`}
                onConfirmDelete={deleteTask}
                isDeleting={isDeleting}
            />
        </>
    );
}

TaskListTile.propTypes = {
    taskID: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    lastDate: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.number).isRequired,
    taskStatus: PropTypes.string,
};
