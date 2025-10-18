import type { AppRoute } from "@/navigation/app_routes";
import { canAccessRoute } from "@/navigation/guards";
import type { AuthProps } from "@/shared/AuthProps";
import { cva } from "class-variance-authority";
import { Link, useLocation } from "react-router-dom";
import { NavigationMenuItem, NavigationMenuLink } from "../ui/navigation-menu";

const customNavigationMenuLinkStyle = cva(
  "flex-row items-center gap-2 px-3 py-2 rounded-md transition-colors duration-150",
  {
    variants: {
      active: {
        true: "bg-primary text-primary-foreground [&_svg:not([class*='text-'])]:text-primary-foreground",
        false:
          "text-primary/70 hover:bg-primary/10 hover:text-primary focus:bg-primary focus:text-primary-foreground [&_svg:not([class*='text-'])]:text-primary/70 hover:[&_svg:not([class*='text-'])]:text-primary focus:[&_svg:not([class*='text-'])]:text-primary-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

const NavMenuItem = ({
  route,
  user,
}: AuthProps & {
  route: AppRoute;
}) => {
  const { pathname } = useLocation();
  const isActive =
    pathname === route.path ||
    (route.path.includes("/:") &&
      pathname.startsWith(route.path.split("/:")[0]));

  return canAccessRoute(route, user) ? (
    <NavigationMenuItem className="items-start">
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
  ) : null;
};

export default NavMenuItem;
