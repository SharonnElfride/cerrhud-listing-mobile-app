interface CustomDetail {
  title: string;
  values: string[];
}

interface MedicalTest {
  id: string;
  title: string;
  acronym: string;
  description: string;
  price: number;
  image: string;
  conditions: string[];
  sampleInstructions?: string[];
  customDetails?: CustomDetail[];
  whatsappId: string;
  keywords: string[];
}

export { type CustomDetail, type MedicalTest };

