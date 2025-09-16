import { IoniconName } from "@/src/constants/shared";
import CButton from "../ui/CButton";

const IconTextButton = ({
  label,
  icon,
  onPress,
  className
}: {
  label: string;
  icon: IoniconName;
  onPress?: () => void;
  className?: string;
}) => {
  return (
    <CButton variant="iconText" label={label} icon={icon} onPress={onPress} className={className} />
  );
};

export default IconTextButton;
