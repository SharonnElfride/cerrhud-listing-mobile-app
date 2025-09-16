import { db } from "../database/sqlite";
import { MedicalTest } from "../models/MedicalTest";

export async function getMedicalTests(): Promise<MedicalTest[]> {
  const result = await db.getAllAsync<MedicalTest>(
    `SELECT * FROM medical_tests`
  );
  return result;
}

export async function getMedicalTestById(
  id: string
): Promise<MedicalTest | null> {
  const result = await db.getFirstAsync<MedicalTest>(
    `SELECT * FROM medical_tests WHERE id = ?`,
    id
  );

  return result;
}

export async function insertMedicalTest(test: MedicalTest) {
  await db.runAsync(
    `INSERT OR REPLACE INTO medical_tests 
     (id, title, acronym, price, image, conditions, sample_instructions, custom_details, whatsapp_id) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      test.id,
      test.title,
      test.acronym,
      test.price,
      test.image,
      JSON.stringify(test.conditions),
      JSON.stringify(test.sampleInstructions),
      JSON.stringify(test.customDetails),
      test.whatsappId,
    ]
  );
}
