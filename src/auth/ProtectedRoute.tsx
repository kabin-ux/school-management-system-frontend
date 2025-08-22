import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[]; // roles allowed for this route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { user, role } = useAppSelector((state) => state.auth);

    if (!user) {
        // Not logged in → redirect to login page
        return <Navigate to="/admin" replace />;
    }

    if (!role || !allowedRoles.includes(role)) {
        // Logged in but role not allowed → redirect to unauthorized page or login
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>; // user is allowed → render children
};

export default ProtectedRoute;
