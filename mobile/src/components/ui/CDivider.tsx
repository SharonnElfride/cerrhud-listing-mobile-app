import colors from "@/colors";
import { View } from "react-native";

const CDivider = ({ color }: { color?: string }) => {
  return (
    <View
      className="my-2 border-b-hairline"
      style={{
        borderBottomColor: color ? color : colors.accent,
      }}
    />
  );
};

export default CDivider;
