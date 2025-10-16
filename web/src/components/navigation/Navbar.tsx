import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import { ProfileRoute } from "@/navigation/app_routes";

const Navbar = ({}) => {
  return (
    <div className="bg-primary text-primary-foreground h-[var(--nav-bar-height)] px-10 py-2">
      <div className="h-full flex flex-col justify-between">
        <div className="w-full flex justify-between">
          <div>LOGO</div>
          <div>
            <Link to={ProfileRoute.path}> AVATAR + Name </Link>
          </div>
        </div>

        <hr color="#aaeedd"/>

        <NavMenu />
      </div>
    </div>
  );
};

export default Navbar;
