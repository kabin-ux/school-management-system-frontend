import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuth";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[]; // roles allowed for this route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { data: user, isLoading } = useAuthUser();
    const role = localStorage.getItem("role");

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        // Not logged in → redirect to login page
        return <Navigate to="/admin" replace />;
    }


    if (!role || !allowedRoles.includes(role)) {
        // Logged in but role not allowed → redirect to unauthorized page or login
        console.log("Allowed roles:", allowedRoles);
        console.log("User role:", role);
        console.log("User object:", user);
        return <Navigate to="/unauthorized" replace />;
    }
    return <>{children}</>; // user is allowed → render children
};

export default ProtectedRoute;
