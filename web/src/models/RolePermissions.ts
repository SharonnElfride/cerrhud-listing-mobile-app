import type { Enums } from "@/lib/supabase/supabase";
import type { UserPermissions } from "./UserPermissions";

export const RolePermissions: Record<
  Enums<'user_role'>,
  UserPermissions
> = {
  user: {
    profiles: { create: false, read: false, update: false, delete: false },
    medical_tests: { create: false, read: true, update: false, delete: false },
  },
  admin: {
    profiles: { create: false, read: true, update: false, delete: false },
    medical_tests: { create: true, read: true, update: true, delete: true },
  },
  super_admin: {
    profiles: { create: true, read: true, update: true, delete: true },
    medical_tests: { create: true, read: true, update: true, delete: true },
  },
};
