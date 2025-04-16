import { Card, CardHeader, Button, CardBody } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useDisclosure } from "@nextui-org/react";
import MeetingModalComponent from "../../../../components/meetingModalComponent";
import { DELETE_MEETING, FETCH_MEETINGS } from "../../../../utils/apiStrings";
import MeetingListTile from "../../../../components/meetingListtile";
import FilterHorizontal from "../../../../assets/icons/filterHorizontal";
import axiosInstance from "../../../../helpers/axiosInstance";
import DeleteEventMeeting from "../../../../backendRequest/deleteMeetingEvent";
import getMeetings from "../../../../backendRequest/getMeetings";
import DeleteModal from "../../../../globalComponent/deleteModal";

export default function EventMeetingCard() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');



    useEffect(() => {
        fetchEvents();
    }, []);



    const fetchEvents = async () => {
        try {
            const response = await getMeetings(FETCH_MEETINGS);
            const responseData = response.data;
            // console.log("ResponeData:",responseData)
            if (response.status >= 200 && response.status < 300) {
                setData(responseData.event);

            } else {
                setErrorMessage(responseData.message);
            }
        } catch (error) {
            console.error("Error in Retrieving Events", error);
            setErrorMessage("Failed to load events.");
        } finally {
            setLoading(false);
        }
    };

    const deleteMeetingEvent = async (id) => {
        try {

            console.log(`Line 49 Meeting to be deleted:${id}`)
            const response = await DeleteEventMeeting(DELETE_MEETING,{ meetingId: id })

            if (response.status >= 200 && response.status < 300) {
                console.log("Event or Meeting Deleted Successfully!");
                fetchEvents();
            } else {
                console.log("Error deleting Meeting. Please try again.");
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.log("Error Deleting Meeting or Event, Please Try again!", error.message)
        }
    }

    return (
        <>
            <Card className="bg-darkGray shadow-lg flex flex-col justify-between p-4 h-full">
                <CardHeader className="flex justify-between">
                    <div>
                        <p className="font-extrabold text-xl text-white">Meetings and Events</p>
                        {/* <p className="text-white text-sm">Manage your events and meetings efficiently.</p> */}
                    </div>
                    <div className="flex gap-4">
                        
                        <Button
                            onPress={onOpen}
                            className="bg-primary text-white font-semibold"
                            aria-label="Create a new event"
                            aria-expanded={isOpen}
                        >
                            Manage and view Events and Meetings
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="space-y-3 overflow-auto h-72">
                    {loading ? (
                        <p className="text-white text-center">Loading...</p>
                    ) : data.length > 0 ? (
                        data.map((event) => (
                            <MeetingListTile
                                key={event.meeting_id}
                                eventId={event.meeting_id}
                                eventName={event.meeting_title}
                                startDate={event.startDate}
                                deleteFunction={deleteMeetingEvent}
                            />
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-2xl text-white font-extrabold">No meetings available.</p>
                        </div>
                    )}
                </CardBody>
                <MeetingModalComponent isOpen={isOpen} onOpenChange={onClose} />
            </Card>


        </>
    );
}