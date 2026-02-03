import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

interface DecodedToken {
    exp: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    allowedRoles,
}) => {
    const { data: user, isLoading } = useAuthUser();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (isLoading) return <div>Loading...</div>;

    // 1. No token → force logout
    if (!token) {
        localStorage.clear();
        return <Navigate to="/admin" replace />;
    }

    // 2. Token expiry check
    try {
        const { exp } = jwtDecode<DecodedToken>(token);
        const isExpired = Date.now() >= exp * 1000;

        if (isExpired) {
            localStorage.clear();
            return <Navigate to="/admin" replace />;
        }
    } catch {
        localStorage.clear();
        return <Navigate to="/admin" replace />;
    }

    // 3. Auth API failed
    if (!user) {
        localStorage.clear();
        return <Navigate to="/admin" replace />;
    }

    // 4. Role check
    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
