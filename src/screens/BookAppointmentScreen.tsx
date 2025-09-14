import { Alert } from "react-native";
import TextButton from "../components/buttons/TextButton";
import CView from "../components/ui/CView";
import {
  BookAppointmentScreenData
} from "../constants/screens-data";

const BookAppointmentScreen = ({}) => {
  return (
    <CView viewData={BookAppointmentScreenData}>
      <TextButton
        label={"Book an appointment"}
        onPress={() => Alert.alert("Pressed")}
      />
    </CView>
  );
};

export default BookAppointmentScreen;
