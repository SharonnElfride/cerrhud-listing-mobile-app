import * as MailComposer from "expo-mail-composer";
import { CerrhudLabData } from "../constants/cerrhud-lab-data";
import { sendTextMessageOnWhatsapp } from "./whatsapp";

export async function contactByMail() {
  const options: MailComposer.MailComposerOptions = {
    recipients: [CerrhudLabData.email],
    subject: "",
    body: "",
  };

  await MailComposer.composeAsync(options);
}

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
  }
}
