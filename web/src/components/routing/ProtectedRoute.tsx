import { useAuth } from "@/context/AuthContext";
import {
  LoginRoute,
  UnauthorizedRoute,
  type AppRoute,
} from "@/navigation/app_routes";
import { canAccessRoute } from "@/navigation/guards";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  route: AppRoute;
}

const ProtectedRoute = ({ children, route }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!user) {
    return (
      <Navigate
        to={LoginRoute.path}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (!canAccessRoute(route, user)) {
    return <Navigate to={UnauthorizedRoute.path} replace />;
  }

  return (<div className="p-5">{children}</div>);
};

export default ProtectedRoute;
