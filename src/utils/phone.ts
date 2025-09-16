import { Alert, Linking, Platform } from "react-native";
import { CerrhudLabData } from "../constants/cerrhud-lab-data";
import { PhoneErrorMessages } from "../constants/shared";

export function callNumber() {
  const phoneNumber =
    Platform.OS === "android"
      ? `tel:${CerrhudLabData.phoneNumber}`
      : `telprompt:${CerrhudLabData.phoneNumber}`;

  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert(PhoneErrorMessages.call);
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) =>
      console.error(`${PhoneErrorMessages.default} dialer : `, err)
    );
}

export function sendMessageOnWhatsapp(message: string = "") {
  const url = `https://api.whatsapp.com/send?phone=${CerrhudLabData.phoneNumber}&text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch((err) => {
    console.error("Failed to open WhatsApp:", err);
    sendSms(message);
  });
}

export function sendSms(message: string = "") {
  // On iOS, sms: opens Messages; sms:&body= works only on some versions
  const separator = Platform.OS === "ios" ? "&" : "?";
  const url = `sms:${CerrhudLabData.phoneNumber}${message ? `${separator}body=${encodeURIComponent(message)}` : ""}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert(PhoneErrorMessages.sms);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error(`${PhoneErrorMessages.default} SMS : `, err));
}
