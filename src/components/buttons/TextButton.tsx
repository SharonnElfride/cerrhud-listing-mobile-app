import CButton from "../ui/CButton";

const TextButton = ({
  label,
  onPress,
  className
}: {
  label: string;
  onPress: () => void;
  className?: string;
}) => {
  return <CButton variant="text" label={label} onPress={onPress} className={className} />;
};

export default TextButton;
