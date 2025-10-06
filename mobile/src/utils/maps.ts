import { Platform, Linking } from "react-native";

export const openMap = (lat: number, lng: number) => {
  const url =
    Platform.OS === "ios"
      ? `http://maps.apple.com/?ll=${lat},${lng}`
      : `geo:${lat},${lng}?q=${lat},${lng}`;
  Linking.openURL(url);
};
