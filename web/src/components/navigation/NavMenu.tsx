import {
    DashboardRoute,
    MedicalTestsRoute,
    UsersRoute,
    type AppRoute,
} from "@/navigation/app_routes";
import { cva } from "class-variance-authority";
import { Link, useLocation } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "../ui/navigation-menu";

const customNavigationMenuLinkStyle = cva(
  "flex-row items-center gap-2 px-3 py-2 rounded-md transition-colors duration-150",
  {
    variants: {
      active: {
        true: "bg-accent text-accent-foreground [&_svg:not([class*='text-'])]:text-white",
        false:
          "text-white/70 hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-white/70 hover:[&_svg:not([class*='text-'])]:text-white",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

const NavMenuItem = ({ route }: { route: AppRoute }) => {
  const { pathname } = useLocation();
  const isActive =
    pathname === route.path ||
    (route.path.includes("/:") &&
      pathname.startsWith(route.path.split("/:")[0]));

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={customNavigationMenuLinkStyle({ active: isActive })}
      >
        <Link
          to={route.path}
          className="items-center gap-2"
          autoCapitalize="words"
        >
          {route.icon && <route.icon size={18} />}
          {route.label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const NavMenu = ({}) => {
  return (
    <NavigationMenu className="px-10">
      <NavigationMenuList>
        <NavMenuItem route={DashboardRoute} />
        <NavMenuItem route={MedicalTestsRoute} />
        <NavMenuItem route={UsersRoute} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
