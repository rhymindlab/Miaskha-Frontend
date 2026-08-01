import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {

    const { loggedIn, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!loggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
}