import Ionicons from "@expo/vector-icons/Ionicons";
import { ImageBackground } from "expo-image";
import { StyleSheet, View } from "react-native";
import { FormatPrice } from "../constants/shared";
import { MedicalTest } from "../models/MedicalTest";
import TextButton from "./buttons/TextButton";
import CText from "./ui/CText";

interface MedicalTestCardProps {
  medicalTest: MedicalTest;
}

const MedicalTestCard = ({ medicalTest }: MedicalTestCardProps) => {
  return (
    <View className="bg-card-background rounded-lg p-3">
      <View className="bg-primary rounded-lg gap-2 p-2">
        <CText className="text-white text-lg font-[RobotoSerif_700Bold] capitalize w-full text-justify">
          {/* <CText className="text-white text-lg font-[RobotoSerif_700Bold] capitalize"> */}
          {medicalTest.title}
        </CText>
        <View className="flex-row gap-2 items-center">
          <Ionicons name="cash-outline" color={"white"} size={22} />
          <CText className="text-white text-sm">
            {/* {medicalTest.price} FCFA */}
            {FormatPrice(medicalTest.price)} FCFA
          </CText>
        </View>
      </View>

      <View className="w-full items-center p-2">
        {/* <Link href={"/cerrhud-lab"}>Voir + de détails</Link> */}
        <TextButton
          label={"Voir + de détails"}
          onPress={() => {
            // openBottomSheet(medicalTest)
          }}
        ></TextButton>
      </View>

      <View className="w-full">
        <ImageBackground
          source={require("@/assets/images/cerrhud-team.jpg")}
          style={{
            width: "100%",
            height: 150,
            justifyContent: "center",
            // borderRadius: 8,
          }}
          imageStyle={{ borderRadius: 8 }}
          contentFit="cover"
        >
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(255,255,255,0.69)",
              borderRadius: 8,
            }}
          />
          <CText className="text-center text-black font-bold">
            {medicalTest.acronym}
          </CText>
        </ImageBackground>
      </View>
    </View>
  );
};

export default MedicalTestCard;
