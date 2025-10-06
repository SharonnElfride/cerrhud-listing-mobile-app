import Ionicons from "@expo/vector-icons/Ionicons";
import { ImageBackground } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { FormatPrice } from "../constants/shared";
import { MedicalTest } from "../models/MedicalTest";
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
    <Pressable
      className="bg-card-background rounded-lg p-3 gap-3"
      onPress={() => {
        onMoreDetailsClick(medicalTest);
      }}
    >
      <View className="bg-primary border border-white rounded-lg gap-2 p-2">
        <CText
          className="text-white text-lg capitalize w-full text-justify"
          style={{
            fontFamily: "RobotoSerif_700Bold",
          }}
        >
          {medicalTest.title}
        </CText>
        <View className="flex-row justify-between items-center">
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
          <CText className="font-extrabold text-white">
            ({medicalTest.acronym})
          </CText>
        </View>
      </View>

      <View className="w-full">
        <ImageBackground
          source={{ uri: medicalTest.image }}
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

          <CText className="text-justify text-base px-2 text-black font-bold">
            {medicalTest.description}
          </CText>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

export default React.memo(MedicalTestCard);
