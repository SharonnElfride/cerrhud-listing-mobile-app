import * as DocumentPicker from "expo-document-picker";
import Share, { Social } from "react-native-share";

export async function pickAndShareFile() {
  try {
    // Step 1: Pick a file
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/jpeg", "image/png", "application/pdf"],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled || result.assets.length === 0) return;

    const fileUri = result.assets[0].uri;

    // Step 2: Share to WhatsApp
    // await Share.open({
    await Share.shareSingle({
      url: fileUri,
      social: Social.Whatsapp, // Directly target WhatsApp
      message: "Here is the file you requested 📎",
    });
  } catch (err) {
    console.error("Error sharing file:", err);
  }
}
