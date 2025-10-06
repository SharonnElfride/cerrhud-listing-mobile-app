import { FormErrorMessages } from "@/src/constants/shared";
import CText from "./CText";

const CFormInputError = ({ errorMessage }: { errorMessage?: string }) => {
  return (
    <CText className="text-red font-semibold">
      {errorMessage ?? FormErrorMessages.invalid()}
    </CText>
  );
};

export default CFormInputError;
