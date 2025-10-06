import { IoniconName } from "./shared";

export type TopBarRoute = "app-bar";
export type BottomBarRoute = "index" | "book-appointment";

interface AppNavigationBarItem {
  id: TopBarRoute | BottomBarRoute;
  title: string;
}

export const TopBarItem: AppNavigationBarItem = {
  id: "app-bar",
  title: "Cerrhud Lab",
};

export const BottomBarItems: AppNavigationBarItem[] = [
  {
    id: "index",
    title: "Examens",
  },
  {
    id: "book-appointment",
    title: "Rendez-vous",
  },
];

export const BottomBarIcons: Record<
  BottomBarRoute,
  { active: IoniconName; inactive: IoniconName }
> = {
  index: {
    active: "flask",
    inactive: "flask-outline",
  },
  "book-appointment": {
    active: "calendar",
    inactive: "calendar-outline",
  },
};
