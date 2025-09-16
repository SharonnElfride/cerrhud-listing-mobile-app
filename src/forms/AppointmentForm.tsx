import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";
import TextButton from "../components/buttons/TextButton";
import { CCheckboxGroup } from "../components/ui/CCheckboxGroup";
import { CDateInput } from "../components/ui/CDateInput";
import { CRadioGroup } from "../components/ui/CRadioGroup";
import CTextInput from "../components/ui/CTextInput";
import CTimePickerInput from "../components/ui/CTimePickerInput";
import { appointmentBookingMessage } from "../utils/messages/appointment-booking-message-template";
import { sendMessageOnWhatsapp } from "../utils/phone";
import { appointmentSchema } from "./appointment-schema";

export type AppointmentFormData = z.infer<typeof appointmentSchema>;

export const AppointmentForm = () => {
  const { control, handleSubmit } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      medicalTests: [],
      hasPrescription: false,
    },
  });

  const onSubmit = (data: AppointmentFormData) => {
    const message = appointmentBookingMessage(data);
    sendMessageOnWhatsapp(message);
  };

  return (
    <View className="bg-white rounded-xl shadow-md shadow-black/50 elevation-md p-5 gap-5">
      <CTextInput<AppointmentFormData>
        control={control}
        controlLabel={"Nom et prénom"}
        controlName={"name"}
        controlPlaceholder={"Nom"}
        required={true}
      />

      <CTextInput<AppointmentFormData>
        control={control}
        controlLabel={"E-mail"}
        controlName={"email"}
        controlPlaceholder={"jane@doe.com"}
        keyboardType="email-address"
        required={true}
      />

      <CTextInput<AppointmentFormData>
        control={control}
        controlLabel={"Numéro de téléphone"}
        controlName={"phoneNumber"}
        controlPlaceholder={"0199999999"}
        keyboardType="numeric"
        required={true}
      />

      <CDateInput
        control={control}
        controlName={"birthDate"}
        controlLabel={"Date de naissance"}
      />

      {/* Examen(s) demandé(s) */}
      <CCheckboxGroup
        control={control}
        controlName={"medicalTests"}
        controlLabel={"Examen(s) demandé(s)"}
        options={[
          { label: "What", value: "what" },
          { label: "Etc", value: "etc" },
        ]}
        required
      />

      <CDateInput
        control={control}
        controlName={"bookingDate"}
        controlLabel={"Date de rendez-vous souhaitée"}
        required
      />

      <CTimePickerInput
        control={control}
        label={"Heure de rendez-vous souhaitée"}
        name="bookingTime"
      />

      <CRadioGroup
        control={control}
        controlName={"hasPrescription"}
        controlLabel={"Avez-vous une ordonnance ?"}
        options={[
          { label: "Oui", value: true },
          { label: "Non", value: false },
        ]}
        required
      />

      <CTextInput<AppointmentFormData>
        control={control}
        controlLabel={"Remarques et précisions"}
        controlName={"comments"}
        controlPlaceholder={""}
        isTextArea
      />

      <View className="w-full items-center mt-5">
        <TextButton
          label="Prendre un rendez-vous"
          onPress={handleSubmit(onSubmit)}
          className="uppercase"
        />
      </View>
    </View>
  );
};
