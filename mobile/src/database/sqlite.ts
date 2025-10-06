import seed from "@/assets/data/seed.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import uuid from "react-native-uuid";

export const DatabaseName = "cerrhudLab.db";
export const MedicalTestsTableName = "medical_tests";
export const db = SQLite.openDatabaseSync(DatabaseName);

export async function initDb() {
  const DB_SEEDED_CACHE_KEY = "db_seeded";
  const isSeeded = await AsyncStorage.getItem(DB_SEEDED_CACHE_KEY);
  if (!isSeeded) {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS ${MedicalTestsTableName} (
          id TEXT PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          acronym TEXT NOT NULL,
          description TEXT NOT NULL,
          price NUMERIC NOT NULL,
          image TEXT,
          conditions TEXT,
          sample_instructions TEXT,
          custom_details TEXT,
          whatsapp_id TEXT NOT NULL UNIQUE,
          keywords TEXT
        );
      `);

    await db.execAsync("BEGIN TRANSACTION;");
    for (const test of seed.medicalTests) {
      await db.runAsync(
        `
          INSERT OR REPLACE INTO ${MedicalTestsTableName} 
            (id, title, acronym, description, price, image, conditions, sample_instructions, custom_details, whatsapp_id, keywords) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
        [
          uuid.v4(),
          test.title,
          test.acronym,
          test.description,
          test.price,
          test.image,
          JSON.stringify(test.conditions || []),
          JSON.stringify(test.sampleInstructions || []),
          JSON.stringify(test.customDetails || []),
          test.whatsappId,
          JSON.stringify(test.keywords || []),
        ]
      );
    }
    await db.execAsync("COMMIT;");

    await AsyncStorage.setItem(DB_SEEDED_CACHE_KEY, "true");
  }
}
