import * as MailComposer from "expo-mail-composer";
import { CerrhudLabData } from "../constants/cerrhud-lab-data";
import { sendTextMessageOnWhatsapp } from "./whatsapp";

export async function sendPrescriptionViaMail(
  message: string,
  prescriptionFileUri?: string
) {
  if (!prescriptionFileUri) {
    sendTextMessageOnWhatsapp(message);
  } else {
    const options: MailComposer.MailComposerOptions = {
      recipients: [CerrhudLabData.email],
      subject: "Nouvelle demande de rendez-vous accompagnée d'une ordonnance",
      body: message,
      attachments: prescriptionFileUri ? [prescriptionFileUri] : undefined,
    };

    await MailComposer.composeAsync(options);
    // const result = await MailComposer.composeAsync(options);
    // console.log("MailComposer result:", result.status);
  }
}
