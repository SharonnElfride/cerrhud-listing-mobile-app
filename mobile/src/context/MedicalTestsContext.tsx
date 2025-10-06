import { initDb } from "@/src/database/sqlite";
import { MedicalTest } from "@/src/models/MedicalTest";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getMedicalTests } from "../services/MedicalTestsService";

type MedicalTestsContextType = {
  medicalTests: MedicalTest[];
  loading: boolean;
  error: string | null;
};

const MedicalTestsContext = createContext<MedicalTestsContextType | undefined>(
  undefined
);

export const useMedicalTests = () => {
  const context = useContext(MedicalTestsContext);
  if (!context) {
    throw new Error(
      "useMedicalTests must be used within a MedicalTestsProvider"
    );
  }
  return context;
};

type Props = { children: ReactNode };

export const MedicalTestsProvider = ({ children }: Props) => {
  const [medicalTests, setMedicalTests] = useState<MedicalTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMedicalTests() {
      try {
        setLoading(true);
        await initDb();
        const rows = await getMedicalTests();
        setMedicalTests(rows);
      } catch (e: any) {
        console.error("DB error:", e);
        setError("Impossible de charger les examens médicaux.");
      } finally {
        setLoading(false);
      }
    }

    fetchMedicalTests();
  }, []);

  return (
    <MedicalTestsContext.Provider value={{ medicalTests, loading, error }}>
      {children}
    </MedicalTestsContext.Provider>
  );
};
