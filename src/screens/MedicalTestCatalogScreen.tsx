import { Link } from "expo-router";
import { View, Text } from "react-native";

const MedicalTestCatalogScreen = ({}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold text-primary">
        Catalog of Medical tests
      </Text>
      <Link href={"/cerrhud-lab"}>Go to lab</Link>
    </View>
  );
};

export default MedicalTestCatalogScreen;
