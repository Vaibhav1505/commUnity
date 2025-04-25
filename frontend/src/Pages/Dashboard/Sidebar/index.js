import { Badge, Button, Tooltip } from "@nextui-org/react";
import SearchIcon from "../../../assets/icons/searchIcon";
import GroupIcon from "../../../assets/icons/groupIcon";
import ChatIcon from "../../../assets/icons/chatIcon";
import PhoneIcon from "../../../assets/icons/phoneIcon";
import MailIcon from "../../../assets/icons/mailIcon";
import LogoutIcon from "../../../assets/icons/logoutIcon";
import SettingIcon from "../../../assets/icons/settingIcon";
import NavigationAccount from "./Account/navigationAccount";
import HomeIcon from "../../../assets/icons/homeIcon";
import { useNavigate } from "react-router-dom";
import SearchModal from "../../../components/searchModal";
import { useState } from "react";
import CalenderIcon from "../../../assets/icons/calenderIcons";
import ToolTipIconButtonComponent from "../../../components/tooltipButtonComponent";
import NotificationIcon from "../../../assets/icons/notificationIcon";



export default function DashboradNavigation({ data }) {

    const navigate = useNavigate();
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);


    return <div className="bg-black flex justify-between items-center py-5 space-y-5 overflow-hidden flex-col w-20 h-screen border-r-2 border-gray-200">
        <div className="flex flex-col items-center space-y-5">

            <Tooltip content="Dashboard" placement="right" className="bg-black text-white">
            <Button isIconOnly size="lg" className="bg-gray hover:bg-primary text-white" onClick={() => {
                navigate('/dashboard')
            }}>{<HomeIcon></HomeIcon>}
            </Button>
            </Tooltip>

            <Button isIconOnly size="lg" onClick={() => {
                setIsSearchModalOpen(true)
            }} className="bg-gray hover:bg-primary text-white">{<SearchIcon></SearchIcon>}
            </Button>

            <SearchModal
                ModalHeaderContent={"Search Anything"}
                ModalFooterButtonContent={'Search'}
                isOpen={isSearchModalOpen}
                onOpenChange={setIsSearchModalOpen}>
            </SearchModal>

            <Tooltip content="Teams" placement="right" className="bg-black text-white">
                <Button isIconOnly
                    size="lg" className="bg-gray hover:bg-primary text-white"
                    onClick={() => {
                        navigate('/dashboard/teams')
                    }}>{<GroupIcon></GroupIcon>}
                </Button>
            </Tooltip>

            <Tooltip content="Chat" placement="right" className="bg-black text-white">
                <Button
                    isIconOnly
                    size="lg"
                    className="bg-gray hover:bg-primary text-white"
                    onClick={() => { navigate('/dashboard/chats') }}
                >
                    {<ChatIcon></ChatIcon>}
                </Button>
            </Tooltip>

            <Tooltip content="Call" placement="right" className="bg-black text-white">
                <Button
                    isIconOnly
                    size="lg"
                    className="bg-gray hover:bg-primary text-white">
                    {<PhoneIcon color="white"></PhoneIcon>}
                </Button>
            </Tooltip>

            <Tooltip content="Mail" placement="right" className="bg-black text-white">
                <Button
                    isIconOnly
                    size="lg"
                    className="bg-gray hover:bg-primary text-white">
                    {<MailIcon/>}
                </Button>
            </Tooltip>

            <Tooltip content="Calender" placement="right" className="bg-black text-white">
                <Button
                    isIconOnly
                    size="lg"
                    className="bg-gray hover:bg-primary text-white">
                    {<CalenderIcon/>}
                </Button>
            </Tooltip>
        </div>

        <div className="flex flex-col items-center space-y-5">
            <Badge color="primary" content="99+" shape="circle">
                <Button
                    isIconOnly
                    size="lg"
                    className="bg-gray hover:bg-primary text-white"
                >
                    <NotificationIcon size={24} color='white' />
                </Button>
            </Badge>

            <Button
                isIconOnly size="lg"
                className="bg-gray hover:bg-primary text-white">
                {<SettingIcon />}
            </Button>

            <NavigationAccount accountData={data} />

        </div>
    </div>
}