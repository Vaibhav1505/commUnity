import { Card, CardHeader ,Button, CardBody} from "@nextui-org/react"
import FilterHorizontal from "../../../../assets/icons/filterHorizontal"
import { useState,useEffect } from "react";
import UserCard from "../../../../components/userListtile";
import axios from "axios";
import { FETCH_USER } from "../../../../utils/apiStrings";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../helpers/axiosInstance";


export default function PeopleCard() {
    const navigate= useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(FETCH_USER);
                const responseData = response.data;

                
                if (responseData.success === "true") {
                    setData(responseData.User);
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
        <Card className="bg-gray shadow-lg flex flex-col justify-between h-full">
            <CardHeader className="justify-between">
            <div>
                <p className="font-extrabold text-xl text-white">People</p>
            </div>
            <div className="space-x-3">
            
            <Button
                onPress={()=>{navigate('/dashboard/people')}}
                className="bg-primary text-white font-semibold"
            >
                Manage and View Connections
            </Button>
            </div>
            </CardHeader>
            <CardBody className="flex flex-col overflow-y-auto space-y-2 h-72"> 
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((user, index) => (
                        <UserCard 
                            key={index} 
                            user={user}
                            
                        />
                        
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        <p className="text-2xl text-white font-extrabold">No users found.</p> {/* Message when no users are available */}
                    </div>
                )}
                
            </CardBody>
        </Card>
    );
}