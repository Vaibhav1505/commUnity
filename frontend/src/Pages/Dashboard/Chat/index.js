import { Button, Image, Input, User } from "@nextui-org/react";
import ChattingImage from '../../../assets/photos/undraw_work-chat_hc3y.svg'
import { useEffect, useState } from "react";
import FilterIcon from "../../../assets/icons/filterIcon";
import SearchIcon from "../../../assets/icons/searchIcon"
import getUsers from "../../../backendRequest/getUsers";
import { FETCH_USER } from "../../../utils/apiStrings";
import MoreIcon from "../../../assets/icons/moreIcon";

export default function ChatPage() {

    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState([])
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => { fetchUsers() }, [])

    const fetchUsers = async () => {
        try {
            const response = await getUsers(FETCH_USER);
            setUsers(response.data.User)
        } catch (error) {
            console.log("Error in fetching User List.");
            setErrorMessage(error.message);
        }
    }


    return <div className="flex h-screen">
        <div className="w-1/3 h-screen border-r-2 border-gray p-4">
            <div className="flex justify-between py-3">
                <p className="font-bold text-3xl text-white">Chats</p>
                <div>
                    <Button isIconOnly className="bg-primary"><FilterIcon /></Button>
                </div>
            </div>
            <Input className="py-3" placeholder="Search or start a new Chat" startContent={<SearchIcon color="black" />} />
            {
                users.map((user) => (
                    <div className="w-full hover:bg-gray hover:cursor-pointer rounded-xl flex justify-between items-center">
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
                        <Button className="bg-transparent" isIconOnly><MoreIcon/></Button>
                    </div>
                ))
            }
        </div>



        {/* RIGHT SIDE  */}
        <div className="w-2/3 h-screen flex flex-col  justify-center items-center">
            <div className="flex flex-col items-center">
                <Image
                    src={ChattingImage}
                    width={500}
                    className="mx-auto"
                />
                <p className="text-lightGray font-lg text-xl py-10 px-32 text-center">
                    <span className="text-primary font-bold">commUnity</span> ensures your conversations are protected with end-to-end encryption and multi-factor authentication, keeping your data safe from unauthorized access
                </p>
            </div>
        </div>
    </div>
};
