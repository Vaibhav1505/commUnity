import { Card, CardHeader, Button, CardBody, CircularProgress } from "@nextui-org/react"
import AddIcon from "../../../../assets/icons/addIcon"
import TaskModalComponent from "../../../../components/taskModalComponent"
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FETCH_TASK } from "../../../../utils/apiStrings";
import TaskListTile from "../../../../components/taskListTile";
import axiosInstance from "../../../../helpers/axiosInstance";
import getTasks from "../../../../backendRequest/getTasks";

export default function TaskCard() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [data, setData] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await getTasks(FETCH_TASK);
            if (response && response.tasks) {
                setData(response.tasks);
            } else {
                setErrorMessage("No tasks found.");
            }
        } catch (error) {
            console.error("Error loading tasks:", error);
        } finally {
            setIsLoading(false);
        }
    };





    return <Card className="bg-gray shadow-lg flex flex-col justify-between ">
        <CardHeader className="justify-between">
            <div>
                <p className="font-extrabold text-xl text-white">Tasks</p>
                {/* <p className="text-white text-sm">Manage your Tasks efficiently.</p> */}
            </div>
            <Button
                onPress={onOpen}
                className="bg-primary text-white font-semibold"
            >
                Manage and view Tasks
            </Button>

        </CardHeader>

        <CardBody className="space-y-2 overflow-auto">
            {isLoading ? (
                <CircularProgress color="primary" size="lg" />
            ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
            ) : data.length > 0 ? (
                data.map((task) => (
                    <TaskListTile
                        key={task.task_id}
                        taskID={task.task_id}
                        title={task.task_title}
                        description={task.task_description}
                        startDate={task.startDate ? new Date(task.startDate).toLocaleDateString() : 'No start date'}
                        lastDate={task.lastDate ? new Date(task.lastDate).toLocaleDateString() : 'No end date'}
                        participants={Array.isArray(task.participants) ? task.participants : []}
                    />

                ))
            ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                    <p className="text-2xl text-white font-extrabold">No Tasks Available</p> 
                </div>
            )}
        </CardBody>
        <TaskModalComponent isOpen={isOpen} onOpenChange={onOpenChange} />
    </Card>

}