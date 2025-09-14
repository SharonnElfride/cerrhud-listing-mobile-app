import colors from "@/colors";
import { View } from "react-native";

const CDivider = ({ color }: { color?: string }) => {
  return (
    <View
      // className="my-2 border-b-hairline border-b-[#737373]"
      className="my-2 border-b-hairline"
      style={{
        // borderBottomColor: color ? color : colors.primary.DEFAULT,
        borderBottomColor: color ? color : colors.accent,
      }}
    />
  );
};

export default CDivider;
