import { Card, CardBody, CardHeader, Progress, Avatar, User,Button } from "@nextui-org/react";
import DocumentIcon from "../../../../../../assets/icons/documentIcon";
import GroupIcon from "../../../../../../assets/icons/groupIcon";
import EventMembers from "../eventMembers";
import LocationIcon from "../../../../../../assets/icons/locationIcon";
import GetMeetingHostById from "../../../../../../backendRequest/getMeetingHostById";
import { FETCH_USER_BY_ID, FETCH_USERS_BULK } from "../../../../../../utils/apiStrings";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../helpers/axiosInstance";
import LinkIcon from "../../../../../../assets/icons/linkIcon";
import ToolTipIconButtonComponent from "../../../../../../components/tooltipButtonComponent";
import CopyIcon from "../../../../../../assets/icons/copyIcon";
import getParticipaints from "../../../../../../backendRequest/getParticipants";
import AddIcon from "../../../../../../assets/icons/addIcon";
import AddUserIcon from "../../../../../../assets/icons/userAddIcon";

export default function EventInformation({ data }) {
    const [hostData, setHostData] = useState({});
    const [participants, setParticipants] = useState({});
    const [participantsList, setParticipantsList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            if (data.hostid) await fetchEventHostDetails();
            if (data.participants?.length > 0) await getParticipaintsList(data.participants);
            setIsLoading(false);
        };
        loadData();
    }, [data.hostid, data.participants]);




    const fetchEventHostDetails = async () => {
        try {
            const response = await GetMeetingHostById(FETCH_USER_BY_ID(data.hostid));
            setHostData(response.data.userInfo);
        } catch (error) {
            console.log("Error fetching Event Host Details");
            setErrorMessage(error.message)
        }
    }

    const getParticipaintsList = async (participantIds) => {
        try {
            const responses = await getParticipaints(FETCH_USERS_BULK, participantIds);
            const participantsUsers = responses.map(res => ({
                ...res,
                imageSrc:
                    "https://imgs.search.brave.com/zyTAkL7N1vZWYN5uSfz2U55G2WCm-9j12OewD7zKjP4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWxldmVuZm9ydW0u/Y29tL2RhdGEvYXR0/YWNobWVudHMvODIv/ODI2MDEtYjQwMThl/Yzk4MzRkOGVjNTUy/NjEwNjJmMDlkNzlj/ZTUuanBnP2hhc2g9/dEFHT3lZTk5qcw"
            }));
            setParticipantsList(participantsUsers);
        } catch (error) {
            console.error("Error fetching Participants of Events", error);
            setErrorMessage(error.message);
        }
    };




    return (
        <div className="p-5 flex space-x-4 bg-black">
            <div className="w-1/2 space-y-5">
                {/* OVERVIEW */}
                <Card className="bg-gray ">
                    <CardHeader>
                        <div className="flex items-center space-x-2">
                            <DocumentIcon color="white" />
                            <p className="text-white font-semibold text-lg">Description</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p className="text-lightGray">{data.meeting_description}</p>
                    </CardBody>
                </Card>

                {/* PROGRESS */}
                <Card className="bg-gray flex py-5 px-3">
                    <Progress
                        className=" text-white font-semibold text-lg"
                        color="primary"
                        formatOptions={{ style: "percent", }}
                        label="Completion"
                        maxValue={10000}
                        showValueLabel={true}
                        size="md"
                        value={4000}
                    />
                </Card>

                {/* HOSTED BY AND DURATION */}
                <Card className="bg-gray flex py-5 px-3 space-y-5">
                    <div className="flex items-center justify-between">
                        <p className="text-white font-semibold text-lg">Hosted By</p>
                        <div className="flex items-center text-lightGray space-x-2">
                            {hostData.firstname && hostData.lastname ? (
                                <User
                                    description={hostData.email}
                                    name={`${hostData.firstname} ${hostData.lastname}`}
                                    avatarProps={{
                                        isBordered: true,
                                        src: `https://api.dicebear.com/6.x/initials/svg?seed=${hostData.firstname}`
                                    }}
                                />

                            ) : (
                                <Avatar isBordered showFallback name="Unknown Host" src="https://images.unsplash.com/broken" />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-white font-semibold text-lg">Duration</p>
                        <div className=" text-lightGray space-x-2">
                            <p>
                                {data.startdate && data.enddate
                                    ? `${new Date(data.startdate).toLocaleString()} - ${new Date(data.enddate).toLocaleString()}`
                                    : 'Not available'}
                            </p>

                        </div>
                    </div>
                </Card>

                {/* VENUE */}
                <Card className="bg-gray flex py-5 px-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <LocationIcon color="white" />
                            <p className="text-white font-semibold text-lg">Location</p>
                        </div>
                        <p className="text-lightGray">{data.venue}</p>
                    </div>
                </Card>

                {/* MEETING LINK */}
                <Card className="bg-gray flex py-5 px-3">
                    <div className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                            <LinkIcon color="white" />
                            <p className="text-white font-semibold text-lg">Meeting Link</p>

                        </div>
                        <ToolTipIconButtonComponent className={'bg-transparent '} icon={<CopyIcon />} tooltipContent={"Copy to Clipboard"} />
                    </div>
                    <p className="text-lightGray py-3">https://search.brave.com/search?q=useParams+vs+useSearchParams&source=desktop&summary=1&conversation=0f112eec77dff9066fd507</p>
                </Card>
            </div>

            {/* PARTICIPANTS */}
            <div className="w-1/2 h-screen">
                <Card className="bg-gray ">
                    <CardHeader className="flex justify-between">
                        <div className="flex items-center space-x-2">
                            <GroupIcon color={"white"}></GroupIcon>
                            <p className="text-white font-semibold text-lg">Participants</p>
                        </div>
                        <Button isIconOnly className="bg-primary"><AddUserIcon/></Button>
                    </CardHeader>
                    <CardBody>
                        {Array.isArray(participantsList) && participantsList.length > 0 ? (
                            <EventMembers eventUsers={participantsList} />
                        ) : (
                            <p className="text-lightGray">No participants yet.</p>
                        )}
                    </CardBody>




                </Card>
            </div>
        </div>
    );
}
