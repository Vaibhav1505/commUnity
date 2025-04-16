import { Avatar, Button, User } from "@nextui-org/react";
import MoreIcon from "../assets/icons/moreIcon";

export default function EventMemberListTile({ userName, imageSrc, description }) {
    return (
        <div className="flex rounded-lg hover:bg-darkGray p-4 justify-between cursor-pointer">
            {/* <div className="flex space-x-3 items-center">
                <Avatar isBordered src={imageSrc} />
                <p className="font-bold text-white">{userName}</p>
            </div> */}
            <User 
            className="text-white"
                avatarProps={{
                    isBordered: true,
                    src: imageSrc,
                }}
                description={description}
                name={userName}
            />
            <Button isIconOnly className="bg-transparent">
                <MoreIcon />
            </Button>
        </div>
    );
}