import { View } from "react-native";
import CText from "./CText";

const BulletItem = ({ text }: { text: string }) => (
  <View className="flex-row items-start gap-2">
    <CText className="text-xl">{"\u2022"}</CText>
    <CText style={{ flex: 1 }}>{text}</CText>
  </View>
);

const CBulletList = ({ items }: { items: string[] }) => {
  return (
    <View className="gap-2">
      {items.map((item, idx) => (
        <BulletItem key={idx} text={item} />
      ))}
    </View>
  );
};

export default CBulletList;
