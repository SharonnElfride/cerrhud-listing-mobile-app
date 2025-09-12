import { ReactNode } from "react";
import CButton from "../ui/CButton";

const IconButton = ({
  icon,
  onPress,
}: {
  icon: ReactNode;
  onPress: () => void;
}) => {
  return <CButton variant="icon" icon={icon} onPress={onPress} />;
};

export default IconButton;
