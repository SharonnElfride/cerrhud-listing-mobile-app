/*
export async function getMedicalTests(): Promise<MedicalTest[]> {
  const rows = await db.getAllAsync(`SELECT * FROM ${MedicalTestsTableName}`);
  return rows.map((row: any) => fromDatabase(row));
}
*/

import { supabase } from "@/lib/supabase/client";
import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/lib/supabase/supabase";

const PROFILES_TABLENAME = "profiles";

export async function getProfiles() {
  let { data: profiles, error } = await supabase
    .from(PROFILES_TABLENAME)
    .select("*");

  if (error) throw error;

  return profiles;
}

export async function getProfileById(id: string) {
  let { data: profile, error } = await supabase
    .from(PROFILES_TABLENAME)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return profile;
}

export async function updateSingleProfile(
  profileData: TablesUpdate<"profiles">
) {
  // .update(updates)
  let { data: profile, error } = await supabase
    .from(PROFILES_TABLENAME)
    .update({ other_column: "otherValue" })
    .eq("id", profileData.id)
    .select()
    .single();

  if (error) throw error;

  return profile;
}

export async function addSingleProfile(
  profileData: TablesInsert<"profiles">,
  createdBy: string
) {
  // .insert(updates)
  let { data: profiles, error } = await supabase
    .from(PROFILES_TABLENAME)
    .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select()
    .eq("id", profileData.id)
    .single();

  if (error) throw error;

  return profiles;
}

export async function deleteProfiles(profileIds: string[]) {
  const { error } = await supabase
    .from(PROFILES_TABLENAME)
    .delete()
    .eq("id", profileIds[0]);

  if (error) throw error;

  return true;
}

export async function uploadAvatar(userId: string, file: File) {
  const filePath = `users/avatars/${userId}/avatar.png`;

  const { error: uploadError } = await supabase.storage
    .from("users/avatars")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("users/avatars")
    .getPublicUrl(filePath);
  return data.publicUrl;
}
