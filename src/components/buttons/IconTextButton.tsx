import { IoniconName } from "@/src/constants/shared";
import CButton from "../ui/CButton";

const IconTextButton = ({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: IoniconName;
  onPress: () => void;
}) => {
  return (
    <CButton variant="iconText" label={label} icon={icon} onPress={onPress} />
  );
};

export default IconTextButton;
