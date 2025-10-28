import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[]; // roles allowed for this route
}

interface DecodedToken {
    exp: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { data: user, isLoading } = useAuthUser();
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        // Not logged in --> redirect to login page
        return <Navigate to="/admin" replace />;
    }

    try {
        const decoded = jwtDecode<DecodedToken>(token || "");
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            localStorage.clear();

            return <Navigate to="/admin" replace />;
        }
    } catch (error) {
        console.error("Invalid token", error)
        localStorage.clear();
        return <Navigate to="/admin" replace />;
    }

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <>{children}</>; // user is allowed --> render children
};

export default ProtectedRoute;
