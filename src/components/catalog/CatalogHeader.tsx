import { View } from "react-native";
import { TextInput } from "react-native-paper";
import KeywordAccordion from "../KeywordAccordion";
import CatalogTitle from "./CatalogTitle";

const CatalogHeader = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  keywords,
  selectedKeywords,
  selectedKeyword,
  toggleKeyword,
}: {
  searchQuery: string;
  setSearchQuery: (value: React.SetStateAction<string>) => void;
  handleSearch: (query: string) => void;
  keywords: Set<string>;
  selectedKeywords: string[];
  selectedKeyword?: string;
  toggleKeyword: (keyword: string) => void;
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

      <KeywordAccordion
        keywords={keywords}
        selectedKeywords={selectedKeywords}
        selectedKeyword={selectedKeyword}
        toggleKeyword={toggleKeyword}
      />
    </View>
  );
};

export default CatalogHeader;
