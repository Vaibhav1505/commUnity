import { PopoverContent, Avatar, Card, Button, Divider } from "@nextui-org/react"
import UserIcon from "../../../../assets/icons/userIcon"
import SettingIcon from "../../../../assets/icons/settingIcon"
import LogoutIcon from "../../../../assets/icons/logoutIcon"
import { Link, replace, useNavigate } from "react-router-dom"

export default function AccountPopoverContent({PopoverContentData}) {

    const navigate = useNavigate();

    return <PopoverContent className="bg-gray space-y-5">

        <div className="flex items-center space-x-4 p-1 ">
            <Avatar radius="" size="md" showFallback name={PopoverContentData.firstname} isBordered src=""></Avatar>
            <div className="space-y-3">
                <div>
                    <p className="font-bold text-white text-lg">{`${PopoverContentData.firstname} ${PopoverContentData.lastname}`}</p>
                    <p className=" font-semibold text-white">{PopoverContentData.email}</p>
                    <Link className="text-green-500">+91 {PopoverContentData.phone}</Link>
                </div>
                
            </div>
        </div>
        
        <Card className="w-full space-y-2 p-2 bg-transparent">
            <Button className="bg-black hover:bg-primary text-white" onClick={() => { navigate(`/dashboard/userDetail/${PopoverContentData.id}`,) }} fullWidth startContent={<UserIcon></UserIcon>}>My Profile</Button>
            <Button className="bg-black hover:bg-primary text-white" fullWidth startContent={<SettingIcon></SettingIcon>}>Account settings</Button>
            <Button className="bg-black hover:bg-danger text-white" fullWidth startContent={<LogoutIcon></LogoutIcon>}>Signout</Button>
        </Card>

    </PopoverContent>
}