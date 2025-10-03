import colors from "@/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { ExternalPathString, useRouter } from "expo-router";
import { View } from "react-native";
import IconTextButton from "../components/buttons/IconTextButton";
import CScreenFooter from "../components/CScreenFooter";
import ExternalLink from "../components/ExternalLink";
import MapPreview from "../components/MapPreview";
import CDivider from "../components/ui/CDivider";
import CText from "../components/ui/CText";
import CView from "../components/ui/CView";
import { CerrhudLabData } from "../constants/cerrhud-lab-data";
import { CerrhudLabScreenData } from "../constants/screens-data";
import { Blurhash, IconButtonSize, IoniconName } from "../constants/shared";
import { callNumber } from "../utils/phone";

const CerrhudLabScreen = () => {
  const router = useRouter();

  return (
    <CView viewData={CerrhudLabScreenData}>
      <ExternalLink
        href={CerrhudLabData.website as ExternalPathString}
        className="my-2"
      >
        <CText className="font-medium text-sm text-accent underline underline-offset-8">
          Visiter notre site web
        </CText>
      </ExternalLink>
      <View className="gap-2">
        <View className="flex flex-row items-center gap-2">
          <Ionicons
            name="location-outline"
            size={IconButtonSize}
            color={colors.accent}
          />
          <CText className="text-lg capitalize w-full font-medium text-primary underline underline-offset-8">
            Accès au laboratoire
          </CText>
        </View>

        <View>
          <CText className="font-medium">
            Rue 607. Carré 750 Gbégamey Cotonou-Bénin
          </CText>
          <CDivider />
          <CText className="text-justify">
            Maison Adjovi, sise rue de la Salle de Gymnastique, à environ 300
            mètres sur la droite en partant du carrefour Codiam/Camp Guézo, en
            direction du petit portail du Collège Père Aupiais.
          </CText>
        </View>

        <MapPreview />
      </View>

      <OpeningHours />

      <View className="gap-2 my-2">
        <View className="flex flex-row items-center gap-2">
          <Ionicons
            name="people-circle-outline"
            size={IconButtonSize}
            color={colors.accent}
          />
          <CText className="text-lg capitalize w-full font-medium text-primary underline underline-offset-8">
            Notre équipe
          </CText>
        </View>

        <View className="gap-2">
          <Image
            style={{
              width: "100%",
              height: 300,
            }}
            source={CerrhudLabData.teamImg}
            placeholder={{ blurhash: Blurhash }}
            contentFit="cover"
            contentPosition="top center"
            transition={1000}
          />
          <CText className="text-justify">
            Notre équipe réunit des techniciens expérimentés, des gynécologues
            spécialisés en fertilité et des professionnels de santé engagés.
            Ensemble, nous vous accompagnons dans votre parcours vers la
            parentalité avec écoute et solutions adaptées.
          </CText>
        </View>
      </View>

      <View className="gap-2 my-2">
        <View className="flex flex-row items-center gap-2">
          <Ionicons
            name="chatbubbles-outline"
            size={IconButtonSize}
            color={colors.accent}
          />
          <CText className="text-lg capitalize w-full font-medium text-primary underline underline-offset-8">
            Nos réseaux sociaux
          </CText>
        </View>

        <CText>
          Suivez-nous sur nos réseaux sociaux et rejoignez la conversation !
        </CText>
        <View className="flex flex-row w-full justify-evenly items-center">
          {CerrhudLabData.socials.map((item) => (
            <ExternalLink href={item.url as ExternalPathString} key={item.id}>
              <Ionicons
                name={`logo-${item.id}` as IoniconName}
                size={item.size ?? IconButtonSize}
                color={colors.accent}
              />
            </ExternalLink>
          ))}
        </View>
      </View>

      <View className="items-center gap-3 w-full my-2">
        <IconTextButton
          icon="call"
          label={"Appeler le CERRHUD"}
          onPress={() => callNumber()}
        />

        <IconTextButton
          icon="calendar"
          label={"Prendre un rendez-vous"}
          onPress={() => {
            router.back();
            router.navigate("/(tabs)/book-appointment");
          }}
        />
      </View>

      <CScreenFooter />
    </CView>
  );
};

const OpeningHours = () => {
  const openingHours = [
    { day: "Lundi", hours: "07h00 – 16h30" },
    { day: "Mardi", hours: "07h00 – 16h30" },
    { day: "Mercredi", hours: "07h00 – 16h30" },
    { day: "Jeudi", hours: "07h00 – 16h30" },
    { day: "Vendredi", hours: "07h00 – 16h30" },
    { day: "Samedi", hours: "Fermé" },
    { day: "Dimanche", hours: "Fermé" },
  ];

  const todayIndex = new Date().getDay();
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  return (
    <View className="gap-2 mt-2 mb-1">
      <View className="flex flex-row items-center gap-2">
        <Ionicons
          name="alarm-outline"
          size={IconButtonSize}
          color={colors.accent}
        />
        <CText className="text-lg capitalize w-full font-medium text-primary underline underline-offset-8">
          Horaires d'ouverture
        </CText>
      </View>

      <View className="mt-1">
        {openingHours.map((item) => {
          const isToday = item.day === days[todayIndex];
          return (
            <View
              key={item.day}
              className="flex flex-row justify-between py-0.5"
            >
              <CText
                className={`${
                  isToday ? "font-bold text-primary" : "text-gray-800"
                }`}
              >
                {item.day}
              </CText>
              <CText
                className={`${
                  isToday ? "font-extrabold text-primary" : "text-gray-600"
                }`}
              >
                {item.hours}
              </CText>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CerrhudLabScreen;
