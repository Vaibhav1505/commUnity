import { Outlet } from "react-router-dom";
import DashboardContent from "./Content";
import DashboradNavigation from "./Sidebar";
import { useEffect, useState } from "react";
import getUserDetail from "../../backendRequest/getUserDetail";
import { FETCH_USER_BY_ID } from "../../utils/apiStrings";


export default function Dashboard() {

    const [error, setError] = useState('')
    const [userData, setUser] = useState({});

    useEffect(() => { loadUserData() }, [])

    const loadUserData = async () => {
        try {
            const userId = await localStorage.getItem('userId');
            const response = await getUserDetail(FETCH_USER_BY_ID(userId))
            setUser(response);
        } catch (error) {
            console.log("Unable to get User Details:", error.message)
            setError(error.message)
        }
    }

    return <div className="flex">
        <div className="sticky h-full ">
            <DashboradNavigation data={userData}></DashboradNavigation>
        </div>
        <div className="w-full h-screen bg-black">
            <Outlet />
        </div>
    </div>
}