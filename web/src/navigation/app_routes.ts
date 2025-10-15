import type { Enums } from "@/lib/supabase/supabase";
import type { PermissionKey } from "@/models/UserPermissions";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";
import Dashboard from "@/pages/dashboard";
import MedicalTests from "@/pages/medicalTests";
import AddMedicalTest from "@/pages/medicalTests/AddMedicalTest";
import EditMedicalTest from "@/pages/medicalTests/EditMedicalTest";
import ViewMedicalTest from "@/pages/medicalTests/ViewMedicalTest";
import Profile from "@/pages/profile";
import Users from "@/pages/users";
import AddUser from "@/pages/users/AddUser";
import EditUser from "@/pages/users/EditUser";
import ViewUser from "@/pages/users/ViewUser";
import {
  EditIcon,
  EyeIcon,
  HomeIcon,
  PlusSquareIcon,
  TestTubesIcon,
  UsersIcon,
  type LucideProps,
} from "lucide-react";
import type { JSX } from "react";

type RouteType = "auth" | "public" | "protected";

export interface AppRoute {
  path: string;
  label: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  route: ({}: {}) => JSX.Element;
  type: RouteType;
  redirectTo?: string;
  requiredRoles?: Enums<"user_role">[];
  requiredPermissions?: PermissionKey[];
  children?: AppRoute[];
}

export const appRoutes: AppRoute[] = [
  {
    path: "/",
    label: "Login",
    route: Login,
    type: "auth",
    redirectTo: "/dashboard"
  },
  // {
  //   path: "/forgot-password",
  //   label: "Forgot Password",
  //   route: ForgotPassword,
  //   type: "auth",
  // },
  {
    path: "/dashboard",
    label: "Dashboard",
    route: Dashboard,
    icon: HomeIcon,
    type: "protected",
  },
  {
    path: "/medical-tests",
    label: "Medical Tests",
    icon: TestTubesIcon,
    route: MedicalTests,
    type: "protected",
    requiredRoles: ["user", "admin", "super_admin"],
    requiredPermissions: ["medical_tests.read"],
    children: [
      {
        path: "/medical-tests/new",
        label: "Add a medical test",
        icon: PlusSquareIcon,
        route: AddMedicalTest,
        type: "protected",
        requiredRoles: ["admin", "super_admin"],
        requiredPermissions: ["medical_tests.create"],
      },
      {
        path: "/medical-tests/:id",
        label: "Medical Test Details",
        icon: EyeIcon,
        route: ViewMedicalTest,
        type: "protected",
        requiredRoles: ["user", "admin", "super_admin"],
        requiredPermissions: ["medical_tests.read"],
      },
      {
        path: "/medical-tests/edit/:id",
        label: "Edit Medical Test Details",
        icon: EditIcon,
        route: EditMedicalTest,
        type: "protected",
        requiredRoles: ["admin", "super_admin"],
        requiredPermissions: ["medical_tests.update"],
      },
    ],
  },
  {
    path: "/users",
    label: "Users",
    icon: UsersIcon,
    route: Users,
    type: "protected",
    requiredRoles: ["admin", "super_admin"],
    requiredPermissions: ["users.read"],
    children: [
      {
        path: "/users/new",
        label: "Add a user",
        icon: PlusSquareIcon,
        route: AddUser,
        type: "protected",
        requiredRoles: ["super_admin"],
        requiredPermissions: ["users.create"],
      },
      {
        path: "/users/:id",
        label: "User's Details",
        icon: EyeIcon,
        route: ViewUser,
        type: "protected",
        requiredRoles: ["admin", "super_admin"],
        requiredPermissions: ["users.read"],
      },
      {
        path: "/users/edit/:id",
        label: "Edit User's Details",
        icon: EditIcon,
        route: EditUser,
        type: "protected",
        requiredRoles: ["super_admin"],
        requiredPermissions: ["users.update"],
      },
    ],
  },
  {
    path: "/profile",
    label: "Profile",
    route: Profile,
    type: "protected",
  },
  {
    path: "/unauthorized",
    label: "Unauthorised",
    route: Unauthorized,
    type: "public",
  },
  {
    path: "*",
    label: "Not found",
    route: NotFound,
    type: "public",
  },
];
