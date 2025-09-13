import { Text } from "react-native";

interface ScreenHeaderProps {
  title: string;
  description: string;
}

const ScreenHeader = ({ title, description }: ScreenHeaderProps) => {
  return (
    <>
      <Text className="text-lg">{title}</Text>
      <Text className="text-base">{description}</Text>
    </>
  );
};

export default ScreenHeader;
