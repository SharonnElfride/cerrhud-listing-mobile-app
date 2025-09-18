import colors from "@/colors";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Chip, TextInput } from "react-native-paper";
import CScreenFooter from "../components/CScreenFooter";
import MedicalTestCard from "../components/MedicalTestCard";
import CDivider from "../components/ui/CDivider";
import CText from "../components/ui/CText";
import CTitleText from "../components/ui/CTitleText";
import { MedicalTestCatalogScreenData } from "../constants/screens-data";
import { FormatPrice } from "../constants/shared";
import { useMedicalTests } from "../context/MedicalTestsContext";
import { MedicalTest } from "../models/MedicalTest";
import MedicalTestDetailsScreen from "./MedicalTestDetailsScreen";
import { router } from "expo-router";
import { sendMessageOnWhatsapp } from "../utils/phone";
import { medicalTestsInfoMessage } from "../utils/messages/more-information-message-template";

const MedicalTestCatalogScreen = () => {
  const { medicalTests, loading, error } = useMedicalTests();
  const [filteredData, setFilteredData] = useState<MedicalTest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [prices, setPrices] = useState(new Set<number>());
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [selectedMedicalTest, setSelectedMedicalTest] = useState<MedicalTest>();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  useEffect(() => {
    if (!medicalTests.length) return;

    setFilteredData(medicalTests);
    const currentPrices = new Set(
      medicalTests.map((test) => test.price).sort((a, b) => a - b)
    );
    setPrices(currentPrices);
  }, [medicalTests]);

  useEffect(() => {
    let data = medicalTests;

    const lowerQuery = searchQuery.toLowerCase();
    data = data.filter(
      (test) =>
        test.title.toLowerCase().includes(lowerQuery) ||
        test.acronym.toLowerCase().includes(lowerQuery)
    );

    if (selectedPrices.length > 0) {
      data = data.filter((test) => selectedPrices.includes(test.price));
    }

    setFilteredData(data);
  }, [searchQuery, selectedPrices, medicalTests]);

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

  const togglePrice = (price: number) => {
    setSelectedPrices((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  const LoadingData = () => {
    return (
      <View className="flex h-full gap-2 py-5 px-3">
        <CatalogHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          prices={prices}
          selectedPrices={selectedPrices}
          togglePrice={togglePrice}
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
          prices={prices}
          selectedPrices={selectedPrices}
          togglePrice={togglePrice}
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
          prices={prices}
          selectedPrices={selectedPrices}
          togglePrice={togglePrice}
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
            onMoreDetailsClick={(test) => openSheet(test)}
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
            prices={prices}
            selectedPrices={selectedPrices}
            togglePrice={togglePrice}
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
  prices,
  selectedPrices,
  togglePrice,
}: {
  searchQuery: string;
  setSearchQuery: (value: React.SetStateAction<string>) => void;
  handleSearch: (query: string) => void;
  prices: Set<number>;
  selectedPrices: number[];
  togglePrice: (price: number) => void;
}) => {
  return (
    <View className="gap-5 mb-5">
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
          fontSize: 12,
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

      <View className="flex-row flex-wrap gap-2 mt-3 mb-2">
        {Array.from(prices).map((price) => {
          const isSelected = selectedPrices.includes(price);
          return (
            <Chip
              key={price}
              icon="cash"
              selected={isSelected}
              onPress={() => togglePrice(price)}
              style={{
                backgroundColor: isSelected
                  ? "rgba(249, 76, 175, 0.15)"
                  : "#f5f5f5",
                borderColor: isSelected ? colors.accent : "#fff",
              }}
              textStyle={{
                color: "#000",
                fontFamily: "Poppins_400Regular",
              }}
            >
              {FormatPrice(price)} FCFA
            </Chip>
          );
        })}
      </View>
    </View>
  );
};

export default MedicalTestCatalogScreen;
