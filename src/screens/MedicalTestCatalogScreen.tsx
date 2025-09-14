import { Alert } from "react-native";
import TextButton from "../components/buttons/TextButton";
import CView from "../components/ui/CView";
import { MedicalTestCatalogScreenData } from "../constants/screens-data";

const MedicalTestCatalogScreen = ({}) => {
  return (
    <CView viewData={MedicalTestCatalogScreenData}>
      <TextButton
        label={"Book an appointment"}
        onPress={() => Alert.alert("Pressed")}
      />
    </CView>
  );
};

//   {/* <FontAwesome.Button
//     name="whatsapp"
//     backgroundColor="#25D366"
//     // onPress={() => {}}
//   >
//     Book on WhatsApp
//   </FontAwesome.Button> */}

export default MedicalTestCatalogScreen;
