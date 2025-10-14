import { useAuth } from "@/context/AuthContext";

const Profile = ({}) => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      <p>
        {user?.email}
        <br />
        {user?.first_name} {user?.surname}
      </p>
    </div>
  );
};

export default Profile;
