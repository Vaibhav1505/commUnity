import { Card, CardBody, CardHeader, Input, Button, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ProjectListtile from "../../../../components/projectListTile";
import { useNavigate } from "react-router-dom";
import { FETCH_PROJECTS } from "../../../../utils/apiStrings";
import getProjects from "../../../../backendRequest/getProjects";
import ProjectCreationModal from "../../../../components/projectCreationModal";


export default function ProjectCard() {


    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true)
        try {
            const response = await getProjects(FETCH_PROJECTS)
            setProjects(response);
            setLoading(false)

        } catch (error) {
            console.error("Error in Retrieving Project Data:", error.message);
        }
    };

    return (
        <div>
            <Card className="bg-gray shadow-lg flex flex-col justify-between h-full">
                <CardHeader className="justify-between">
                    <div>
                        <p className="font-extrabold text-xl text-white">Projects</p>
                    </div>
                    <div className="space-x-3">
                        
                        {/* <Button
                            onPress={onOpen}
                            className="bg-primary text-white font-semibold"
                        >
                            Manage Projects
                        </Button> */}
                        <Button
                            onPress={() => { navigate('/dashboard/project') }}
                            className="bg-primary text-white font-semibold"
                        >
                            Manage and view Projects
                        </Button>
                    </div>
                </CardHeader>
                <CardBody>

                    <div className="space-y-3">
                        {
                            loading ?
                                (<div className="flex items-center justify-center h-full">
                                    <p className="text-2xl text-white font-extrabold">No Projects available.</p>
                                </div>) :
                                (projects.map((project) => (<ProjectListtile key={project.id} data={project} />)))
                        }

                    </div>
                </CardBody>

            </Card>
           
        </div>
    );
}