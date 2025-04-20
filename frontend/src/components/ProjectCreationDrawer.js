import { Chip, DateRangePicker, Input, Select, SelectItem, User } from "@nextui-org/react";
import CreationDrawer from "../globalComponent/creationDrawer";
import { useEffect, useState } from "react";
import getUsers from "../backendRequest/getUsers";
import { CREATE_TASK, FETCH_USER } from "../utils/apiStrings";
import createProject from "../backendRequest/createProject";

export default function ProjectCreationDrawer() {
    const [users, setUsers] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [budget, setBudget] = useState("");
    const [dateRange, setDateRange] = useState(null);

    useEffect(() => { fetchUsers() }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers(FETCH_USER);
            setUsers(response.data.User);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    const handleCreateProject = async () => {
        try {
            const startDate = dateRange?.start ? dateRange.start.toISOString().split('T')[0] : null;
            const endDate = dateRange?.end ? dateRange.end.toISOString().split('T')[0] : null;

            const payload = {
                project_title: title,
                project_company: company,
                assigned_to: participants,
                budget: parseInt(budget, 10),
                startdate: startDate,
                enddate: endDate,
                completion: "0",
                status: "pending"
            };

            const response = await createProject(CREATE_TASK, payload)

            if (response.status === 201) {
                console.log("Project created successfully!");

            } else {
                console.error("Project creation failed:", response.data.message);
            }


        } catch (error) {
            console.log("Error in creating Task");
        }
    }

    return (
        <CreationDrawer
            drawerFor="Project"
            drawerTitle="Create Project"
            onSubmit={handleCreateProject}
        >
            <div className="space-y-5">
                <Input
                    placeholder="Enter Project title"
                    isRequired
                    label="Title"
                    onValueChange={setTitle}
                />
                <Input
                    isRequired
                    placeholder="Enter Project Company"
                    label="Company"
                    onValueChange={setCompany}
                />
                <div className="flex flex-col gap-2">

                    <Select
                        selectionMode="multiple"
                        isMultiline
                        items={users}
                        label="Choose participants"
                        placeholder="Add participants in Project "
                        selectedKeys={new Set(participants.map((id) => id.toString()))}
                        onSelectionChange={(selected) => {
                            const selectedArray = Array.from(selected).map((id) => id.toString());
                            setParticipants(selectedArray);
                        }}
                        className="max-w-full"
                    >
                        {(user) => (
                            <SelectItem key={user.userId} textValue={user.email}>
                                <div className="flex items-center gap-2 ">
                                    <User
                                        className="text-black font-semibold"
                                        avatarProps={{
                                            src: `https://api.dicebear.com/6.x/initials/svg?seed=${user.firstName + user.lastName}`
                                        }}

                                        name={user.firstName + " " + user.lastName}
                                        description={user.email}
                                    />
                                </div>
                            </SelectItem>
                        )}
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {participants.map((id) => {
                            const user = users.find((u) => u.userId.toString() === id);
                            if (!user) return null;
                            return (
                                <Chip
                                    key={id}
                                    variant="flat"
                                    size="md"
                                    color="primary"
                                    onClose={() => { }}
                                    avatar={
                                        <img
                                            src="https://imgs.search.brave.com/zyTAkL7N1vZWYN5uSfz2U55G2WCm-9j12OewD7zKjP4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWxldmVuZm9ydW0u/Y29tL2RhdGEvYXR0/YWNobWVudHMvODIv/ODI2MDEtYjQwMThl/Yzk4MzRkOGVjNTUy/NjEwNjJmMDlkNzlj/ZTUuanBnP2hhc2g9/dEFHT3lZTk5qcw"
                                            className="w-6 h-6 rounded-full"
                                            alt="avatar"
                                        />
                                    }
                                >
                                    {user.firstName} {user.lastName}
                                </Chip>
                            );
                        })}
                    </div>
                </div>
                <Input
                    isRequired
                    placeholder="Enter Project Budget (INR)"
                    label="Budget"
                    onValueChange={setBudget}
                />
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <DateRangePicker
                        className="max-w-xs"
                        description="Please enter your project Duration"
                        label="duration"
                        onValueChange={setDateRange}
                    />
                </div>
            </div>
        </CreationDrawer>
    );
}
