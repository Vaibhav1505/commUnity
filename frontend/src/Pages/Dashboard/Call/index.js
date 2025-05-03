import { Button, Card, CardBody, CardFooter, Image, Input, User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import FilterIcon from "../../../assets/icons/filterIcon";
import SearchIcon from "../../../assets/icons/searchIcon";
import getUsers from "../../../backendRequest/getUsers";
import { FETCH_USER } from "../../../utils/apiStrings";
import MoreIcon from "../../../assets/icons/moreIcon";
import VideoCallIcon from "../../../components/videoCallIcon";
import LinkIcon from "../../../assets/icons/linkIcon";
import DeviceTablet from "../../../assets/icons/deviceTablet";

export default function CallPage() {
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState([]);

    useEffect(() => { fetchUsers() }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers(FETCH_USER);
            setUsers(response.data.User);
        } catch (error) {
            console.log("Error in fetching User List.");
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/3 h-screen border-r-2 border-gray p-4">
                <div className="flex justify-between py-3">
                    <p className="font-bold text-3xl text-white">Calls</p>

                </div>
                <Input className="py-3" placeholder="Search or start a new Call" startContent={<SearchIcon color="black" />} />
                {
                    users.map((user) => (
                        <a
                            key={user.phone}
                            href={`tel:${user.phone}`}
                            className="w-full block hover:bg-gray hover:cursor-pointer rounded-xl flex justify-between items-center no-underline"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <User
                                className="text-white font-semibold py-3"
                                avatarProps={{
                                    showFallback: true,
                                    isBordered: true,
                                    src: `https://api.dicebear.com/6.x/initials/svg?seed=${user.firstName + user.lastName}`
                                }}
                                name={user.firstName + " " + user.lastName}
                                description={user.phone}
                            />
                            <Button className="bg-transparent" isIconOnly><MoreIcon /></Button>
                        </a>
                    ))
                }
            </div>

            {/* RIGHT SIDE */}
            <div className="w-2/3 h-screen flex flex-col justify-center items-center">
                <div className="flex space-x-5  items-center">

                    <Card className="bg-gray">
                        <CardBody>
                            <div className="bg-black flex justify-center p-6 rounded-xl">
                                <VideoCallIcon size={48} />
                            </div>
                        </CardBody>
                        <CardFooter><Button className="bg-primary text-white font-semibold">Video Call</Button></CardFooter>
                    </Card>

                    <Card className="bg-gray">
                        <CardBody>
                            <div className="bg-black flex justify-center p-6 rounded-xl">
                                <LinkIcon size={48} />
                            </div>
                        </CardBody>
                        <CardFooter><Button className="bg-primary text-white font-semibold">New Call Link</Button></CardFooter>
                    </Card>

                    <Card className="bg-gray">
                        <CardBody>
                            <div className="bg-black flex justify-center p-6 rounded-xl">
                                <DeviceTablet size={48} />
                            </div>
                        </CardBody>
                        <CardFooter><Button className="bg-primary text-white font-semibold">Call a Number</Button></CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
