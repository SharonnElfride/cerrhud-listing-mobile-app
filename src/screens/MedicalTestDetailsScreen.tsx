import { View } from "react-native";
import CText from "../components/ui/CText";

const MedicalTestDetailsScreen = ({}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <CText className="text-xl font-bold text-primary">
        Details of selected medical test
      </CText>
    </View>
  );
};

/*
price = 8000.5
formatted = f"{price:,.2f}".replace(",", " ").replace(".", ",")
print(formatted + " €")  # Output: 8 000,50 €
*/

export default MedicalTestDetailsScreen;
