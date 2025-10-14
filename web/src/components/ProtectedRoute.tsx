import { useAuth } from "@/context/AuthContext";
import type { Enums } from "@/lib/supabase/supabase";
import type { UserPermissions } from "@/models/UserPermissions";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: Enums<"user_role">[];
  // requiredPermissions?: UserPermissions;
}

const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  console.log("USER")
  console.log(user)

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
