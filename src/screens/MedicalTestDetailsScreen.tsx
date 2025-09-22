import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import TextButton from "../components/buttons/TextButton";
import CScreenFooter from "../components/CScreenFooter";
import CBulletList from "../components/ui/CBulletList";
import CChip from "../components/ui/CChip";
import CDivider from "../components/ui/CDivider";
import CText from "../components/ui/CText";
import CTitleText from "../components/ui/CTitleText";
import { FormatPrice } from "../constants/shared";
import { MedicalTest } from "../models/MedicalTest";

const MedicalTestDetailsScreen = ({
  medicalTest,
  onBookAppointmentPress,
  onMoreInfoPress,
}: {
  medicalTest: MedicalTest;
  onBookAppointmentPress: (medicalTestWhatsappId: string) => void;
  onMoreInfoPress: (medicalTestTitle: string) => void;
}) => {
  return (
    <View className="flex-1 w-full gap-5">
      <View className="w-full gap-2">
        <CTitleText className="text-pretty">{medicalTest.title}</CTitleText>

        <View className="flex-row justify-between">
          <CText className="text-lg font-extrabold">
            {medicalTest.acronym}
          </CText>
          <View className="flex-row gap-1 items-center">
            <Ionicons name="cash-outline" size={22} />
            <CText className="text-sm font-extrabold">
              {FormatPrice(medicalTest.price)} FCFA
            </CText>
          </View>
        </View>
      </View>

      <CDivider />

      <CText>{medicalTest.description}</CText>

      <DetailSection
        title={"Conditions à respecter"}
        items={medicalTest.conditions}
      />

      {medicalTest.sampleInstructions &&
        medicalTest.sampleInstructions.length > 0 && (
          <DetailSection
            title={"Prélèvement"}
            items={medicalTest.sampleInstructions}
          />
        )}

      {medicalTest.customDetails &&
        medicalTest.customDetails.map((detail, idx) => (
          <DetailSection
            key={`${detail.title}-${idx}`}
            title={detail.title}
            items={detail.values}
          />
        ))}

      <View className="flex-row flex-wrap justify-between gap-2">
        {medicalTest.keywords.map((kw, idx) => (
          <CChip
            key={`${medicalTest.whatsappId}-${kw.replace(" ", "")}-${idx}`}
            content={kw}
            isSelected={false}
            onToggle={() => {}}
          />
        ))}
      </View>

      <CDivider />

      <View className="items-center gap-2">
        <TextButton
          label={"Prendre un rdv pour cet examen"}
          onPress={() => onBookAppointmentPress(medicalTest.whatsappId)}
        />
        <TextButton
          label={"Demander plus d'informations sur cet examen"}
          onPress={() => onMoreInfoPress(medicalTest.title)}
          textClassName="h-full"
        />
      </View>

      <CScreenFooter />
    </View>
  );
};

const DetailSection = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
  return (
    <View className="gap-3">
      <CText className="text-primary text-lg underline underline-offset-8 text-pretty">
        👉 {title} :
      </CText>
      <CBulletList items={items} />
    </View>
  );
};

export default MedicalTestDetailsScreen;
