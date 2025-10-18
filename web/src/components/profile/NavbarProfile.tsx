import { ProfileRoute } from "@/navigation/app_routes";
import type { AuthProps } from "@/shared/AuthProps";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Spinner } from "../ui/spinner";

const NavbarProfile = ({ user, loading }: AuthProps) => {
  return (
    <Link
      to={ProfileRoute.path}
      className="flex gap-2 items-center group p-2 bg-primary/50 shadow-2xs rounded-md"
    >
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

      <div className="group-hover:cursor-pointer">
        <p className="capitalize text-sm text-white w-fit">
          {user?.first_name}
        </p>
        <p className="lowercase text-gray-50 text-[10px] w-fit">
          {user?.email}
        </p>
      </div>
    </Link>
  );
};

export default NavbarProfile;
