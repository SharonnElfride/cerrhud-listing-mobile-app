interface MedicalTestModel {
  id: string;
  title: string;
  acronym: string;
  price: number;
  image: string;
  conditions: string[];
  sampleInstructions?: string[];
  customDetails?: Map<string, string[]>;
  whatsappId: string;
}

export { type MedicalTestModel };
