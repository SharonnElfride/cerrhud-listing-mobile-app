import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/models/User";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

export const ProtectedRoute = ({
  children,
  requiredRoles,
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <div className="p-10 text-center text-red-500">Access Denied</div>;
  }

  console.log("Should display")

  return <>{children}</>;
};
