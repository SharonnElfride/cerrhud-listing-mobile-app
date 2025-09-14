import { ScreenData } from "@/src/constants/screens-data";
import { Blurhash } from "@/src/constants/shared";
import { Image } from "expo-image";
import { ScrollView, Text, View, ViewProps } from "react-native";
import CDivider from "./CDivider";

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
        <Text
          className="text-xl text-primary capitalize w-full"
          style={{ fontFamily: "RobotoSerif_700Bold" }}
        >
          {viewData.title}
        </Text>
      </View>
      <CDivider />

      <Text className="font-body text-base text-justify">
        {viewData.subTitle}
      </Text>

      {children}
    </ScrollView>
    // </SafeAreaView>
  );
};

export default CView;
