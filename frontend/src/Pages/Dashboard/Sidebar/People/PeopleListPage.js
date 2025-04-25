import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Tooltip,
    Link,
    Input,
    Button,
} from "@nextui-org/react";
import { FETCH_USER } from "../../../../utils/apiStrings";
import { useEffect, useState } from "react";
import React from "react";
import axiosInstance from "../../../../helpers/axiosInstance";
import PhoneIcon from "../../../../assets/icons/phoneIcon";
import VideoCallIcon from "../../../../components/videoCallIcon";
import MailIcon from "../../../../assets/icons/mailIcon";
import FilterHorizontal from "../../../../assets/icons/filterHorizontal";
import ChevronLeft from "../../../../assets/icons/chevronLeft";
import { useNavigate } from "react-router-dom";

export default function PeopleListPage() {
    const [data, setData] = useState([]);

    const navigate= useNavigate();

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "employeeId":
                return (
                    <Chip color="primary" className="text-white font-semibold">EMP{user.id}</Chip>
                );
            case "name":
                return (
                    <User
                        className="text-white"
                        avatarProps={{
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                            showFallback:true,
                            isBordered:true,
                            name:`${user.firstName}`
                        }}
                        description={
                            <Link isExternal href={"mailTo:" + user.email} size="sm">
                                {user.email}
                            </Link>
                        }
                        name={user.name}
                    />
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-white text-sm capitalize">{cellValue}</p>

                    </div>
                );
            case "team":
                return (
                    <div>
                        <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
                    </div>
                )
            case "status":
                return (
                    <Chip

                        className=" text-white"
                        color={statusColorMap[user.status.toLowerCase()]}
                        size="md"
                        variant="flat"
                    >
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center space-x-5">
                        <Tooltip content="Mail">
                            <a href={"mailTo:" + user.email} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Button isIconOnly className="bg-transparent"><MailIcon /></Button>
                            </a>
                        </Tooltip>
                        <Tooltip content="Call">
                            <a href={"tel:" + user.phone} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Button isIconOnly className="bg-transparent"><PhoneIcon color="white" /></Button>
                            </a>
                        </Tooltip>
                        <Tooltip content="Video Call">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <VideoCallIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const columns = [
        { name: "EMPLOYEE ID", uid: "employeeId" },
        { name: "NAME", uid: "name" },
        { name: "ROLE", uid: "role" },
        { name: "TEAM", uid: "team" },
        { name: "STATUS", uid: "status" },
        { name: "CONNECT VIA", uid: "actions" },
    ];

    const statusColorMap = {
        active: "success",
        paused: "danger",
        vacation: "warning",
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(FETCH_USER);
                const responseData = response.data;
                if (responseData.success === "true") {
                    const adjustedData = responseData.User.map((user) => ({
                        id: user.userId,
                        name: `${user.firstName} ${user.lastName}`,
                        role: user.role,
                        team: user.team,
                        status: user.status,
                        email: user.email,
                    }));
                    setData(adjustedData);
                } else {
                    console.error("Error fetching users:", responseData.message);
                }
            } catch (error) {
                console.error("Error in Retrieving User Data: " + error.message);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="p-5">
            <div className="flex justify-between w-full py-3 items-center">
                <div className="flex items-center">
                    <Button isIconOnly className="bg-transparent" onClick={() => navigate(-1)}><ChevronLeft /></Button>
                    <p className="text-white font-bold text-3xl">Connections</p>
                </div>
                <div className="flex space-x-3 w-1/2 items-center">
                    <Input
                        className=""
                        size="sm"
                        color="primary"
                        label="Search User by Name, status..."
                        variant="bordered"
                        classNames={"bg-transparent"}
                    ></Input>
                    <Button className="bg-primary text-white font-semibold" startContent={<FilterHorizontal />}>Filter</Button>
                </div>
            </div>
            <div className="py-2">
                <Table aria-label="Example table with custom cells" removeWrapper="true">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn className="bg-gray" key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={data} emptyContent="No Connections to show...">
                        {(item) => (
                            <TableRow className="hover:bg-gray" key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
