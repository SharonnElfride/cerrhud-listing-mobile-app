import { BottomBarIcons, BottomBarRoute } from "@/src/constants/navigation";
import { IconSize } from "@/src/constants/shared";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface CTabBottomBarButtonProps {
  onPress: () => void;
  onLongPress?: () => void;
  isFocused: boolean;
  label:
    | string
    | ((props: {
        focused: boolean;
        color: string;
        position: "below-icon" | "beside-icon";
        children: string;
      }) => React.ReactNode);
  routeName: string;
  color: string;
  accessibilityLabel?: string;
}

const CTabBottomBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  label,
  routeName,
  color,
  accessibilityLabel,
}: CTabBottomBarButtonProps) => {
  const bottomBarItemIcon = BottomBarIcons[routeName as BottomBarRoute] ?? {
    active: "help",
    inactive: "help-outline",
  };

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 400 });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);

    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
    };
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 justify-center items-center gap-2"
    >
      <Animated.View style={animatedIconStyle}>
        <Ionicons
          name={
            isFocused ? bottomBarItemIcon.active : bottomBarItemIcon.inactive
          }
          size={IconSize}
          color={color}
        />
      </Animated.View>

      {typeof label === "function" ? (
        label({
          focused: isFocused,
          color: color,
          position: "below-icon",
          children: routeName,
        })
      ) : (
        <Animated.Text style={[{ color: color, fontSize: 12 }]}>
          {label}
        </Animated.Text>
      )}
    </Pressable>
  );
};

export default CTabBottomBarButton;
