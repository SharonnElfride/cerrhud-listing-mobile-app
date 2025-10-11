type UserRole = "user" | "admin" | "super_admin";

interface BasePermission {
  read: boolean;
  edit: boolean;
  delete: boolean;
}

interface UserPermissions {
  users: BasePermission;
  medicalTests: BasePermission;
}

interface User {
  id: string;
  first_name: string;
  surname: string;
  email: string;
  //   created_at: string;
  created_by?: string;
  hidden: boolean;
  profile_pic?: string;
  profile_color?: string; // default '#6e4596'
  //   permissions: string[];
  permissions: UserPermissions;
  role: UserRole;
  username?: string;
}

export { type User, type UserPermissions, type UserRole };

