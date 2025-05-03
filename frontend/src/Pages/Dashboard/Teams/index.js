import { Input, Button, User, Card, CardHeader, CardBody, CardFooter, Tab, Tabs, InputOtp,  } from "@nextui-org/react";
import { useEffect, useState } from "react";
import SearchIcon from "../../../assets/icons/searchIcon";
import HashIcon from "../../../assets/icons/hashIcon";
import GroupIcon from "../../../assets/icons/groupIcon";
import RectangleGroupIcon from "../../../assets/icons/rectangleGroupIcon";
import TeamCreationModal from "../../../components/teamCreationModal";
import GetTeams from "../../../backendRequest/getTeams";
import { FETCH_TEAMS } from "../../../utils/apiStrings";
import AddIcon from "../../../assets/icons/addIcon";
import MoreIcon from "../../../assets/icons/moreIcon";

export default function TeamsPage() {
    const [teams, setTeams] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showTeamActions, setShowTeamActions] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState('All')
    const [value,setValue]=useState('')

    useEffect(() => { fetchTeams(); }, []);

    const fetchTeams = async () => {
        try {
            const response = await GetTeams(FETCH_TEAMS);
            setTeams(response);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    // Handle "New" button click
    const handleNewClick = () => {
        setShowTeamActions(true);
    };

    // Handle click on a team (show info message again)
    const handleTeamClick = () => {
        setShowTeamActions(false);
    };

    // Modal open/close handler
    const handleModalOpenChange = (open) => setIsModalOpen(open);

    return (
        <div className="flex h-screen">
            {/* LEFT SIDEBAR */}
            <div className="w-1/3 h-screen border-r-2 border-gray p-4">
                <div className="flex justify-between items-center py-3">

                    <p className="font-bold text-3xl text-white">Teams</p>
                    <Tabs
                        size="md"
                        color="primary"
                        variant="bordered"
                        className=""
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                    >
                        <Tab key={"All"} title={<div className="flex items-center space-x-2">
                            <span className="text-white">All</span>
                        </div>} />
                        <Tab key={"Shown"} title={<div className="flex items-center space-x-2">
                            <span className="text-white">Shown</span>
                        </div>} />
                        <Tab key={"Hidden"} title={<div className="flex items-center space-x-2">
                            <span className="text-white">Hidden</span>
                        </div>} />
                    </Tabs>

                    <Button
                        startContent={<AddIcon />}
                        className="bg-primary text-white font-semibold"
                        onPress={handleNewClick}
                    >
                        New
                    </Button>
                </div>
                <Input
                    className="py-3"
                    placeholder="Search or find a team"
                    startContent={<SearchIcon color="black" />}
                />

                {/* List of Teams */}
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className="w-full block hover:bg-gray hover:cursor-pointer rounded-xl flex justify-between items-center no-underline"
                        onClick={handleTeamClick}
                    >
                        <User
                            className="text-white font-semibold py-3"
                            avatarProps={{
                                showFallback: true,
                                isBordered: true,
                                src: `https://api.dicebear.com/6.x/initials/svg?seed=${team.name}`
                            }}
                            name={team.name}
                            description={team.description}
                        />
                        <Button isIconOnly className="bg-transparent"><MoreIcon/></Button>
                    </div>
                ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="w-2/3 h-screen flex flex-col justify-center items-center">
                {showTeamActions ? (
                    <div className="flex flex-col items-center space-y-5">
                        <p className="text-4xl text-white font-bold text-center">Join or Create a New according to your needs.</p>
                        <div className="flex space-x-5">
                            {/* JOIN TEAM VIA CODE */}
                            <Card className="bg-darkGray flex flex-col items-center p-3 w-60">
                                <CardHeader className="flex justify-center">
                                    <div className="bg-gray p-6 rounded-xl">
                                        <HashIcon color={"white"} />
                                    </div>
                                </CardHeader>
                                <CardBody className="space-y-3">
                                    <p className="text-white font-semibold">Join a Team With a Code</p>
                                    <InputOtp length={4} value={value} onValueChange={setValue} />

                                </CardBody>
                                <CardFooter>
                                    <Button className='bg-primary text-white font-semibold w-full'>Add Team</Button>
                                </CardFooter>
                            </Card>
                            {/* CREATE OWN TEAM */}
                            <Card className="bg-darkGray flex flex-col items-center p-3 w-60">
                                <CardHeader className="flex justify-center">
                                    <div className="bg-gray p-6 rounded-xl">
                                        <GroupIcon size={42} color="white" />
                                    </div>
                                </CardHeader>
                                <CardBody className="space-y-3">
                                    <p className="text-white font-semibold">Create your own Team</p>
                                </CardBody>
                                <CardFooter>
                                    <Button
                                        onPress={() => setIsModalOpen(true)}
                                        className='bg-primary text-white font-semibold w-full'
                                    >
                                        Create a Team
                                    </Button>
                                </CardFooter>
                            </Card>
                            {/* BROWSE TEAM TEMPLATE */}
                            <Card className="bg-darkGray flex flex-col items-center p-3 w-60">
                                <CardHeader className="flex justify-center">
                                    <div className="bg-gray p-6 rounded-xl">
                                        <RectangleGroupIcon />
                                    </div>
                                </CardHeader>
                                <CardBody className="space-y-3">
                                    <p className="text-white font-semibold">Browse multiple Team templates and create your own Team according to your needs</p>
                                </CardBody>
                                <CardFooter>
                                    <Button className='bg-primary text-white font-semibold w-full'>Browse Team Templates</Button>
                                </CardFooter>
                            </Card>
                            {/* Modal for team creation */}
                            <TeamCreationModal isOpen={isModalOpen} onOpenChange={handleModalOpenChange} />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <p className="text-lightGray font-lg text-xl py-10 px-32 text-center">
                            <span className="text-primary font-bold">commUnity</span> lets you browse and join teams.
                            <br />
                            Click any team on the left to view details or join, or create a new team using the <b>New</b> button.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
