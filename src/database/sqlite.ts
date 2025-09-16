import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("cerrhudLab.db");

export async function initDb() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS medical_tests (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      acronym TEXT NOT NULL,
      price NUMERIC NOT NULL,
      image TEXT,
      conditions TEXT,
      sample_instructions TEXT,
      custom_details TEXT,
      whatsapp_id TEXT NOT NULL
    );
  `);
}
