import CButton from "../ui/CButton";

const TextButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => {
  return <CButton variant="text" label={label} onPress={onPress} />;
};

export default TextButton;
