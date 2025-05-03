import { Button, Input, Tabs, Tab } from "@nextui-org/react";
import EventMembers from "../eventMembers";
import VideoCallIcon from "../../../../../../components/videoCallIcon";
import PhoneIcon from "../../../../../../assets/icons/phoneIcon";
import { useEffect, useState } from "react";
import getMeetingDetails from '../../../../../../backendRequest/getMeetingDetails'
import { FETCH_MEETING_DETAIL } from "../../../../../../utils/apiStrings";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ChatIcon from "../../../../../../assets/icons/chatIcon";
import InformationIcon from "../../../../../../assets/icons/informationIcon";
import DocumentIcon from "../../../../../../assets/icons/documentIcon";
import EventChat from "./chat";
import EventInformation from "./information";
import EventFiles from "./file";
import ChevronLeft from "../../../../../../assets/icons/chevronLeft";

export default function EventMeetingDetail() {

    const [searchParams] = useSearchParams();
    const eventId = searchParams.get("meetingId")
    const [response, setResponse] = useState({});
    const [selected, setSelected] = useState("Chat")

    const navigate= useNavigate();

    useEffect(() => {
        fetchMeetingDetails()
    }, [eventId])

    const fetchMeetingDetails = async () => {
        try {
            const response = await getMeetingDetails(`${FETCH_MEETING_DETAIL(eventId)}`);
            setResponse(response.data.meetingInfo)
        } catch (error) {
            console.log("There is an Error getting MeetingDetails")
        }
    }


    return (
        <div className="flex bg-black">
            <div className="flex bg-gray h-screen w-full">
                <div className="flex flex-col w-full">

                    {/* Header */}
                    <div className="flex justify-between border-b-2 p-5 items-center bg-black">
                        <div className="flex items-center">
                            <Button isIconOnly className="bg-transparent" onClick={() => navigate(-1)}><ChevronLeft /></Button>

                            <div>
                                <p className="text-2xl font-bold text-white">{response.meeting_title}</p>
                                <p className="text-sm text-lightGray">Event and Meeting Details</p>
                            </div>
                        </div>
                        <Tabs
                            size="lg"
                            color="primary"
                            variant="bordered"
                            className=""
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                        >
                            <Tab key={"Chat"} title={<div className="flex items-center space-x-2">
                                <ChatIcon color={'white'} />
                                <span className="text-white">Chats</span>
                            </div>} />
                            <Tab key={"Information"} title={<div className="flex items-center space-x-2">
                                <InformationIcon />
                                <span className="text-white">Information</span>
                            </div>} />
                            <Tab key={"Files"} title={<div className="flex items-center space-x-2">
                                <DocumentIcon />
                                <span className="text-white">FIles</span>
                            </div>} />
                        </Tabs>

                        <div className="flex space-x-3">
                            <a href="https://meet.google.com/landing">
                            <Button
                                className="bg-primary text-white font-semibold"
                                startContent={<VideoCallIcon />}
                            >
                                Video Call
                            </Button>
                            </a>
                            {/* <Button
                                className="bg-primary text-white font-semibold"
                                startContent={<PhoneIcon color="white" />}
                            >
                                Voice Call
                            </Button> */}
                        </div>
                    </div>



                    {/* TAB CONTENT */}
                    <div className='flex-grow overflow-hidden bg-black'>
                        {
                            selected === 'Chat' && <EventChat />
                        }

                        {
                            selected === 'Information' && <EventInformation data={response} />
                        }

                        {
                            selected === 'Files' && <EventFiles projectData={response}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
