import { Text, TextProps } from "react-native";

const CText = ({ style, ...props }: TextProps) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "Poppins_400Regular",
        },
        style,
      ]}
    />
  );
};

export default CText;
