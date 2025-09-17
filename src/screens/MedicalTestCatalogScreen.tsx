import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View
} from "react-native";
import { Chip } from "react-native-paper";
import MedicalTestCard from "../components/MedicalTestCard";
import CDivider from "../components/ui/CDivider";
import CText from "../components/ui/CText";
import CTitleText from "../components/ui/CTitleText";
import { MedicalTestCatalogScreenData } from "../constants/screens-data";
import { FormatPrice } from "../constants/shared";
import { useMedicalTests } from "../context/MedicalTestsContext";
import { MedicalTest } from "../models/MedicalTest";

const MEDICAL_TESTS_CACHE_KEY = "medical_tests_cache";
const PRICE_FILTER_CACHE_KEY = "price_filter_cache";

const MedicalTestCatalogScreen = () => {
  const { medicalTests, loading, error } = useMedicalTests();
  const [filteredData, setFilteredData] = useState<MedicalTest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [prices, setPrices] = useState(new Set<number>());

  useEffect(() => {
    if (!medicalTests.length) return;

    setFilteredData(medicalTests);
    const currentPrices = new Set(
      medicalTests.map((test) => test.price).sort((a, b) => a - b)
    );
    setPrices(currentPrices);
  }, [medicalTests]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      const lowerQuery = query.toLowerCase();
      setFilteredData(
        medicalTests.filter(
          (test) =>
            test.title.toLowerCase().includes(lowerQuery) ||
            test.acronym.toLowerCase().includes(lowerQuery)
        )
      );
    } else {
      setFilteredData(medicalTests);
    }
  };

  // const handlePriceFilter = (filterPrices: number[]) => {
  const handlePriceFilter = (price: number) => {
    setFilteredData(medicalTests.filter((test) => test.price === price));
  };

  if (loading) return <LoadingData />;
  if (error) return <ErrorWhileLoadingData error={error} />;
  if (!filteredData.length) return <NoData />;

  return (
    <View
      className="px-3 gap-5"
      // style={{ marginTop: StatusBar.currentHeight || 0 }}
    >
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <MedicalTestCard medicalTest={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        className="pt-5"
        ItemSeparatorComponent={() => <View className="h-3" />}
        ListFooterComponent={<View className="h-5 mb-[90]" />}
        ListEmptyComponent={<NoData />}
        ListHeaderComponent={
          <View className="gap-5 mb-5">
            <View className="gap-2">
              <CTitleText>{MedicalTestCatalogScreenData.title}</CTitleText>
              <CDivider />
              <CText className="font-body text-base text-justify">
                {MedicalTestCatalogScreenData.subTitle}
              </CText>
            </View>

            <View>
              <Chip
                onPress={() => console.log("Pressed")}
                showSelectedCheck={true}
                selectedColor="#ff0000"
                compact
              >
                Example Chip
              </Chip>
            </View>

            <TextInput
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Rechercher un examen..."
              className="border rounded-md px-3 py-2"
            />

            <View className="flex-row flex-wrap gap-2 mt-3 mb-2">
              {Array.from(prices).map((price) => (
                <Text
                  key={price}
                  className="px-3 py-1 border rounded-full bg-gray-200"
                  onPress={() => handlePriceFilter(price)}
                >
                  {FormatPrice(price)}
                </Text>
              ))}
            </View>
          </View>
        }
      />
    </View>
  );
};

const LoadingData = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
      <Text>Chargement des examens...</Text>
    </View>
  );
};

const ErrorWhileLoadingData = ({ error }: { error?: string }) => {
  return (
    <View className="flex-1 justify-center items-center px-5">
      <Text className="text-red-600 text-center">{error}</Text>
    </View>
  );
};

const NoData = () => {
  return (
    <View className="flex-1 justify-center items-center px-5">
      <Text className="text-gray-500 text-center">
        Aucun examen correspondant.
      </Text>
    </View>
  );
};

export default MedicalTestCatalogScreen;
