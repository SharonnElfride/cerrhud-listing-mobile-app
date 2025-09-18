interface CustomDetail {
  title: string;
  values: string[];
}

interface MedicalTest {
  id: string;
  title: string;
  acronym: string;
  price: number;
  image: string;
  conditions: string[];
  sampleInstructions?: string[];
  customDetails?: CustomDetail[];
  whatsappId: string;
}

export { type CustomDetail, type MedicalTest };

