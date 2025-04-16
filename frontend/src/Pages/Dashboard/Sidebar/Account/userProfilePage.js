import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Tooltip } from "@nextui-org/react";
import PencilIcon from "../../../../assets/icons/pencilIcon";
import LinkedInIcon from "../../../../assets/icons/linkedInIcon";
import InstagramIcon from "../../../../assets/icons/instagramIcon";
import TwitterIcon from "../../../../assets/icons/twitterIcon";
import FacebookIcon from "../../../../assets/icons/facebookIcon";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FETCH_USER_BY_ID } from "../../../../utils/apiStrings";
import getUserDetail from "../../../../backendRequest/getUserDetail";
import ToolTipIconButtonComponent from "../../../../components/tooltipButtonComponent";

export default function UserProfile() {
    const { userId } = useParams();
    const [userData, setUserData] = useState({});

    useEffect(() => { fetchUserDetail() }, [userId])

    const fetchUserDetail = async () => {
        try {
            const response = await getUserDetail(FETCH_USER_BY_ID(userId))
            setUserData(response);
        } catch (error) {
            console.log("Unable to get User Detail", error.message)
        }
    }

    return (
        <div className="flex justify-center px-64 items-center h-full">
            <Card className="bg-gray w-full p-10 rounded-lg shadow-md">
                <CardHeader className="flex justify-between items-center">
                    <p className="text-white text-4xl font-bold">User Profile</p>
                    <ToolTipIconButtonComponent
                        icon={<PencilIcon />}
                        tooltipContent={"Edit information"}
                        size="md"
                        className={"bg-primary"} />
                </CardHeader>
                <CardBody className="py-10">
                    <div className="flex justify-center space-x-36">
                        <div className="flex flex-col items-center space-y-5">
                            <Avatar color="primary" isBordered showFallback size="xl" name={userData.firstname} />
                            <div className="space-y-1">
                                <p className="text-white font-bold text-3xl">{userData.firstname} {userData.lastname}</p>
                                <p className="text-lightGray font-semibold text-xl">{userData.email}</p>
                                <p className="text-lightGray font-semibold text-xl">{userData.phone}</p>
                            </div>
                            
                        </div>

                        <div className="space-y-5">
                            <div>
                                <p className="text-white font-bold text-xl">About</p>
                                <p className="text-lightGray font-semibold">{userData.about || "This is about the user"}</p>
                            </div>
                            <div>
                                <p className="text-white font-bold text-xl">Role</p>
                                <p className="text-lightGray font-semibold">{userData.role}</p>
                            </div>
                            <div>
                                <p className="text-white font-bold text-xl">Team</p>
                                <p className="text-lightGray font-semibold">{userData.team}</p>
                            </div>
                            <div>
                                <p className="text-white font-bold text-xl">Status</p>
                                <Chip className="bg-green-600 text-white font-semibold">{userData.status}</Chip>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex justify-between items-center">
                <div className="flex justify-center space-x-4">
                                <LinkedInIcon color="blue" className="text-blue-500 hover:text-blue-700" />
                                <InstagramIcon className="text-pink-500 hover:text-pink-700" />
                                <TwitterIcon className="text-blue-400 hover:text-blue-600" />
                                <FacebookIcon className="text-blue-600 hover:text-blue-800" />
                            </div>
                </CardFooter>
            </Card>
        </div>
    );
}
