import { View } from "react-native";
import { Image } from "expo-image";
import { CerrhudLabData } from "../constants/cerrhud-lab-data";
import { Blurhash } from "../constants/shared";

const CScreenFooter = () => {
  return (
    <View className="justify-center items-center w-full mt-5 mb-10">
      <Image
        style={{
          width: 150,
          height: 150,
        }}
        source={CerrhudLabData.logo}
        placeholder={{ blurhash: Blurhash }}
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
};

export default CScreenFooter;
