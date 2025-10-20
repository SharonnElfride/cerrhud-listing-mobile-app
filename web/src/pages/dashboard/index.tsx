import { useAuth } from "@/context/AuthContext";

const Dashboard = ({}) => {
  const { user, logout } = useAuth();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {user?.first_name + " - " + user?.email}
      </h1>
      <p className="text-muted-foreground mb-6">
        ID: {user?.id} | Role: {user?.role}
      </p>
    </div>
  );
};

export default Dashboard;
