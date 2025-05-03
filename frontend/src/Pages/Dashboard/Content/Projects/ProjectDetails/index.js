import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import getProjectDetails from "../../../../../backendRequest/getProjectDetails";
import { FETCH_PROJECT_DETAILS } from "../../../../../utils/apiStrings";
import { Button, Tab, Tabs } from "@nextui-org/react";
import ChatIcon from "../../../../../assets/icons/chatIcon";
import InformationIcon from "../../../../../assets/icons/informationIcon";
import DocumentIcon from "../../../../../assets/icons/documentIcon"
import VideoCallIcon from "../../../../../components/videoCallIcon";
import PhoneIcon from "../../../../../assets/icons/phoneIcon";
import ProjectChat from "./chat";
import ProjectDetailAndProgress from "./detailsAndProgress";
import ProjectFiles from "./files";
import ChevronLeft from "../../../../../assets/icons/chevronLeft";



export default function ProjectDetails() {

    const { projectId } = useParams();
    const [projectData, setProjectData] = useState({});
    const [error, setError] = useState('')
    const [selected, setSelected] = useState("Chat")

    const navigate = useNavigate();


    useEffect(
        () => { fetchProjectDetails() },
        []);

    const fetchProjectDetails = async () => {
        try {
            const response = await getProjectDetails(FETCH_PROJECT_DETAILS(projectId));
            const responseData = response.data;
            setProjectData(responseData.project);
        } catch (error) {
            console.log("Error fetching Project Detail with ID:", projectId);
            setError(error.message)
        }
    }

    return <div className="flex bg-black">
        <div className="flex flex-col w-full">
            <div className="flex justify-between border-b-2 px-5 py-3 items-center">
                <div className="flex items-center">

                    <Button isIconOnly className="bg-transparent" onClick={() => navigate(-1)}><ChevronLeft /></Button>
                    <div>
                        <p className="text-2xl font-bold text-white">{projectData.project_title}</p>
                        <p className="text-lightGray text-sm">Project Details</p>
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
                    <Tab key={"detailProgress"} title={<div className="flex items-center space-x-2">
                        <InformationIcon />
                        <span className="text-white">Detail and Progress</span>
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
                    <Button
                        className="bg-primary text-white font-semibold"
                        startContent={<PhoneIcon color="white" />}
                    >
                        Voice Call
                    </Button>
                </div>
            </div>


            {/*TAB CONTENT */}
            <div className='flex-grow'>
                {
                    selected === 'Chat' && <ProjectChat projectId={projectId} />
                }

                {
                    selected === 'detailProgress' && <ProjectDetailAndProgress data={projectData} />
                }

                {
                    selected === 'Files' && <ProjectFiles projectData={projectData} />
                }
            </div>
        </div>
    </div>
};
