import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type ButtonVariant = "text" | "icon" | "iconText";

type CButtonProps = {
  variant: ButtonVariant;
  label?: string;
  icon?: ReactNode;
  onPress: () => void;
};

// export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
const CButton = ({ variant, label, icon, onPress }: CButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-lg px-4 py-2 bg-purple-600"
      accessibilityLabel={`${label} button`}
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View className="flex-row items-center justify-center gap-2">
        {variant === "icon" && icon}
        {variant === "text" && label && (
          <Text className="text-white font-semibold">{label}</Text>
        )}
        {variant === "iconText" && (
          <>
            {icon}
            {label && <Text className="text-white font-semibold">{label}</Text>}
          </>
        )}
      </View>
    </Pressable>
  );
};

export default CButton;
