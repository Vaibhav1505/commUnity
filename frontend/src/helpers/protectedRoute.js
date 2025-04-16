import Dashboard from "../Pages/Dashboard";
import SigninPage from "../Pages/Signin-Signup/signinPage";

export default function ProtectedRoute({ isAuthenticated }) {
    return isAuthenticated ? <Dashboard /> : <SigninPage />
}