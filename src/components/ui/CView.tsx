import { ScreenData } from "@/src/constants/screens-data";
import { Blurhash } from "@/src/constants/shared";
import { Image } from "expo-image";
import { ScrollView, View, ViewProps } from "react-native";
import CDivider from "./CDivider";
import CText from "./CText";
import CTitleText from "./CTitleText";

const CView = ({
  children,
  viewData,
}: ViewProps & {
  viewData: ScreenData;
}) => {
  return (
    // <SafeAreaView className="flex-1">
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 20,
        paddingHorizontal: 10,
        gap: 10,
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        className={`flex flex-row ${viewData.image && viewData.image.length != 0 ? "items-end" : "items-center"} gap-3`}
      >
        {viewData.image && viewData.image.length != 0 && (
          <Image
            style={{
              width: 50,
              height: 50,
            }}
            source={viewData.image}
            placeholder={{ blurhash: Blurhash }}
            contentFit="cover"
            transition={1000}
          />
        )}
        <CTitleText>{viewData.title}</CTitleText>
      </View>
      <CDivider />

      <CText className="font-body text-base text-justify">
        {viewData.subTitle}
      </CText>

      {children}
    </ScrollView>
    // </SafeAreaView>
  );
};

export default CView;
