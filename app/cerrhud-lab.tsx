import TextButton from "@/src/components/buttons/TextButton";
import { Alert, Text, View } from "react-native";

export default function CerrhudLab() {
  return (
    <View>
      <Text>Cerrhud Lab</Text>
      <TextButton label={"Press me"} onPress={() => Alert.alert("Pressed")} />
    </View>
  );
}
