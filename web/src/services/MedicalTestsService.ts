import { supabase } from "@/lib/supabase/client";
import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/lib/supabase/supabase";
import { MEDICAL_TESTS_TABLENAME } from "@/utils/constants";

function fromDatabase(data: any): Tables<"medical_tests"> {
  return {
    acronym: data.acronym,
    conditions: data.conditions,
    created_at: data.created_at,
    created_by: data.created_by,
    custom_details: data.custom_details,
    deleted: data.deleted,
    description: data.description,
    id: data.id,
    image: data.image,
    keywords: data.keywords,
    mobile_id: data.mobile_id,
    price: data.price,
    sample_instructions: data.sample_instructions,
    title: data.title,
    updated_at: data.updated_at,
    updated_by: data.updated_by,
  };
}

export async function getMedicalTests() {
  let { data: medicalTests, error } = await supabase
    .from(MEDICAL_TESTS_TABLENAME)
    .select("*")
    .eq("deleted", false);

  if (error) throw error;

  return medicalTests?.map((test) => fromDatabase(test));
}

export async function getMedicalTestById(id: string) {
  let { data: medicalTest, error } = await supabase
    .from(MEDICAL_TESTS_TABLENAME)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return fromDatabase(medicalTest);
}

export async function addSingleMedicalTest(
  medicalTestData: TablesInsert<"medical_tests">
) {
  let { data: medicalTest, error } = await supabase
    .from(MEDICAL_TESTS_TABLENAME)
    .insert(medicalTestData)
    .select()
    .eq("id", medicalTestData.id)
    .single();

  if (error) throw error;

  return fromDatabase(medicalTest);
}

export async function updateSingleMedicalTest(
  id: string,
  medicalTestData: TablesUpdate<"medical_tests">
) {
  let { data: medicalTest, error } = await supabase
    .from(MEDICAL_TESTS_TABLENAME)
    .update(medicalTestData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return fromDatabase(medicalTest);
}

export async function deleteMedicalTests(medicalTestIds: string[]) {
  const { error } = await supabase
    .from(MEDICAL_TESTS_TABLENAME)
    .update({ deleted: true })
    .in("id", medicalTestIds);

  if (error) throw error;

  return true;
}

// async function deleteMedicalTests(medicalTestIds: string[]) {
//   const { error } = await supabase
//     .from(MEDICAL_TESTS_TABLENAME)
//     .delete()
//     .in("id", medicalTestIds);
//   if (error) throw error;
//   return true;
// }
