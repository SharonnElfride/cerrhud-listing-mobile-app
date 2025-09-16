import { MessageDateFormat } from "@/src/constants/shared";
import { AppointmentFormData } from "@/src/forms/AppointmentForm";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function appointmentBookingMessage(data: AppointmentFormData) {
  return `📋 Demande de rendez-vous

👤 Nom: ${data.name}
📅 Date de naissance: ${data.birthDate ? format(data.birthDate, MessageDateFormat, { locale: fr }) : ""}
📧 Email: ${data.email}
📞 Téléphone: +229${data.phoneNumber}
🧪 Examen(s) souhaité(s): ${data.medicalTests.join(", ")}
📆 Date souhaitée du rendez-vous: ${format(data.bookingDate, MessageDateFormat, { locale: fr })}
⏰ Heure souhaitée: ${data.bookingTime ?? "Non spécifiée"}
📄 Ordonnance: ${data.hasPrescription ? "Oui" : "Non"}
💬 Commentaires: ${data.comments ?? "-"}`;
}
