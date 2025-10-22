import ProfileAvatar from "@/components/profile/ProfileAvatar";
import ProfileForm from "@/components/profile/ProfileForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { displayUserRole } from "@/helpers/user_role_helper";
import { BadgeCheckIcon, LogOutIcon } from "lucide-react";

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
        <div className="absolute top-0 left-[10%] translate-y-1/2">
          <ProfileAvatar user={user} loading={loading} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        {user?.role && (
          <Badge variant="primary-outline">{displayUserRole(user?.role)}</Badge>
        )}

        <Badge variant="secondary" className="bg-accent text-accent-foreground">
          <BadgeCheckIcon />
          Vérifié
        </Badge>

        <Separator
          orientation="vertical"
          decorative
          style={{
            height: "30px",
            backgroundColor: "var(--color-primary)",
          }}
        />

        <Button size="sm" onClick={logout}>
          <LogOutIcon /> Logout
        </Button>
      </div>

      <div className="mt-5">
        <p>
          <span className="font-bold text-lg">{user?.first_name}</span>{" "}
          {user?.surname}
        </p>
        <p className="text-gray-500 text-[10px]">{user?.email}</p>
      </div>

      <div className="mt-10">
        <ProfileForm user={user} loading={loading} logout={logout} />
      </div>
    </div>
  );
};

export default Profile;
