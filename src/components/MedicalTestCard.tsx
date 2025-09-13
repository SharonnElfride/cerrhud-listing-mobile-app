import { Text } from "react-native";
import { MedicalTest } from "../models/MedicalTest";

interface MedicalTestCardProps {
  medicalTest: MedicalTest;
}

const MedicalTestCard = ({ medicalTest }: MedicalTestCardProps) => {
  return (
    <>
      <Text className="text-lg">{medicalTest.title}</Text>
      <Text className="text-base">{medicalTest.acronym}</Text>
    </>
  );
};

export default MedicalTestCard;
