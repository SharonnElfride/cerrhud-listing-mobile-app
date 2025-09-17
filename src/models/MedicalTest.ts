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

/*
// Iterate over the new customDetails
urineTest.customDetails?.forEach(detail => {
  console.log(detail.title);
  detail.values.forEach(value => console.log(" -", value));
});
*/

export { type MedicalTest, type CustomDetail };
