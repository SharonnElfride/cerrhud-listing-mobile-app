import { View, Text, Alert } from "react-native";
import TextButton from "../components/buttons/TextButton";

const CerrhudLabScreen = ({}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold text-primary">
        Cerrhud Lab info screen
      </Text>

      <TextButton label={"Book an appointment"} onPress={() => Alert.alert("Pressed")} />
    </View>
  );
};

export default CerrhudLabScreen;
