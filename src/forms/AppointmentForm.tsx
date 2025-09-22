import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";
import TextButton from "../components/buttons/TextButton";
import { CCheckboxGroup } from "../components/ui/CCheckboxGroup";
import { CDateInput } from "../components/ui/CDateInput";
import CFormInputError from "../components/ui/CFormInputError";
import { CRadioGroup } from "../components/ui/CRadioGroup";
import CTextInput from "../components/ui/CTextInput";
import CTimePickerInput from "../components/ui/CTimePickerInput";
import { MedicalTest } from "../models/MedicalTest";
import { appointmentBookingMessage } from "../utils/messages/appointment-booking-message-template";
import { sendMessageOnWhatsapp } from "../utils/phone";
import { appointmentSchema } from "./appointment-schema";

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
export const OtherMedicalTestsCheckbox = {
  label: "Autre",
  value: "other",
};

export const AppointmentForm = ({
  medicalTests,
  selectedTestId,
}: {
  medicalTests: MedicalTest[];
  selectedTestId?: string;
}) => {
  const medicalTestsCheckboxes = medicalTests.map((test) => {
    return {
      label: `${test.title} (${test.acronym})`,
      value: test.whatsappId,
    };
  });

  medicalTestsCheckboxes.push(OtherMedicalTestsCheckbox);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      medicalTests: selectedTestId ? [selectedTestId] : [],
      hasPrescription: false,
    },
    reValidateMode: "onChange",
  });

  const onSubmit = (data: AppointmentFormData) => {
    const chosenMedicalTests = data.medicalTests.map(
      (id) =>
        medicalTests.find((x) => x.whatsappId === id)?.title ??
        (id === OtherMedicalTestsCheckbox.value
          ? OtherMedicalTestsCheckbox.label
          : "-")
    );

    data.medicalTests = chosenMedicalTests;
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

      <CCheckboxGroup
        control={control}
        controlName={"medicalTests"}
        controlLabel={"Examen(s) demandé(s)"}
        options={medicalTestsCheckboxes}
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
        {!isValid && Object.keys(errors).length > 0 && (
          <CFormInputError
            errorMessage={`⚠️ Veuillez corriger les erreurs dans le formulaire.`}
          />
        )}
        <TextButton
          label="Prendre un rendez-vous"
          onPress={handleSubmit(onSubmit)}
          textClassName="uppercase"
          buttonClassName={
            !isValid && Object.keys(errors).length > 0 ? "opacity-50" : ""
          }
          disabled={!isValid && Object.keys(errors).length > 0}
        />
      </View>
    </View>
  );
};
