import {
    Card,
    CardHeader,
    CardBody,
    Avatar,
    User,
    Progress,
    Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import LocationIcon from "../../../../../assets/icons/locationIcon";
import LinkIcon from "../../../../../assets/icons/linkIcon";
import CopyIcon from "../../../../../assets/icons/copyIcon";
import GroupIcon from "../../../../../assets/icons/groupIcon";
import EventMembers from "../../EventMeeting/Events/eventMembers";
import ToolTipIconButtonComponent from "../../../../../components/tooltipButtonComponent";
import { FETCH_USERS_BULK } from "../../../../../utils/apiStrings";
import getParticipants from "../../../../../backendRequest/getParticipants";
import RupeeIcon from "../../../../../assets/icons/rupeeIcon";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import AddUserIcon from "../../../../../assets/icons/userAddIcon";
import AddParticipantModal from "../../../../../components/AddParticipantModal";
import AddParticipantDrawer from "../../../../../components/AddParticipantDrawer";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function ProjectDetailAndProgress({ data }) {

    const [participantsList, setParticipantsList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchParticipantsData = async () => {
            if (data.assigned_to && data.assigned_to.length > 0) {
                try {
                    const responses = await getParticipants(FETCH_USERS_BULK, data.assigned_to);
                    const participantsUsers = responses.map(res => ({
                        ...res,
                        imageSrc: "https://imgs.search.brave.com/zyTAkL7N1vZWYN5uSfz2U55G2WCm-9j12OewD7zKjP4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWxldmVuZm9ydW0u/Y29tL2RhdGEvYXR0/YWNobWVudHMvODIv/ODI2MDEtYjQwMThl/Yzk4MzRkOGVjNTUy/NjEwNjJmMDlkNzlj/ZTUuanBnP2hhc2g9/dEFHT3lZTk5qcw"
                    }));
                    setParticipantsList(participantsUsers);
                } catch (error) {
                    console.error("Error fetching Participants of Events", error);
                    setErrorMessage(error.message);
                }
            }
        };

        fetchParticipantsData();
    }, [data.assigned_to]);

    // Improved Chart Data
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Planned Progress',
                data: [5, 15, 25, 35, 45, 55, 65, 75, 85, 90, 95, 100], // Example planned progress
                borderColor: 'rgba(255, 255, 255, 0.5)', // Light gray
                tension: 0.4,
                borderDash: [5, 5], // Make it a dashed line
                pointRadius: 0,  //remove dots
            },
            {
                label: 'Actual Progress',
                data: [3, 12, 28, 32, 48, 51, 68, 72, 88, 91, 94, 98], // Example actual progress
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.4,
                pointRadius: 3, // Keep the points for actual progress
            },
            {
                label: 'Budget Spent',
                data: [2000, 5000, 8000, 11000, 14000, 17000, 20000, 23000, 26000, 29000, 32000, 35000], // Example budget data
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.4,
                yAxisID: 'y1', // Associate this dataset with the second y-axis
                pointRadius: 3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white'
                }
            },
            title: {
                display: true,
                text: 'Project Progress Over Time',
                color: 'white'
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                    color: 'rgb(255, 99, 132)', // Match the budget line color
                    callback: function (value) {
                        return '₹' + value; // Add rupee symbol
                    }
                },
                grid: {
                    drawOnChartArea: false, // Prevent grid lines from overlapping the primary y-axis
                },
            },
        }
    };


    return (
        <div className="p-5 flex  space-x-2 bg-black">
            <div className="w-1/3 space-y-5">
                {/* OVERVIEW */}
                <Card className="bg-gray ">
                    <CardHeader>
                        <div className="flex items-center space-x-2">
                            <RupeeIcon color="white" />
                            <p className="text-white font-semibold text-lg">Budget</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <p className="text-lightGray">{data.budget} INR</p>
                    </CardBody>
                </Card>

                {/* PROGRESS */}
                <Card className="bg-gray flex py-5 px-3">
                    <Progress
                        className=" text-white font-semibold text-lg"
                        color="primary"
                        formatOptions={{ style: "percent", }}
                        label="Completion"
                        maxValue={100}
                        showValueLabel={true}
                        size="md"
                        value={data.completion || 0}
                    />
                </Card>... {/* HOSTED BY AND DURATION */}
                <Card className="bg-gray  py-5 px-3 space-y-5">
                    <div className="flex items-center justify-between">
                        <p className="text-white font-semibold text-lg">Parent Company</p>
                        <div className="flex items-center text-lightGray space-x-2">
                            {data.project_company ? (
                                <User
                                    name={`${data.project_company} `}
                                    avatarProps={{
                                        isBordered: true,
                                        src: `https://api.dicebear.com/6.x/initials/svg?seed=${data.project_company}`
                                    }}
                                />
                            ) : (
                                <Avatar isBordered showFallback name="Unknown Company" src="https://images.unsplash.com/broken" />
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-white font-semibold text-lg">Duration</p>
                        <div className=" text-lightGray space-x-2">
                            <p>
                                {data.startdate && data.enddate
                                    ? `${new Date(data.startdate).toLocaleDateString()} - ${new Date(data.enddate).toLocaleDateString()}`
                                    : 'Not available'}
                            </p>
                        </div>
                    </div>
                </Card>

                {/* VENUE */}
                <Card className="bg-gray  py-5 px-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <LocationIcon color="white" />
                            <p className="text-white font-semibold text-lg">Location</p>
                        </div>
                        <p className="text-lightGray">{"Remote"}</p>
                    </div>
                </Card>


                {/* MEETING LINK */}
                <Card className="bg-gray  py-5 px-3">
                    <div className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                            <LinkIcon color="white" />
                            <p className="text-white font-semibold text-lg">Project Joining Link</p>
                        </div>
                        <ToolTipIconButtonComponent className={'bg-transparent '} icon={<CopyIcon />} tooltipContent={"Copy to Clipboard"} />
                    </div>
                    <p className="text-lightGray py-3">https://search.brave.com/search?q=useParams+vs+useSearchParams&source=desktop&summary=1&conversation=0f112eec77dff9066fd507</p>
                </Card>

                <Card className="bg-gray max-w-full min-w-1/2">
                    <CardHeader className="justify-between">
                        <div className="flex items-center space-x-2">
                            <GroupIcon color={"white"}></GroupIcon>
                            <p className="text-white font-semibold text-lg">Participants</p>
                        </div>
                        
                        <AddParticipantDrawer/>
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

            {/* PARTICIPANTS */}
            <div className="w-1/2">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}
