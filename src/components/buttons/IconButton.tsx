import { IoniconName } from "@/src/constants/shared";
import CButton from "../ui/CButton";

const IconButton = ({
  icon,
  onPress,
}: {
  icon: IoniconName;
  onPress: () => void;
}) => {
  return <CButton variant="icon" icon={icon} onPress={onPress} />;
};

export default IconButton;
