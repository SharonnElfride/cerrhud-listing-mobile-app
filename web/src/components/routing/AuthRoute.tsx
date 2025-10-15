import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const AuthRoute = ({ children, redirectTo = "/" }: AuthRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-5">Loading...</div>;

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
