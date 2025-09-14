import { IoniconName } from "./shared";

export type BottomBarRoute = "index" | "book-appointment";

interface AppNavigationBarItem {
  id: BottomBarRoute | string;
  title: string;
}

export const TopBarItem: AppNavigationBarItem = {
  id: "app-bar",
  title: "Cerrhud Lab"
}

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
