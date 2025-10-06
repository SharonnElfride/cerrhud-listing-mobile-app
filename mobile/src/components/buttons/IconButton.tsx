import { IoniconName } from "@/src/constants/shared";
import CButton, { CButtonProps } from "../ui/CButton";

const IconButton = ({
  icon,
  onPress,
  buttonClassName,
  disabled,
}: CButtonProps & {
  icon: IoniconName;
}) => {
  return (
    <CButton
      variant="icon"
      icon={icon}
      onPress={onPress}
      buttonClassName={buttonClassName}
      disabled={disabled}
    />
  );
};

export default IconButton;
