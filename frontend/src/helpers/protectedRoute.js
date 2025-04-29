import { useEffect } from "react";
import GetToken from "./getToken"
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const token = GetToken();

    useEffect(() => {
        if (!token) {
            navigate('/signin', { replace: true })
        }
    }, [token, navigate])

    return token ? children : null
};
