import { View, Text, Alert } from "react-native";
import TextButton from "../components/buttons/TextButton";

const CerrhudLabScreen = ({}) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-purple-600">
        Cerrhud Lab info screen
      </Text>

      <TextButton label={"Press me"} onPress={() => Alert.alert("Pressed")} />
    </View>
  );
};

export default CerrhudLabScreen;
