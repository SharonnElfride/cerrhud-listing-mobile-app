import { IconButtonSize, IoniconName } from "@/src/constants/shared";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";
import CText from "./CText";

type ButtonVariant = "text" | "icon" | "iconText";

export type CButtonProps = {
  onPress?: () => void;
  buttonClassName?: string;
  textClassName?: string;
  disabled?: boolean;
};

const textVariantStyles = {
  default: "text-white font-extrabold",
  text: "w-full text-center",
  iconText: "",
};

const CButton = ({
  variant,
  label,
  icon,
  onPress,
  buttonClassName,
  textClassName,
  disabled = false,
}: CButtonProps & {
  variant: ButtonVariant;
  label?: string;
  icon?: IoniconName;
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-xl px-4 py-2 ${variant === "icon" ? "" : "w-3/4 bg-accent"} ${buttonClassName}`}
      accessibilityLabel={`${label} button`}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
      disabled={disabled}
    >
      <View className="flex-row items-center justify-center gap-2">
        {(variant === "icon" || variant === "iconText") && icon && (
          <Ionicons name={icon} size={IconButtonSize} color={"white"} />
        )}

        {(variant === "text" || variant === "iconText") && label && (
          <CText
            className={`${textVariantStyles.default} ${textVariantStyles[variant]} ${textClassName}`}
          >
            {label}
          </CText>
        )}
      </View>
    </Pressable>
  );
};

export default CButton;
