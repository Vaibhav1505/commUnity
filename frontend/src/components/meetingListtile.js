import { Card, Chip, Button, Calendar, useDisclosure } from "@nextui-org/react";
import PencilIcon from "../assets/icons/pencilIcon";
import DeleteIcon from "../assets/icons/deleteIcon";
import CalenderIcon from "../assets/icons/calenderIcons";
import ToolTipIconButtonComponent from "./tooltipButtonComponent";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import DeleteModal from "../globalComponent/deleteModal";


export default function MeetingListTile({ eventId, eventName, startDate, deleteFunction }) {

    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const formattedStartDate = startDate ? new Date(startDate).toLocaleString() : "No Start Date";

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deleteFunction(eventId);
            setIsDeleting(false);
            onOpenChange(false);
        } catch (error) {
            setIsDeleting(false)
            onOpenChange();
        }
    }


    return (
        <Card
            isPressable
            key={eventId}
            onPress={() => {
                navigate(`/dashboard/eventsAndMeetings/?meetingId=${eventId}`)
            }}
            className="w-full bg-black shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg p-4 space-y-5">
            <div className="flex justify-between">
                <div className="">
                    <p className="font-semibold text-lg text-white truncate">{eventName || "Demo Event"}</p>
                    <div>
                        <span className="font-medium text-sm text-white">{formattedStartDate}</span>

                    </div>
                </div>
                <div className="flex space-x-3 items-center">
                    {/* <Button
                        className="font-semibold text-white bg-black hover:bg-primary "
                        variant="flat">
                        Join
                    </Button> */}

                    <ToolTipIconButtonComponent
                        className={"bg-transparent hover:bg-danger"}
                        placement='top'
                        onClick={onOpen}
                        icon={<DeleteIcon color={"white"}></DeleteIcon>}
                        tooltipContent={"Delete Meeting"}>
                    </ToolTipIconButtonComponent>

                    <ToolTipIconButtonComponent
                        className={"bg-transparent hover:bg-primary"}
                        placement='top'
                        icon={<PencilIcon></PencilIcon>}
                        tooltipContent={"Edit Meeting"}>
                    </ToolTipIconButtonComponent>

                    {/* <ToolTipIconButtonComponent
                        className={"bg-transparent hover:bg-primary"}
                        placement='top'
                        icon={<CalenderIcon></CalenderIcon>}
                        tooltipContent={"Add meeting to Calender"}>
                    </ToolTipIconButtonComponent> */}
                </div>
            </div>

            <DeleteModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onConfirmDelete={handleDelete}
                isDeleting={isDeleting}
                modalHeader={`Delete ${eventName}`}
                modalDescription="Are you sure you want to delete this meeting? This action cannot be undone."
            />
        </Card>
    );
}