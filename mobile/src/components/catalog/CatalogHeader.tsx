import { View } from "react-native";
import { TextInput } from "react-native-paper";
import KeywordAccordion from "../KeywordAccordion";
import CText from "../ui/CText";
import CatalogTitle from "./CatalogTitle";

const CatalogHeader = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  filteredMedicalTestsTotal,
  medicalTestsTotal,
  keywords,
  selectedKeywords,
  setSelectedKeywords,
  multipleSelection,
}: {
  searchQuery: string;
  setSearchQuery: (value: React.SetStateAction<string>) => void;
  handleSearch: (query: string) => void;
  filteredMedicalTestsTotal: number;
  medicalTestsTotal: number;
  keywords: Set<string>;
  selectedKeywords: string[];
  setSelectedKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  multipleSelection?: boolean;
  limit?: number;
}) => {
  return (
    <View className="gap-5 pb-5">
      <CatalogTitle />

      <TextInput
        mode="outlined"
        dense
        value={searchQuery}
        onChangeText={setSearchQuery}
        onEndEditing={(e) => handleSearch(e.nativeEvent.text)}
        placeholder="Rechercher un examen..."
        left={<TextInput.Icon icon="magnify" />}
        style={{
          backgroundColor: "#fff",
          fontSize: 14,
        }}
        contentStyle={{
          fontFamily: "Poppins_400Regular",
          paddingVertical: 0,
        }}
        theme={{
          roundness: 50,
        }}
        returnKeyType="search"
        submitBehavior="blurAndSubmit"
      />

      <View className="gap-1 mb-2">
        <CText className="text-base underline">Filtres</CText>

        <KeywordAccordion
          keywords={keywords}
          selectedKeywords={selectedKeywords}
          setSelectedKeywords={setSelectedKeywords}
          multipleSelection={multipleSelection}
        />
      </View>

      <CText className="text-sm">
        Total: {filteredMedicalTestsTotal} / {medicalTestsTotal}
      </CText>
    </View>
  );
};

export default CatalogHeader;
