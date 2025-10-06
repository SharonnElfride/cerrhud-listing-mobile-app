import { IoniconName } from "@/src/constants/shared";
import CButton, { CButtonProps } from "../ui/CButton";

const IconTextButton = ({
  label,
  icon,
  onPress,
  buttonClassName,
  textClassName,
  disabled,
}: CButtonProps & {
  label: string;
  icon: IoniconName;
}) => {
  return (
    <CButton
      variant="iconText"
      label={label}
      icon={icon}
      onPress={onPress}
      textClassName={textClassName}
      buttonClassName={buttonClassName}
      disabled={disabled}
    />
  );
};

export default IconTextButton;
