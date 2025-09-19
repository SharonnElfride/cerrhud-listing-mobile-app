import Ionicons from "@expo/vector-icons/Ionicons";
import { ImageBackground } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import { FormatPrice } from "../constants/shared";
import { MedicalTest } from "../models/MedicalTest";
import IconTextButton from "./buttons/IconTextButton";
import CText from "./ui/CText";

interface MedicalTestCardProps {
  medicalTest: MedicalTest;
}

const MedicalTestCard = ({
  medicalTest,
  onMoreDetailsClick,
}: MedicalTestCardProps & {
  onMoreDetailsClick: (medicalTest: MedicalTest) => void;
}) => {
  return (
    <View className="bg-card-background rounded-lg p-3">
      <View className="bg-primary border border-white rounded-lg gap-2 p-2">
        <CText
          className="text-white text-lg capitalize w-full text-justify"
          style={{
            fontFamily: "RobotoSerif_700Bold",
          }}
        >
          {medicalTest.title}
        </CText>
        <View className="flex-row gap-1 items-center">
          <Ionicons name="cash-outline" color={"white"} size={22} />
          <CText
            className="text-white text-sm font-semibold"
            style={{
              fontFamily: "Poppins_400Regular",
            }}
          >
            {FormatPrice(medicalTest.price)} FCFA
          </CText>
        </View>
      </View>

      <View className="w-full items-center p-2">
        <IconTextButton
          icon="albums-outline"
          label={"Voir plus de détails"}
          onPress={() => {
            onMoreDetailsClick(medicalTest);
          }}
        ></IconTextButton>
      </View>

      <View className="w-full">
        <ImageBackground
          source={medicalTest.image}
          style={{
            width: "100%",
            height: 100,
            justifyContent: "center",
          }}
          imageStyle={{ borderRadius: 5 }}
          contentFit="cover"
        >
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(255,255,255,0.69)",
              borderRadius: 5,
            }}
          />
          {/* <CText className="text-center text-lg text-black font-bold uppercase">
            {medicalTest.acronym}
          </CText> */}

          <CText className="text-justify text-base px-2 text-black font-bold">
            {medicalTest.description}
          </CText>
        </ImageBackground>
      </View>
    </View>
  );
};

// export default MedicalTestCard;
export default React.memo(MedicalTestCard);

/*
export default React.memo(MedicalTestCard, (prev, next) => {
  return (
    prev.medicalTest.id === next.medicalTest.id &&
    prev.medicalTest.price === next.medicalTest.price &&
    prev.medicalTest.title === next.medicalTest.title &&
    prev.medicalTest.acronym === next.medicalTest.acronym
  );
});
*/
