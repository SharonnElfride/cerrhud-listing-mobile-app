import colors from "@/colors";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, View, ViewProps } from "react-native";
import CatalogHeader from "../components/catalog/CatalogHeader";
import CScreenFooter from "../components/CScreenFooter";
import MedicalTestCard from "../components/MedicalTestCard";
import CText from "../components/ui/CText";
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

  const HandlingData = ({
    text,
    children,
    className,
    ...rest
  }: ViewProps & {
    text?: string;
  }) => {
    return (
      <View className="flex h-full gap-2 py-5 px-3" {...rest}>
        <CatalogHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          keywords={keywords}
          selectedKeywords={selectedKeywords}
          toggleKeyword={toggleKeyword}
        />

        <View className="mb-24 flex-grow justify-center items-center">
          {children}
          <CText className={`text-center ${className}`}>{text}</CText>
        </View>
      </View>
    );
  };

  const LoadingData = () => {
    return (
      <HandlingData text="Chargement des examens..." className="text-primary">
        <ActivityIndicator size="large" color={colors.primary.DEFAULT} />
      </HandlingData>
    );
  };

  const ErrorWhileLoadingData = ({ error }: { error?: string }) => {
    return <HandlingData text={error} className="text-red-600" />;
  };

  const NoData = () => {
    return (
      <HandlingData text="Aucun examen trouvé." className="text-gray-500" />
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

export default MedicalTestCatalogScreen;
