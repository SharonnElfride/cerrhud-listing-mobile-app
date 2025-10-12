type UserRole = "user" | "admin" | "super_admin";

interface BasePermission {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface UserPermissions {
  users: BasePermission;
  medicalTests: BasePermission;
  // medical_tests: BasePermission;
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

export { type UserPermissions, type UserRole };

