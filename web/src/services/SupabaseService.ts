import { supabase } from "@/lib/supabase/client";

export interface SupabaseAuthUser {
  email?: string;
  password?: string;
}

export async function updateSupabaseAuthUser(userData: SupabaseAuthUser) {
  const { error } = await supabase.auth.updateUser(userData);

  if (error) throw error;

  return true;
}
