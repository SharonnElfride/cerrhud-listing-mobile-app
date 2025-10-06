import BookAppointmentScreen from "@/src/screens/BookAppointmentScreen";
import { useLocalSearchParams } from "expo-router";

export default function BookAppointment() {
  const { selectedTestId } = useLocalSearchParams();

  const selectedMedicalTestId = Array.isArray(selectedTestId)
    ? selectedTestId[0]
    : selectedTestId;

  return <BookAppointmentScreen selectedTestId={selectedMedicalTestId} />;
}
