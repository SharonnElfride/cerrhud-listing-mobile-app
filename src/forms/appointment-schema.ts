import { z } from "zod";
import { FormErrorMessages } from "../constants/shared";

export const appointmentSchema = z.object({
  name: z.string(FormErrorMessages.required()).min(1, FormErrorMessages.required()),
  birthDate: z.date(FormErrorMessages.invalid()).optional(),
  email: z.email(FormErrorMessages.invalid("📧 Adresse e-mail")),
  phoneNumber: z
    .string(FormErrorMessages.required())
    .min(1, FormErrorMessages.required())
    .length(10, FormErrorMessages.invalid("📞 Numéro de téléphone")),
  medicalTests: z
    .array(z.string())
    .min(1, FormErrorMessages.required("Choisissez au moins un examen.")),
  bookingDate: z.date(FormErrorMessages.invalid()),
  bookingTime: z.string().optional(),
  hasPrescription: z.boolean(FormErrorMessages.required()),
  comments: z.string().optional(),
});
