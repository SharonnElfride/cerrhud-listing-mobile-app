import CText from "./CText";

const CFormInputLabel = ({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) => {
  return (
    <CText className="text-lg font-bold text-primary">
      {label} {required && <CText className="text-xl font-bold">*</CText>}
    </CText>
  );
};

export default CFormInputLabel;
