import type { Enums } from "@/lib/supabase/supabase";

export function displayUserRole(userRole: Enums<"user_role">) {
  switch (userRole) {
    case "user":
      return "Utilisateur";
    case "admin":
      return "Administrateur";
    case "super_admin":
      return "Super administrateur";
    default:
      break;
  }
}
