import colors from "@/colors";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { TextInput } from "react-native-paper";
import CScreenFooter from "../components/CScreenFooter";
import KeywordAccordion from "../components/KeywordAccordion";
import MedicalTestCard from "../components/MedicalTestCard";
import CDivider from "../components/ui/CDivider";
import CText from "../components/ui/CText";
import CTitleText from "../components/ui/CTitleText";
import { MedicalTestCatalogScreenData } from "../constants/screens-data";
import { useMedicalTests } from "../context/MedicalTestsContext";
import { MedicalTest } from "../models/MedicalTest";
import { medicalTestsInfoMessage } from "../utils/messages/more-information-message-template";
import { sendMessageOnWhatsapp } from "../utils/phone";
import MedicalTestDetailsScreen from "./MedicalTestDetailsScreen";

const MedicalTestCatalogScreen = () => {
  const { medicalTests, loading, error } = useMedicalTests();
  const [filteredData, setFilteredData] = useState<MedicalTest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMedicalTest, setSelectedMedicalTest] = useState<MedicalTest>();

  const [keywords, setKeywords] = useState(new Set<string>());
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  useEffect(() => {
    if (!medicalTests.length) return;

    setFilteredData(medicalTests);

    const arr = Array.from(
      medicalTests.flatMap((test) => test.keywords)
    ).sort();
    const distinctKeywords = new Set(arr);
    setKeywords(distinctKeywords);
  }, [medicalTests]);

  useEffect(() => {
    let data = medicalTests;

    const lowerQuery = searchQuery.trim().toLowerCase();
    if (lowerQuery) {
      data = data.filter(
        (test) =>
          test.title.toLowerCase().includes(lowerQuery) ||
          test.acronym.toLowerCase().includes(lowerQuery) ||
          test.description.toLowerCase().includes(lowerQuery) ||
          test.keywords.some((kw) => kw.toLowerCase().includes(lowerQuery))
      );
    }

    if (selectedKeywords.length > 0) {
      data = data.filter((test) =>
        selectedKeywords.some((keyword) => test.keywords.includes(keyword))
      );
    }

    setFilteredData(data);
  }, [searchQuery, medicalTests, selectedKeywords]);

  function onBookAppointmentPress(medicalTestWhatsappId: string) {
    bottomSheetRef.current?.close();

    setTimeout(() => {
      router.navigate({
        pathname: "/(tabs)/book-appointment",
        params: { selectedTestId: medicalTestWhatsappId },
      });
    }, 300);
  }

  function onMoreInfoPress(medicalTestTitle: string) {
    sendMessageOnWhatsapp(medicalTestsInfoMessage([medicalTestTitle]));
  }

  const openSheet = (test: MedicalTest) => {
    setSelectedMedicalTest(test);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((kw) => kw !== keyword)
        : [...prev, keyword]
    );
  };

  const handleMoreDetails = useCallback(
    (test: MedicalTest) => openSheet(test),
    [openSheet]
  );

  const LoadingData = () => {
    return (
      <View className="flex h-full gap-2 py-5 px-3">
        <CatalogHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          keywords={keywords}
          selectedKeywords={selectedKeywords}
          toggleKeyword={toggleKeyword}
        />

        <View className="mb-24 flex-grow justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary.DEFAULT} />
          <CText className="text-primary text-center">
            Chargement des examens...
          </CText>
        </View>
      </View>
    );
  };

  const ErrorWhileLoadingData = ({ error }: { error?: string }) => {
    return (
      <View className="flex h-full gap-2 py-5 px-3">
        <CatalogHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          keywords={keywords}
          selectedKeywords={selectedKeywords}
          toggleKeyword={toggleKeyword}
        />
        <View className="mb-24 flex-grow justify-center items-center">
          <CText className="text-red-600 text-center">{error}</CText>
        </View>
      </View>
    );
  };

  const NoData = () => {
    return (
      <View className="flex h-full gap-2 py-5 px-3">
        <CatalogHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          keywords={keywords}
          selectedKeywords={selectedKeywords}
          toggleKeyword={toggleKeyword}
        />
        <View className="mb-24 flex-grow justify-center items-center">
          <CText className="text-gray-500 text-center">
            Aucun examen trouvé.
          </CText>
        </View>
      </View>
    );
  };

  if (loading) return <LoadingData />;
  if (error) return <ErrorWhileLoadingData error={error} />;
  if (!filteredData.length) return <NoData />;

  return (
    <View className="px-3 gap-5">
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <MedicalTestCard
            medicalTest={item}
            onMoreDetailsClick={handleMoreDetails}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        className="pt-5"
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListFooterComponent={<CScreenFooter />}
        ListEmptyComponent={<NoData />}
        ListHeaderComponent={
          <CatalogHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            keywords={keywords}
            selectedKeywords={selectedKeywords}
            toggleKeyword={toggleKeyword}
          />
        }
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={(index) => {
          if (index === -1) setSelectedMedicalTest(undefined);
        }}
      >
        <BottomSheetScrollView style={{ flex: 1, padding: 20 }}>
          {selectedMedicalTest ? (
            <MedicalTestDetailsScreen
              medicalTest={selectedMedicalTest}
              onBookAppointmentPress={onBookAppointmentPress}
              onMoreInfoPress={onMoreInfoPress}
            />
          ) : (
            <CText>No card selected</CText>
          )}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const CatalogTitle = () => {
  return (
    <View className="gap-2">
      <CTitleText>{MedicalTestCatalogScreenData.title}</CTitleText>
      <CDivider />
      <CText className="font-body text-base text-justify">
        {MedicalTestCatalogScreenData.subTitle}
      </CText>
    </View>
  );
};

const CatalogHeader = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  keywords,
  selectedKeywords,
  toggleKeyword,
}: {
  searchQuery: string;
  setSearchQuery: (value: React.SetStateAction<string>) => void;
  handleSearch: (query: string) => void;
  keywords: Set<string>;
  selectedKeywords: string[];
  toggleKeyword: (keyword: string) => void;
}) => {
  return (
    <View className="gap-5 pb-5">
      <CatalogTitle />

      <TextInput
        mode="outlined"
        dense
        value={searchQuery}
        // onChangeText={handleSearch}
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
        toggleKeyword={toggleKeyword}
      />
    </View>
  );
};

export default MedicalTestCatalogScreen;
