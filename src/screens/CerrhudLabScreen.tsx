import colors from "@/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { ExternalPathString, useRouter } from "expo-router";
import { Text, View } from "react-native";
import IconTextButton from "../components/buttons/IconTextButton";
import ExternalLink from "../components/ExternalLink";
import MapPreview from "../components/MapPreview";
import CDivider from "../components/ui/CDivider";
import CView from "../components/ui/CView";
import { CerrhudLabData } from "../constants/cerrhud-lab-data";
import { CerrhudLabScreenData } from "../constants/screens-data";
import { Blurhash, IconButtonSize, IoniconName } from "../constants/shared";
import { callNumber } from "../utils/phone";

const CerrhudLabScreen = ({}) => {
  const router = useRouter();

  return (
    <CView viewData={CerrhudLabScreenData}>
      <ExternalLink href={"https://n.cerrhud.net/"} className="my-2">
        <Text className="font-medium text-sm text-accent underline underline-offset-8">
          Visiter notre site web
        </Text>
      </ExternalLink>
      <View className="gap-2">
        <View className="flex flex-row items-center gap-2">
          <Ionicons
            name="location"
            size={IconButtonSize}
            color={colors.accent}
          />
          <Text className="text-lg capitalize w-full font-medium text-primary underline underline-offset-8">
            {/* Localisation */}
            Accès au laboratoire
          </Text>
        </View>

        <View>
          <Text className="font-medium">
            Rue 607. Carré 750 Gbégamey Cotonou-Bénin
          </Text>
          <CDivider />
          <Text className="text-justify">
            Maison Adjovi, sise rue de la Salle de Gymnastique, à environ 300
            mètres sur la droite en partant du carrefour Codiam/Camp Guézo, en
            direction du petit portail du Collège Père Aupiais.
          </Text>
        </View>

        <MapPreview />
      </View>

      <View className="gap-2 mt-2 mb-1">
        <View className="flex flex-row items-center gap-2">
          <Ionicons
            name="alarm-outline"
            size={IconButtonSize}
            color={colors.accent}
          />
          <Text className="text-lg capitalize w-full font-medium text-primary underline underline-offset-8">
            Horaires d'ouverture
          </Text>
        </View>

        <View>
          <Text className="text-justify">Lun 10:00 - 12:00</Text>
        </View>
      </View>

      <View className="gap-2 my-2">
        <View className="flex flex-row items-center gap-2">
          <Ionicons
            name="people-circle-outline"
            size={IconButtonSize}
            color={colors.accent}
          />
          <Text className="text-lg capitalize w-full font-medium text-primary underline underline-offset-8">
            Notre équipe
          </Text>
        </View>

        <View className="gap-2">
          <Image
            style={{
              width: "100%",
              height: 150,
            }}
            source={CerrhudLabData.teamImg}
            placeholder={{ blurhash: Blurhash }}
            contentFit="cover"
            contentPosition="top center"
            transition={1000}
          />
          <Text className="text-justify">
            Notre équipe réunit des techniciens expérimentés, des gynécologues
            spécialisés en fertilité et des professionnels de santé engagés.
            Ensemble, nous vous accompagnons dans votre parcours vers la
            parentalité avec écoute et solutions adaptées.
          </Text>
        </View>
      </View>

      <View className="gap-2 my-2">
        <View className="flex flex-row items-center gap-2">
          <Ionicons
            name="people-circle-outline"
            size={IconButtonSize}
            color={colors.accent}
          />
          <Text className="text-lg capitalize w-full font-medium text-primary underline underline-offset-8">
            Nos réseaux sociaux
          </Text>
        </View>

        <Text>
          Suivez-nous sur nos réseaux sociaux et rejoignez la conversation !
        </Text>
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
      <View className="justify-center items-center w-full mt-5">
        <Image
          style={{
            width: 150,
            height: 150,
          }}
          source={CerrhudLabData.logo}
          placeholder={{ blurhash: Blurhash }}
          contentFit="cover"
          transition={1000}
        />
      </View>
    </CView>
  );
};

export default CerrhudLabScreen;
