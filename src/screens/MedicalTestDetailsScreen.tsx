import { View } from "react-native";
import TextButton from "../components/buttons/TextButton";
import CText from "../components/ui/CText";

const MedicalTestDetailsScreen = ({}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <CText className="text-xl font-bold text-primary">
        Details of selected medical test
      </CText>

      {/* 👉 Conditions à respecter : */}
      {/* 👉 Prélèvement : */}
      {/* 💰 Prix : 61.500FCFA */}

      <View>
        <TextButton
          label={"Prendre un rdv pour cet examen"}
          onPress={() => {}}
        />
        <TextButton
          label={"Demander + d'info sur cet examen"}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default MedicalTestDetailsScreen;
