import { Outlet } from "react-router-dom";
import DashboardContent from "./Content";
import DashboradNavigation from "./Sidebar";
import { useEffect, useState } from "react";
import getUserDetail from "../../backendRequest/getUserDetail";
import { FETCH_USER_BY_ID } from "../../utils/apiStrings";


export default function Dashboard() {
    const [error, setError] = useState('');
    const [userData, setUser] = useState({});

    useEffect(() => { loadUserData() }, []);

    const loadUserData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await getUserDetail(FETCH_USER_BY_ID(userId));
            setUser(response);
        } catch (error) {
            setError("Unable to load user details.");
        }
    };

    return (
        <div className="flex h-screen">
            <aside className="sticky top-0 h-screen">
                <DashboradNavigation data={userData} />
            </aside>
            <main className="flex-1 bg-black overflow-y-auto">
                {error && (
                    <div className="bg-red-600 text-white p-2">{error}</div>
                )}
                <Outlet />
            </main>
        </div>
    );
}
