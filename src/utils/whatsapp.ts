import { Linking } from "react-native";
import Share, { Social } from "react-native-share";
import { CerrhudLabData } from "../constants/cerrhud-lab-data";
import { sendSms } from "./phone";

export function sendTextMessageOnWhatsapp(message: string = "") {
  const url = `https://wa.me/${CerrhudLabData.phoneNumber}?text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch((err) => {
    console.error("Failed to open WhatsApp:", err);
    sendSms(message);
  });
}

export async function sendMessageAndPrescriptionOnWhatsapp(
  message: string = "",
  prescriptionFileUri: string
) {
  // const url = `https://wa.me/${CerrhudLabData.phoneNumber}?text=${encodeURIComponent(message)}`;

  await Share.shareSingle({
    url: prescriptionFileUri,
    social: Social.Whatsapp, // Directly target WhatsApp
    message: encodeURIComponent(message),
  });
}
