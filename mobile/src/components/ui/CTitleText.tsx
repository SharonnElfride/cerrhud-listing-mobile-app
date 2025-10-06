import { Text, TextProps } from "react-native";

const CTitleText = ({ style, className, ...props }: TextProps) => {
  return (
    <Text
      {...props}
      className={`text-xl text-primary capitalize w-full ${className}`}
      style={[
        {
          fontFamily: "RobotoSerif_700Bold",
        },
        style,
      ]}
    />
  );
};

export default CTitleText;
