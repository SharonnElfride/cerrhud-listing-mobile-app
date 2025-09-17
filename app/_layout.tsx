import colors from "@/colors";
import IconButton from "@/src/components/buttons/IconButton";
import { TopBarItem } from "@/src/constants/navigation";
import { IconButtonSize } from "@/src/constants/shared";
import { MedicalTestsProvider } from "@/src/context/MedicalTestsContext";
import { callNumber } from "@/src/utils/phone";
import { Poppins_400Regular } from "@expo-google-fonts/poppins";
import { RobotoSerif_700Bold, useFonts } from "@expo-google-fonts/roboto-serif";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as NavigationBar from "expo-navigation-bar";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform, Text, View } from "react-native";
import "../global.css";

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    RobotoSerif_700Bold,
    Poppins_400Regular,
  });

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
    }
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <MedicalTestsProvider>
      <View className="flex-1 bg-background">
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary.DEFAULT },
            headerTintColor: "#fff",
            headerTitleStyle: {
              // fontFamily: "RobotoSerif_700Bold",
              fontFamily: Platform.select({
                android: "RobotoSerif_700Bold",
                ios: "RobotoSerif-Bold",
              }),
            },
            contentStyle: {
              // backgroundColor: colors.background.DEFAULT,
            },
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              title: `${TopBarItem.title}`,
              headerTitle: () => (
                <Text
                  className="uppercase text-2xl text-white"
                  style={{
                    fontFamily: "RobotoSerif_700Bold",
                  }}
                >
                  {TopBarItem.title}
                </Text>
              ),
              headerRight: () => (
                <Link href={"/cerrhud-lab"}>
                  <Ionicons
                    name="information-circle-outline"
                    size={IconButtonSize}
                    color="#fff"
                  />
                </Link>
              ),
            }}
          />
          <Stack.Screen
            name="cerrhud-lab"
            options={{
              title: `${TopBarItem.title}`,
              // headerBackTitleVisible: false,
              // headerBackTitle: undefined,
              headerBackButtonDisplayMode: "minimal",
              headerBackTitleStyle: {
                fontFamily: "RobotoSerif_700Bold",
              },
              headerRight: () => (
                <IconButton icon="call-outline" onPress={() => callNumber()} />
              ),
            }}
          />
        </Stack>
      </View>
    </MedicalTestsProvider>
  );
}
