import type { AuthProps } from "@/shared/AuthProps";
import { CameraIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Spinner } from "../ui/spinner";

const ProfileAvatar = ({ user, loading }: AuthProps) => {
  return (
    <div>
      <Avatar className="w-8 h-8">
        <AvatarImage src={user?.avatar ?? ""} alt="@shadcn" />
        <AvatarFallback
          style={{
            backgroundColor: user?.profile_color ?? "var(--color-primary)",
            color: "white",
            fontWeight: 500,
          }}
        >
          {loading ? <Spinner /> : user?.first_name.charAt(0) ?? "X"}
        </AvatarFallback>
      </Avatar>

      <div>
        <CameraIcon />
      </div>
    </div>
  );
};

export default ProfileAvatar;
