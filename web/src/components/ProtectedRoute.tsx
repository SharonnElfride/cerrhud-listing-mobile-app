import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/models/User";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <div className="p-10 text-center text-red-500">Access Denied</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
