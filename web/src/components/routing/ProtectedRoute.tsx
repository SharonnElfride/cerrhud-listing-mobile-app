import { useAuth } from "@/context/AuthContext";
import type { AppRoute } from "@/navigation/app_routes";
import { canAccessRoute } from "@/navigation/guards";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  route: AppRoute;
}

const ProtectedRoute = ({ children, route }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  if (!canAccessRoute(route, user)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
