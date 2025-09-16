import { MedicalTest } from "../models/MedicalTest";
import CText from "./ui/CText";

interface MedicalTestCardProps {
  medicalTest: MedicalTest;
}

const MedicalTestCard = ({ medicalTest }: MedicalTestCardProps) => {
  return (
    <>
      <CText className="text-lg">{medicalTest.title}</CText>
      <CText className="text-base">{medicalTest.acronym}</CText>
    </>
  );
};

export default MedicalTestCard;
