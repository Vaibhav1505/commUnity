import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    CircularProgress,
    Input,
    Button,
    Tooltip,
    useDisclosure,
    Avatar,
    AvatarGroup,
    User,
} from "@nextui-org/react";
import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../../../helpers/axiosInstance";
import DownChevron from "../../../../assets/icons/downChevron";
import FilterHorizontal from "../../../../assets/icons/filterHorizontal";
import { FETCH_PROJECTS, FETCH_USERS_BULK } from "../../../../utils/apiStrings";
import { useNavigate } from "react-router-dom";
import FilterIcon from "../../../../assets/icons/filterIcon";
import AddFiles from "../../../../assets/icons/addFileIcon";
import getProjects from "../../../../backendRequest/getProjects";
import getParticipants from "../../../../backendRequest/getParticipants";
import CreationDrawer from "../../../../globalComponent/creationDrawer";
import ProjectCreationDrawer from "../../../../components/ProjectCreationDrawer";
import ChevronLeft from "../../../../assets/icons/chevronLeft";

export default function ProjectListPage() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [participantsList, setParticipantsList] = useState({}); // Changed to an object
    const [searchQuery, setSearchQuery] = useState("");
    const [projectsLoaded, setProjectsLoaded] = useState(false);

    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();


    const renderCell = useCallback((project, columnKey) => {
        const cellValue = project[columnKey];

        const statusColorMap = {
            complete: "success",
            inprogress: "warning",
            overdue: "danger",
            pending: "warning"
        };

        switch (columnKey) {
            case "title":
                return (
                    <p className="text-white font-bold">{cellValue}</p>
                );
            case "company":
                return (
                    <Chip className="text-white bg-gray font-semibold">{cellValue}</Chip>
                );
            case "assignedTo":
                return (
                    <div className="flex flex-row">
                        {project.assignedTo && project.assignedTo.length > 0 ? (
                            project.assignedTo.map((userId, index) => {
                                const participant = participantsList[userId];
                                return participant ? (
                                    <Tooltip content={
                                        <User
                                            className="p-2 rounded-xl font-xl font-semibold"
                                            avatarProps={{
                                                src: "https://imgs.search.brave.com/dmAjuxH1CB53yfQSWteHMsVDY8q9pfD6gwVqtsJVqO4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC91c2VyLWlj/b24tMjI3eDI1Ni1j/eXJiOXBpNS5wbmc",
                                                isBordered: true
                                            }}
                                            description={participant.email}
                                            name={`${participant.firstname} ${participant.lastname}`}
                                        />} 
                                        placement="bottom">
                                        <Avatar
                                            key={userId}
                                            src={`${participant.firstname}`}
                                            showFallback
                                            name={participant.firstname}
                                            size="sm"
                                            isBordered
                                            className="text-black"
                                        />
                                    </Tooltip>
                                ) : (
                                    <span key={userId}>Loading...</span> 
                                );
                            })
                        ) : (
                            <p className="text-sm text-default-400">No participants assigned</p>
                        )}
                    </div>
                );


            case "completion":
                return (
                    <CircularProgress
                        color="primary"
                        className="text-white"
                        formatOptions={{ style: "percent" }}
                        showValueLabel={true}
                        size="lg"
                        strokeWidth={3}
                        value={cellValue}
                    />
                );
            case "status":
                return (
                    <Chip
                        className="text-white"
                        color={statusColorMap[project.status.toLowerCase()]}
                        size="md"
                        variant="flat"
                    >
                        {cellValue}
                    </Chip>
                );
            case "budget":
                return (
                    <p className="text-lightGray font-semibold">₹{cellValue.toLocaleString()}</p>
                );
            case "startDate":
            case "endDate":
                return (
                    <p className="text-lightGray font-semibold">{new Date(cellValue).toLocaleDateString()}</p>
                );
            default:
                return cellValue;
        }
    }, [participantsList]);

    const columns = [
        { name: "TITLE", uid: "title" },
        { name: "COMPANY", uid: "company" },
        { name: "ASSIGNED TO", uid: "assignedTo" },
        { name: "COMPLETION", uid: "completion" },
        { name: "STATUS", uid: "status" },
        { name: "BUDGET (INR)", uid: "budget" },
        { name: "START DATE", uid: "startDate" },
        { name: "END DATE", uid: "endDate" },
    ];


    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        if (projectsLoaded && data.length > 0) {
            const participantIds = [...new Set(data.flatMap(project => project.assignedTo))];
            fetchProjectParticipants(participantIds);
        }
    }, [projectsLoaded, data]);



    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const response = await getProjects(FETCH_PROJECTS);
            setData(response);
            setIsLoading(false);
            setProjectsLoaded(true);
        } catch (error) {
            console.error("Error in Retrieving Project Data:", error.message);
            setIsLoading(false);
        }
    };

    const fetchProjectParticipants = async (participantIds) => {
        setIsLoading(true);
        try {
            const users = await getParticipants(FETCH_USERS_BULK, participantIds);

            const usersById = users.reduce((acc, user) => {
                acc[user.id] = user;
                return acc;
            }, {});

            setParticipantsList(usersById); 
            setIsLoading(false);
        } catch (error) {
            console.error("Error Getting Project Participants:", error.message);
            setIsLoading(false);
        }
    };

    const filteredData = data.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dark:bg-black p-3">
            {/* Header */}
            <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                                        <Button isIconOnly className="bg-transparent" onClick={() => navigate(-1)}><ChevronLeft /></Button>
                    
                <p className="text-white text-3xl font-bold">All Projects</p>
                </div>
                <div className="space-x-3">
                    <Button
                        className="bg-primary text-white font-semibold"
                        endContent={<FilterIcon />}
                    >
                        Apply Filters
                    </Button>
                    <ProjectCreationDrawer/>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-48">
                    <CircularProgress size="lg" isIndeterminate color="primary" />
                </div>
            ) : (
                <Table
                    aria-label="Example table with custom cells"
                    removeWrapper="true"
                    className="bg-transparent py-3"
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn
                                className="dark:bg-black dark:text-white bg-gray"
                                key={column.uid}
                                align={column.uid === "actions" ? "center" : "start"}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        items={filteredData}
                        emptyContent="No Projects to show"
                        className="dark:bg-black dark:text-white "
                    >
                        {(item) => (
                            <TableRow className="hover:bg-gray hover:rounded-md" onClick={() => {
                                console.log('Navigating to project:', item.id);
                                navigate(`/dashboard/project/${item.id}`)
                            }}
                                key={item.id}>
                                {(columnKey) => (
                                    <TableCell >{renderCell(item, columnKey)}</TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
