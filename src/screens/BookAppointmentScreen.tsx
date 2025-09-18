import { View } from "react-native";
import IconTextButton from "../components/buttons/IconTextButton";
import CScreenFooter from "../components/CScreenFooter";
import CCallout from "../components/ui/CCallout";
import CDivider from "../components/ui/CDivider";
import CText from "../components/ui/CText";
import CTitleText from "../components/ui/CTitleText";
import CView from "../components/ui/CView";
import { BookAppointmentScreenData } from "../constants/screens-data";
import { useMedicalTests } from "../context/MedicalTestsContext";
import { AppointmentForm } from "../forms/AppointmentForm";
import { AppointmentInfoMessage } from "../utils/messages/more-information-message-template";
import { sendMessageOnWhatsapp } from "../utils/phone";

const BookAppointmentScreen = ({
  selectedTestId,
}: {
  selectedTestId?: string;
}) => {
  const { medicalTests } = useMedicalTests();

  return (
    <CView viewData={BookAppointmentScreenData}>
      <CCallout type="accent">
        Vos informations seront envoyées via WhatsApp si l'application est
        disponible sur votre téléphone. Si WhatsApp n'est pas installé ou
        disponible, nous utiliserons automatiquement un SMS. Veuillez vérifier
        que votre numéro de téléphone est correct afin que nous puissions vous
        répondre rapidement.
      </CCallout>

      <AppointmentForm
        medicalTests={medicalTests}
        selectedTestId={selectedTestId}
      />

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
            icon={"chatbubbles-outline"}
            onPress={() => sendMessageOnWhatsapp(AppointmentInfoMessage)}
          />
        </View>
      </View>

      <CScreenFooter />
    </CView>
  );
};

export default BookAppointmentScreen;
