import { Link } from "expo-router";
import { Text, View } from "react-native";

const MedicalTestCatalogScreen = ({}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold text-primary">
        Catalog of Medical tests
      </Text>
      {/* <FontAwesome.Button
        name="whatsapp"
        backgroundColor="#25D366"
        // onPress={() => {}}
      >
        Book on WhatsApp
      </FontAwesome.Button> */}
    </View>
  );
};

export default MedicalTestCatalogScreen;
