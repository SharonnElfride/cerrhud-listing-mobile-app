import {
  DashboardRoute,
  MedicalTestsRoute,
  UsersRoute,
  type AppRoute,
} from "@/navigation/app_routes";
import { Link } from "react-router-dom";

const NavMenuItem = ({ route }: { route: AppRoute }) => {
  return (
    <div className="inline-flex hover:bg-white/10 p-2 rounded-md font-medium text-sm">
      <Link
        to={route.path}
        className="flex items-center justify-center gap-2"
        autoCapitalize="words"
      >
        {route.icon && <route.icon className="text-white/70" size={18} />}
        {route.label}
      </Link>
    </div>
  );
};

const NavMenu = ({}) => {
  return (
    <div className="flex max-w-sm justify-between">
      <NavMenuItem route={DashboardRoute} />
      <NavMenuItem route={MedicalTestsRoute} />
      <NavMenuItem route={UsersRoute} />
    </div>
  );
};

export default NavMenu;
