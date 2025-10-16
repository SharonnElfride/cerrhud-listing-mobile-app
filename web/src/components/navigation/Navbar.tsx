import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import { ProfileRoute } from "@/navigation/app_routes";

const Navbar = ({}) => {
  return (
    <div className="bg-primary text-primary-foreground py-5">
      <div className="h-full flex flex-col justify-between gap-5">
        <div className="w-full flex justify-between px-10">
          <div>LOGO</div>
          <div>
            <Link to={ProfileRoute.path}> AVATAR + Name </Link>
          </div>
        </div>

        <hr className="border-white/20" />

        <NavMenu />
      </div>
    </div>
  );
};

export default Navbar;
