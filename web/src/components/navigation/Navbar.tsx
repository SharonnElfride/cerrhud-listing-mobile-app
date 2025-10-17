import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import { ProfileRoute } from "@/navigation/app_routes";
import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import logoIcon from "/src/assets/adaptive-icon.png";

const Navbar = ({}) => {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col items-center justify-between max-w-1/3 px-2 py-5 text-sm">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 items-center">
          <img src={logoIcon} className="rounded-full w-8 h-8" />
          <h2 className="uppercase font-extrabold text-base text-primary">
            Cerrhud Lab
          </h2>
        </div>

        <hr className="border-primary/50 mb-5" />

        <NavMenu user={user ?? undefined} />
      </div>

      <div className="flex flex-col gap-2 w-full text-primary">
        <div>
          <div>Cerrhud Lab mobile</div>
          <div>Cerrhud</div>
        </div>

        <hr className="border-primary/50 mt-5" />

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
            <p className="capitalize text-sm text-white">{user?.first_name}</p>
            <p className="lowercase text-gray-50 text-[10px]">{user?.email}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
