import CButton, { CButtonProps } from "../ui/CButton";

const TextButton = ({
  label,
  onPress,
  buttonClassName,
  textClassName,
  disabled,
}: CButtonProps & {
  label: string;
}) => {
  return (
    <CButton
      variant="text"
      label={label}
      onPress={onPress}
      buttonClassName={buttonClassName}
      textClassName={textClassName}
      disabled={disabled}
    />
  );
};

export default TextButton;
