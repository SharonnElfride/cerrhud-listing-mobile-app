import { db, MedicalTestsTableName } from "../database/sqlite";
import { MedicalTest } from "../models/MedicalTest";

function fromDatabase(row: any) {
  return {
    id: row.id,
    title: row.title,
    acronym: row.acronym,
    price: row.price,
    image: row.image,
    conditions: row.conditions ? JSON.parse(row.conditions) : [],
    sampleInstructions: row.sample_instructions
      ? JSON.parse(row.sample_instructions)
      : [],
    customDetails: row.custom_details ? JSON.parse(row.custom_details) : [],
    whatsappId: row.whatsapp_id,
  } as MedicalTest;
}

export async function getMedicalTests(): Promise<MedicalTest[]> {
  const rows = await db.getAllAsync(`SELECT * FROM ${MedicalTestsTableName}`);
  return rows.map((row: any) => fromDatabase(row));
}

export async function getMedicalTestById(
  id: string
): Promise<MedicalTest | null> {
  const row = await db.getFirstAsync<MedicalTest>(
    `SELECT * FROM ${MedicalTestsTableName} WHERE id = ?`,
    id
  );
  return fromDatabase(row);
}

export async function insertMedicalTest(test: MedicalTest) {
  await db.runAsync(
    `INSERT OR REPLACE INTO ${MedicalTestsTableName} 
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
