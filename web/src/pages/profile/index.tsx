import ProfileAvatar from "@/components/profile/ProfileAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { BadgeCheckIcon } from "lucide-react";

const Profile = () => {
  const { user, loading, logout } = useAuth();

  return (
    <div className="relative flex flex-col w-full p-5">
      <div
        className="absolute left-0 top-0 w-full h-40 object-cover rounded-t-md"
        style={{
          backgroundColor: user?.profile_color ?? "var(--color-primary)",
        }}
      ></div>

      <div className="relative w-full h-40">
        <div className="absolute bottom-0 left-[15%] translate-y-1/2">
          <ProfileAvatar user={user} loading={loading} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Badge variant="primary-outline">{user?.role.toUpperCase()}</Badge>
        <Badge
          variant="secondary"
          className="bg-blue-500 text-white dark:bg-blue-600"
        >
          <BadgeCheckIcon />
          Verified
        </Badge>
      </div>

      <div className="">
        <p>
          <span className="font-bold text-lg">{user?.first_name}</span>{" "}
          {user?.surname}
        </p>
        <p className="text-gray-500 text-[10px]">{user?.email}</p>
      </div>

      <div className="mt-10 space-y-5">
        <div className="space-y-5">
          <hr />
          <div className="flex gap-10">
            <p className="font-medium">Name</p>
            <div className="flex w-full gap-5">
              <p>{user?.first_name}</p>
              <p>{user?.surname}</p>
            </div>
          </div>

          <hr />
          <div className="flex gap-10">
            <p className="font-medium">Email</p>
            <div>
              <p>{user?.email}</p>
            </div>
          </div>

          <hr />
          <div className="flex gap-10">
            <p className="font-medium">Profile color</p>
            <div>
              <p>Color chooser</p>
            </div>
          </div>

          <hr />
          <div className="flex gap-10">
            <p className="font-medium">Password</p>
            <div>
              <p>Change password</p>
            </div>
          </div>
          <hr />
        </div>

        <div className="flex w-full items-center justify-between">
          <Button onClick={logout}>Logout</Button>

          <div className="flex items-center justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
