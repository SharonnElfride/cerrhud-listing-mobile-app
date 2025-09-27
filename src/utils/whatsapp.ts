import { Linking } from "react-native";
import { CerrhudLabData } from "../constants/cerrhud-lab-data";
import { sendSms } from "./phone";

export function sendTextMessageOnWhatsapp(message: string = "") {
  const url = `https://wa.me/${CerrhudLabData.phoneNumber}?text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch((err) => {
    console.error("Failed to open WhatsApp:", err);
    sendSms(message);
  });
}
