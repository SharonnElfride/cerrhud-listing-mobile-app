import { IconButtonSize, IoniconName } from "@/src/constants/shared";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dimensions, Pressable, Text, View } from "react-native";

type ButtonVariant = "text" | "icon" | "iconText";

type CButtonProps = {
  variant: ButtonVariant;
  label?: string;
  icon?: IoniconName;
  onPress: () => void;
};

/*
const variantStyles = {
  default: "rounded",
  primary: "bg-blue-500 text-white",
  secondary: "bg-white-500 text-black",
};
 
function MyComponent({ variant, className, ...props }) {
  return (
    <Text
      className={`
        ${variantStyles.default}
        ${variantStyles[variant]}
        ${className}
      `}
      {...props }
    />
  );
}
*/

// export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
const CButton = ({ variant, label, icon, onPress }: CButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-xl px-4 py-2 ${variant === "icon" ? "" : "w-3/4 bg-accent"}`}
      accessibilityLabel={`${label} button`}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
    >
      <View className="flex-row items-center justify-center gap-2">
        {(variant === "icon" || variant === "iconText") && icon && (
          <Ionicons name={icon} size={IconButtonSize} color={"white"} />
        )}

        {(variant === "text" || variant === "iconText") && label && (
          <Text className="text-white font-semibold">{label}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default CButton;
