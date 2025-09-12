import { ReactNode } from "react";
import CButton from "../ui/CButton";

const IconTextButton = ({
  label,
  icon,
  onPress,
}: {
  label?: string;
  icon?: ReactNode;
  onPress: () => void;
}) => {
  return (
    <CButton variant="iconText" label={label} icon={icon} onPress={onPress} />
  );
};

export default IconTextButton;
