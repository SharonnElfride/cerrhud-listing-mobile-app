import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();

  /*
  const userPermissions = data.permissions as UserPermissions;
  const defaultPermissions = RolePermissions[userRole];
  */

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {user?.first_name + " - " + user?.email}
      </h1>
      <p className="text-muted-foreground mb-6">
        {/* Role: {user?.role} | Permissions: {user?.permissions?.join(", ")} */}
        ID: {user?.id} | Role: {user?.role}
      </p>

      <div className="flex flex-col gap-3">
        <Link to={"/medical-tests"}>Go to Medical tests</Link>

        <Link to={"/users"} className="bg-primary">Go to Users</Link>

        <Link to={"/profile"}>Go to Profile</Link>
      </div>

      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
