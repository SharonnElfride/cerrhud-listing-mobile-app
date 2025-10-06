import { MedicalTestCatalogScreenData } from "@/src/constants/screens-data";
import { View } from "react-native";
import CDivider from "../ui/CDivider";
import CText from "../ui/CText";
import CTitleText from "../ui/CTitleText";

const CatalogTitle = () => {
  return (
    <View className="gap-2">
      <CTitleText>{MedicalTestCatalogScreenData.title}</CTitleText>
      <CDivider />
      <CText className="font-body text-base text-justify">
        {MedicalTestCatalogScreenData.subTitle}
      </CText>
    </View>
  );
};

export default CatalogTitle;
