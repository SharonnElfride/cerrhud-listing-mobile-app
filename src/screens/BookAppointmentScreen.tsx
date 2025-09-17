import { Image } from "expo-image";
import { View } from "react-native";
import IconTextButton from "../components/buttons/IconTextButton";
import CDivider from "../components/ui/CDivider";
import CText from "../components/ui/CText";
import CTitleText from "../components/ui/CTitleText";
import CView from "../components/ui/CView";
import { CerrhudLabData } from "../constants/cerrhud-lab-data";
import { BookAppointmentScreenData } from "../constants/screens-data";
import { Blurhash } from "../constants/shared";
import { useMedicalTests } from "../context/MedicalTestsContext";
import { AppointmentForm } from "../forms/AppointmentForm";
import { AppointmentInfoMessage } from "../utils/messages/more-information-message-template";
import { sendMessageOnWhatsapp } from "../utils/phone";

const BookAppointmentScreen = () => {
  const { medicalTests } = useMedicalTests();

  return (
    <CView viewData={BookAppointmentScreenData}>
      <CText className="">
        Pour réserver vos examens, vos informations seront envoyées via WhatsApp
        si l'application est disponible sur votre téléphone. Si WhatsApp n'est
        pas installé ou disponible, nous utiliserons automatiquement un SMS.
        Veuillez vérifier que votre numéro de téléphone est correct afin que
        nous puissions vous répondre rapidement.
      </CText>

      <AppointmentForm medicalTests={medicalTests} />

      <View className="mt-10 gap-3">
        <View>
          <CTitleText>Demander plus d'informations</CTitleText>
          <CDivider />
        </View>
        <CText className="text-justify">
          Nous restons disponibles pour toute information complémentaire sur nos
          services et rendez-vous.
        </CText>
        <View className="w-full items-center">
          <IconTextButton
            label={"Nous contacter"}
            // icon={"logo-whatsapp"}
            icon={"chatbubbles-outline"}
            onPress={() => sendMessageOnWhatsapp(AppointmentInfoMessage)}
          />
        </View>
      </View>

      <View className="justify-center items-center w-full mt-5">
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
    </CView>
  );
};

export default BookAppointmentScreen;
