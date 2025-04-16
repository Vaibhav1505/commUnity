import React from 'react';
import { Card, Avatar, User, Badge, Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import PhoneIcon from '../assets/icons/phoneIcon';
import VideoCallIcon from './videoCallIcon';
import ChatIcon from '../assets/icons/chatIcon';
import MoreIcon from '../assets/icons/moreIcon';
import BookmarkIcon from '../assets/icons/bookmarkIcon';
import ToolTipIconButtonComponent from './tooltipButtonComponent';

const UserCard = ({ user }) => {
    const getStatusBadgeColor = (status) => {
        return status === "Active" ? "bg-green-500" : "bg-red-500";
    };

    return (
        <div className='w-full rounded-xl bg-black p-4 flex cursor-pointer items-center space-x-3 justify-between hover:bg-darkGray transition delay-50'>
            {/* Avatar with Status Badge */}
            <div className="relative">
                <Avatar
                    src={user.avatar || "https://avatars.githubusercontent.com/u/30373425?v=4"} // Default avatar if not provided
                    size="md"
                    className="border-2 border-white"
                />
                {/* Status Badge */}
                <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black ${getStatusBadgeColor(user.status)}`}
                ></span>
            </div>

            {/* User Information */}
            <div className="flex-grow">
                <h2 className='text-white text-lg font-bold'>{`${user.firstName} ${user.lastName}`}</h2>
                <p className='text-lightGray text-sm font-semibold'>{user.role}</p>
            </div>

            {/* Action Buttons */}
            <div className='flex space-x-3'>
                <ToolTipIconButtonComponent className={"bg-transparent hover:bg-primary"} placement='top' icon={<BookmarkIcon />} tooltipContent={"Bookmark User"} />



            </div>
        </div>
    );
};

export default UserCard;