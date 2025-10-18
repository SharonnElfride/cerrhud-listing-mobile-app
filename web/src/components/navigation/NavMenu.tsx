import {
  DashboardRoute,
  MedicalTestsRoute,
  UsersRoute,
} from "@/navigation/app_routes";
import type { AuthProps } from "@/shared/AuthProps";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import NavMenuItem from "./NavMenuItem";

const NavMenu = ({ user }: AuthProps) => {
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList className="flex flex-col items-start">
        <NavMenuItem route={DashboardRoute} user={user} />
        <NavMenuItem route={MedicalTestsRoute} user={user} />
        <NavMenuItem route={UsersRoute} user={user} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
